from flask import Blueprint, render_template, request

base = Blueprint('index', __name__, url_prefix='/',static_folder='static',template_folder='templates')

@base.route('/', methods=['GET'])
def index():
    # not sure where how the others referenced this in frontend
    return render_template('index.html')

project_name = "Restaurant Match"
net_id = "Alan Lin (al929), Jason Wong (jw2377), Ryan Tang (rjt95), Andy Zhu (az389), David Chen (dc8454)"

@base.route('/samplepage', methods=['GET'])
def search():
	query = request.args.get('search')
	if not query:
		data = []
		output_message = ''
	else:
		output_message = "Your search: " + query
		data = range(5)
	return render_template('search.html', name=project_name, netid=net_id, output_message=output_message, data=data)