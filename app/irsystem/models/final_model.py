import os
import re
from app import app
import pandas as pd
import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

DATADIR = os.path.abspath(os.path.join(app.instance_path, "..", "data"))

class CosineSearch:
    def __init__(self):

        self.l1 = np.load(os.path.join(DATADIR,'all_cities1.npz'))
        self.l2 = np.load(os.path.join(DATADIR,'all_cities2.npz'))
        with open(os.path.join(DATADIR,'id_to_cat.txt'),'r') as inf:
            self.id_to_cat = eval(inf.read())
        with open(os.path.join(DATADIR, 'id_to_name.txt'),'r') as inf:
            self.id_to_name = eval(inf.read())
        with open(os.path.join(DATADIR,'state_word_to_index.txt'),'r') as inf:
            self.city_word_idx = eval(inf.read())


    def search(self, query, location, likes, dislikes, a, b, c):

        if location in ['Las Vegas', 'Phoenix', 'Pittsburg', 'Danville', 'Madison']:
            self.tdmatrix = self.l1[location]
        else:
            self.tdmatrix = self.l2[location]
        with open(os.path.join(DATADIR, 'state_restaurant_to_index.txt'),'r') as inf:
            self.restaurant_to_index = eval(inf.read())[location]
        with open(os.path.join(DATADIR, 'state_index_to_restaurant.txt'),'r') as inf:
            index_to_restaurant_old = eval(inf.read())[location]
        self.index_to_restaurant = {}
        for key in index_to_restaurant_old:
            self.index_to_restaurant[int(key)] = index_to_restaurant_old[key]


        #TODO FIX ME

        self.word_to_index = self.city_word_idx[location]
        self.index_to_word = {v: k for k, v in self.word_to_index.items()}
        self.name_to_id = {}
        for r_id in self.restaurant_to_index:
            name = self.id_to_name[r_id]
            if name in self.name_to_id:
                self.name_to_id[name] += [r_id]
            else:
                self.name_to_id[name] = [r_id]
        with open(os.path.join(DATADIR, 'state_to_hidden_gems.txt'),'r') as inf:
            hidden_gems = eval(inf.read())[location]
        self.hidden_gems = set(hidden_gems)
        if likes == "":
            likes = []
        else:
            likes = likes.split(',')
        if dislikes == "":
            dislikes=[]
        else:
            dislikes = dislikes.split(',')
        if query == "":
            query = []
        else:
            query = query.split(',')
        return self.query(query, self.tdmatrix, likes, dislikes, a, b, c)

    # def vectorize_query(self, query):
    #     #Returns a vector representation of the tokens the user inputs
    #     res = np.zeros(10)
    #     for i in query:
    #         res += self.model[i]
    #     return res / len(query)


    def query(self, query, matrix, likes, dislikes, a, b, c):
        """
        query = list of tokes
        likes = list of restaurant ids
        dislikes = list of restaurant ids
        """
        # finds the index of words that are in the query if it exists
        word_index_list = []
        word_not_found = []
        used_words = []
        
        #find words in the query that are also in the dataset
        for word in query:
            if word in self.word_to_index:
                word_index_list.append(int(self.word_to_index[word]))
                used_words.append(word)
            else:
                word_not_found.append(word)
        
        # creates a tfidf vector of the query if it is not empty
        if query != []:
            tfidf_vec = TfidfVectorizer()
            query_begin = tfidf_vec.fit_transform([" ".join(used_words)]).toarray()[0]
            index_to_vocab = {i:v for i, v in enumerate(tfidf_vec.get_feature_names())}
            vocab_to_index = {v: k for k, v in index_to_vocab.items()}
        
            query_vector = np.zeros(len(matrix[0]))

            for num in range(len(query_begin)):
                query_vector[int(self.word_to_index[index_to_vocab[num]])] += query_begin[num]
        else:
            query_vector = np.zeros(len(matrix[0]))
        
        satisfy_query = np.array([])
        restaurant_to_words = {}
        # find the list of restaurants that have at least one query word
        if word_index_list != []:
            satisfy_query = np.nonzero(matrix[:,word_index_list[0]])
            for word in word_index_list:
                word_satisfied = np.nonzero(matrix[:,word])
                satisfy_query = np.union1d(satisfy_query, word_satisfied)
                for r_index in word_satisfied[0].tolist():
                    if self.index_to_restaurant[r_index] not in restaurant_to_words:
                        restaurant_to_words[self.index_to_restaurant[r_index]] = [self.index_to_word[word]]
                    else:
                        restaurant_to_words[self.index_to_restaurant[r_index]] += [self.index_to_word[word]]

        # turn liked and dislikes restaurant names into business ids
        new_likes = []
        for r in likes:
            for ids in self.name_to_id[r]:
                if ids in self.id_to_name:
                    new_likes += [ids]
                    break
        
        new_dislikes = []
        for r in dislikes:
            for ids in self.name_to_id[r]:
                if ids in self.id_to_name:
                    new_dislikes += [ids]
                    break
        
        likes = new_likes[:]
        dislikes = new_dislikes[:]
        # intersect the categories of the likes with the restaurants to see if they have any in common
        
        # get all the liked categories
        liked_categories = []
        for restaurant in likes:
            for cat in (self.id_to_cat[restaurant]).split(', '):
                if cat not in liked_categories:
                    liked_categories.append(cat)
        
        # get ID of restaurants that match categories
        matched_categories = []
        restaurant_to_categories = {}
        restaurant_jaccard = {}
        if satisfy_query.size != 0:
            iterate_over = satisfy_query
        else:
            iterate_over = range(len(matrix[:,0]))
            
        for i in iterate_over:
            intersect_cat = []
            for cat in (self.id_to_cat[self.index_to_restaurant[i]]).split(', '):
                if cat in liked_categories:
                    intersect_cat.append(cat)
            if intersect_cat != []:
                matched_categories.append(i)
                restaurant_to_categories[self.index_to_restaurant[i]] = intersect_cat
                restaurant_jaccard[self.index_to_restaurant[i]] = len(intersect_cat) / len(list(dict.fromkeys((self.id_to_cat[self.index_to_restaurant[i]]).split(', ') + liked_categories)))
                
        used_restaurants = {}
        likes_vector = np.zeros(len(matrix[0]))
        for r in likes:
            likes_vector += matrix[self.restaurant_to_index[r]]
            used_restaurants[r] = 0
        if likes != []:
            likes_vector = likes_vector / len(likes)

        dislikes_vector = np.zeros(len(matrix[0]))
        for r in dislikes:
            dislikes_vector += matrix[self.restaurant_to_index[r]]
            used_restaurants[r] = 0
        if dislikes != []:
            dislikes_vector = dislikes_vector / len(dislikes)
        
        result_vector = (a*query_vector) + (b*likes_vector) - (c*dislikes_vector)
        result_vector = np.where(result_vector < 0, 0, result_vector)
        
        restaurant_to_sim = {}
        if matched_categories != []:
            for r in matched_categories:
                if self.index_to_restaurant[r] not in used_restaurants:
                    num = np.dot(result_vector, matrix[r])
                    denom = np.linalg.norm(result_vector) * (np.linalg.norm(matrix[r]))
                    restaurant_to_sim[self.index_to_restaurant[r]] = num / denom
        else:
            for r in range(len(matrix[:,0])):
                if self.index_to_restaurant[r] not in used_restaurants:
                    num = np.dot(result_vector, matrix[r])
                    denom = np.linalg.norm(result_vector) * (np.linalg.norm(matrix[r]))
                    restaurant_to_sim[self.index_to_restaurant[r]] = (num / denom)
                    # + restaurant_jaccard[index_to_restaurant[r]]
        ranked_results = (sorted(restaurant_to_sim, key = restaurant_to_sim.get))[::-1]
        liked_final = []
        disliked_final = []
        final = []
        if likes != []:
            for r_id in likes:
                name = self.id_to_name[r_id]
                for result_id in ranked_results:
                    if self.id_to_name[result_id] != name and self.id_to_name[result_id] not in name and name not in self.id_to_name[result_id]:
                        liked_final += [result_id]
        if dislikes != []:
            for r_id in likes:
                name = self.id_to_name[r_id]
                for result_id in ranked_results:
                    if self.id_to_name[result_id] != name and self.id_to_name[result_id] not in name and name not in self.id_to_name[result_id]:
                        disliked_final += [result_id]
                        
        if likes == [] and dislikes == []:
            final = ranked_results
        elif likes != [] and dislikes == []:
            final = liked_final
        elif likes == [] and dislikes != []:
            final = disliked_final
        else:
            for i in liked_final:
                if i in disliked_final:
                    final += [i]

        final_result = []
        
        counter = 0
        used_names = set()
        contains_gem = False
        
        while len(final_result) < 10 and counter < len(final):
            if self.id_to_name[final[counter]] not in used_names:
                restaurant_dict = {}
                restaurant_dict['id'] = final[counter]
                restaurant_dict['name'] = self.id_to_name[final[counter]]
                restaurant_dict['score'] = restaurant_to_sim[final[counter]]
                if matched_categories != []:
                    restaurant_dict['matched_categories'] = restaurant_to_categories[final[counter]]
                if word_index_list != []:
                    restaurant_dict['keywords'] = restaurant_to_words[final[counter]]
                restaurant_dict['is_gem'] = final[counter] in self.hidden_gems
                contains_gem = contains_gem or (final[counter] in self.hidden_gems)
                final_result.append(restaurant_dict)
                used_names.add(self.id_to_name[final[counter]])
            counter += 1
        
        #looks for a hidden gem further down in the final results if it exists
        if not contains_gem:
            for x in range(len(final)):
                if final[x] in self.hidden_gems:
                    restaurant_dict = {}
                    restaurant_dict['id'] = final[x]
                    restaurant_dict['name'] = self.id_to_name[final[x]]
                    restaurant_dict['score'] = restaurant_to_sim[final[x]]
                    if matched_categories != []:
                        restaurant_dict['matched_categories'] = restaurant_to_categories[final[x]]
                    if word_index_list != []:
                        restaurant_dict['keywords'] = restaurant_to_words[final[x]]
                    restaurant_dict['is_gem'] = final[x] in self.hidden_gems
                    final_result.append(restaurant_dict)
                    contains_gem = True
                    break
        
        # finds the closest restaurant that matched the query in hidden gems if one is still not found
        if not contains_gem:
            new_r_to_sim= {}
            for r in self.hidden_gems:
                if r not in used_restaurants:
                    num = np.dot(result_vector, matrix[self.restaurant_to_index[r]])
                    denom = np.linalg.norm(result_vector) * (np.linalg.norm(matrix[self.restaurant_to_index[r]]))
                    new_r_to_sim[r] = (num / denom)
            ranked_results = (sorted(new_r_to_sim, key = new_r_to_sim.get))[::-1]
            first_gem = ranked_results[0]
            restaurant_dict = {}
            restaurant_dict['id'] = first_gem
            restaurant_dict['name'] = self.id_to_name[first_gem]
            restaurant_dict['score'] = new_r_to_sim[first_gem]
            restaurant_dict['matched_categories'] = []
            restaurant_dict['keywords'] = []
            restaurant_dict['is_gem'] = True
            final_result.append(restaurant_dict) 
        
        return final_result
