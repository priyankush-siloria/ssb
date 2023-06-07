import json
from datetime import  datetime,timedelta
from quart import Blueprint, Response, request
from .models.statistique_model  import StatistiqueModel

from peewee  import *
get_all_detail = Blueprint('get_all', __name__, )
@get_all_detail.route('/api/v1/get_all_user/', methods=['GET'])
async def get_all() -> Response:
    print("______________________________________________TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
    try:
        data = await StatistiqueModel.select().dicts()
        # finally_data = await data.execute()

        print(data)
    except Exception as f:
        print("Error -----------------------", f)
    return  Response(
    status=200,
    content_type='application/json',
    response=json.dumps({
    })
    )

