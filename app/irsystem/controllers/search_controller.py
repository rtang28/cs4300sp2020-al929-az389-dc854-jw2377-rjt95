from . import *
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder
import requests
import os
from flask import jsonify
import json
from ..models.search import SmartSearch

search_model = SmartSearch()

@irsystem.route('/search', methods=['GET'])
def search():
	keywords = request.args.get('keywords', None)
	zipcode = request.args.get('zip', None)
	if keywords:
		results = search_model.search(keywords, zipcode)
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
		return None
	return json.dumps(response.json())
	