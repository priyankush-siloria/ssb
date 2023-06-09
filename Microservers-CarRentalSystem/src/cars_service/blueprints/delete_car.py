import json
from quart import Blueprint, Response, request
from .models.cars_model import CarsModel

delete_car_order_blueprint = Blueprint('delete_car_order', __name__, )


@delete_car_order_blueprint.route('/api/v1/car_delete', methods=['DELETE'])
async def delete_car_order(carUid: str) -> Response:
    payload = await request.json
    payload.get('carUid')
    print()
    try:
        car = CarsModel.select().where(
            CarsModel.car_uid == carUid
        ).get()

        if car.id_active is False:
            return Response(
                status=403,
                content_type='application/json',
                response=json.dumps({
                    'errors': ['Car is already deleted.']
                })
            )

        car.id_active = False
        car.save()

        return Response(
            status=200
        )
    except:
        return Response(
            status=404,
            content_type='application/json',
            response=json.dumps({
                'errors': ['Uid not found in base.']
            })
        )