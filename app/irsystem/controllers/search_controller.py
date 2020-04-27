from . import *
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder
import requests
import os
from flask import jsonify
import json
from ..models.cossearch import CosineSearch

search_model = CosineSearch()

@irsystem.route('/search', methods=['GET'])
def search():
	keywords = request.args.get('keywords', None)
	location = request.args.get('location', None)
	likes = request.args.get('likes', "")
	dislikes = request.args.get('dislikes', "")
	if keywords and location:
		results = search_model.search(keywords, location, likes, dislikes)
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
		return None
	return json.dumps(response.json())
	