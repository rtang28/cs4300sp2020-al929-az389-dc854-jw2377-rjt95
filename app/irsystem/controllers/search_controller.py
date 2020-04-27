from . import *
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder

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
	# elif keywords and location:
	# 	results = search_model.search(keywords, location)
	else:
		results = []
	return http_resource(results, "results")
