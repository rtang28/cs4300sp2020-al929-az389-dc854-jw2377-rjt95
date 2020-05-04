from . import *
from app import app
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder
import requests
import os
from flask import jsonify
import json
from ..models.final_model import CosineSearch
from urllib.parse import unquote
import ftfy

search_model = CosineSearch()
DATADIR = os.path.abspath(os.path.join(app.instance_path, "..", "data"))
YELP_TOKEN = os.environ.get('YELP_API_KEY')

@irsystem.route('/search', methods=['GET'])
def search():
	keywords = unquote(request.args.get('keywords', ""))
	location = request.args.get('location', None)
	if location == 'Pittsburgh':
		location = 'Pittsburg'
	likes = unquote(request.args.get('likes', ""))
	dislikes = unquote(request.args.get('dislikes', ""))
	a, b, c = (request.args.get('weights', '1,0.8,0.2')).split(',')

	if location:
		results = search_model.search(keywords, location, likes, dislikes, float(a), float(b), float(c))
	else:
		results = []
	return http_resource(results, "results")

def get_auth_dict():
    return {'Authorization' : "Bearer " + YELP_TOKEN}

@irsystem.route('/yelp', methods=['GET'])
def yelp():
	id = request.args.get('id')
	response = requests.get(f"https://api.yelp.com/v3/businesses/{id}", headers=get_auth_dict())
	if response.status_code != 200:
		return json.dumps('')
	return json.dumps(response.json())


@irsystem.route('/restaurants', methods=['GET'])
def restaurants():
	with open(os.path.join(DATADIR, 'location_restaurants.json'),'r') as f:
		restaurant_dir = json.load(f)
	restaurant_dir = {k: list(map(ftfy.fix_text, v)) for k, v in restaurant_dir.items()}
	return json.dumps(restaurant_dir)

@irsystem.route('/terms', methods=['GET'])
def terms():
    with open(os.path.join(DATADIR, 'state_word_to_index.txt'),'r') as f:
        term_dir = eval(f.read())

    term_dir = {k: list(v.keys()) for k, v in term_dir.items()}
    term_dir['Pittsburgh'] = term_dir['Pittsburg']
    del term_dir['Pittsburg']
    return json.dumps(term_dir)
