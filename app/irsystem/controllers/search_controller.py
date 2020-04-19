from . import *
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder

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