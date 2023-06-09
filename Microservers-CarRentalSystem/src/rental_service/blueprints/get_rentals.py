import json
from quart import Blueprint, Response, request
from .models.rental_model import RentalModel
from urllib.parse import parse_qs


get_rentals_blueprint = Blueprint('get_rentals', __name__,)


@get_rentals_blueprint.route('/api/v1/rental/', methods=['GET'])
async def get_rentals() -> Response:
    
    
    data = await request.get_data()
    dict_data = parse_qs(data)
    data = {key: value[0] for key, value in dict_data.items()}
    user = data.get('email')
    rentals = [rental.to_dict() for rental in RentalModel.select().where(RentalModel.username == user)]

    return  Response(
        status=200,
        content_type='application/json',
        response=json.dumps(rentals)
    )
