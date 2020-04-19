import os
import re
from app import app
import pandas as pd
import fasttext
import numpy as np
from scipy import spatial


DATADIR = os.path.abspath(os.path.join(app.instance_path, "..", "data"))

"""
Needed Files:
    FastText Model          - yelp_review_polarity.bin
    Averaged Review Vectors - yelp_vectors.csv.gzip
    Gems                    - hidden_gems.txt
"""

class SmartSearch:
    def __init__(self):
        #Hidden Gems are defined as < reviews than average and > stars than averages (relative to zip code)
        with open(os.path.join(DATADIR, "hidden_gems.txt"), "r") as f:
            self.gems = eval(f.readline())
        self.model = fasttext.load_model(os.path.join(DATADIR, "yelp_review_polarity.ftz"))

        #Load Average Vector By Restaurant
        averages = pd.read_csv(os.path.join(DATADIR,"yelp_vectors.csv.gzip"), compression="gzip")
        
        #Narrow down the gems
        self.averages = averages[averages["business_id"].isin(self.gems)]

    def search(self, query, zipcode):
        return self.query(zipcode, query.split(','))
    
    def vectorize_query(self, query): 
        #Returns a vector representation of the tokens the user inputs
        res = np.zeros(10)
        for i in query:
            res += self.model[i]
        return res / len(query)

    #Returns the closest 15 neighbors
    def nearest_neighbors(self, input_vector, average_restaurant):
        tree = spatial.KDTree(average_restaurant) 
        return tree.query(input_vector, k=15)

    def query(self, zipcode, query, likes=[], dislikes=[]):
        
        #Turning the User Query Into a Vector
        if not query:
            query_vector = np.zeros(10)
        else:
            query_vector = self.vectorize_query(query)
            
        """
        #TODO for later
        Front End to Specify Categories  - Ensure Front End Gives a List of Categories for user to input
        
        Jaccard for categories           - we are currently having a ton of irrelevant categories within our results
        Likes and disliked restaurants: 
            #Vectorize the likes         - Ensure Front End Gives a List of Available Restaurants for users to input
            #Vectorize the dislikes      - Ensure Front End Gives a List of Available Restaurants for users to input
            #Take (likes vector - dislikes vector + query vector) and plug that into nearest_neighbors
        """

        #Narrow down by Zip 
        # if zipcode:
        #     averages = gems_averages[gems_averages["zip_code"] == zipcode]
        
        #Must drop those columns because we only want the matrix
        nearest_15 = self.nearest_neighbors(query_vector,  self.averages.drop(columns=["zip_code", "name", "business_id"]))
        
        #Load Results into a list of dictionaries
        res = []
        for i, df_index in enumerate(nearest_15[1]):
            try:
                res.append(
                    {
                        "name" : self.averages["name"][df_index], 
                        "distance" : nearest_15[0][i]
                    })
            except:
                continue
        return res

class BasicSearch:
    def search(self, query):
        results = [
            {
                'name': 'McDonalds',
                'score': 1
            },
            {
                'name': 'Five Guys',
                'score': 0
            }
        ]
        return results