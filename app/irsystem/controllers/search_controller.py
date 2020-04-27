from . import *
from app import app
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder
import requests
import os
from flask import jsonify
import json
from ..models.cossearch import CosineSearch

search_model = CosineSearch()
DATADIR = os.path.abspath(os.path.join(app.instance_path, "..", "data"))

@irsystem.route('/search', methods=['GET'])
def search():
	keywords = request.args.get('keywords', None)
	location = request.args.get('location', None)
	if location == 'Pittsburgh':
		location = 'Pittsburg'
	likes = request.args.get('likes', "")
	dislikes = request.args.get('dislikes', "")
	if keywords and location:
		results = search_model.search(keywords, location, likes, dislikes)
	else:
		results = []
	return http_resource(results, "results")

YELP_TOKEN = os.environ.get('YELP_API_KEY')

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
		restaurant_dir = eval(f.read())
	return json.dumps(restaurant_dir)

@irsystem.route('/terms', methods=['GET'])
def terms():
	with open(os.path.join(DATADIR, 'state_word_to_index.txt'),'r') as f:
		term_dir = eval(f.read())
	term_dir = {k: list(v.keys()) for k, v in term_dir.items()}
	return json.dumps(term_dir)
