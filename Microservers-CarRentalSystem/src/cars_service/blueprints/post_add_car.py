import json
import uuid
from quart import Blueprint, Response, request
from .models.cars_model import CarsModel
from peewee import DoesNotExist

post_cars_blueprint = Blueprint('add_cars', __name__, )


# def validate_args(args):
#     errors = []
#     if 'car_uid' in args:
#         car_uid = args.get('car_uid')
#         try:
#             uuid_obj = uuid.UUID(car_uid)
#             return str(uuid_obj) == car_uid
#         except ValueError:
#             errors.append('car_uid must is not vaild')
#             return False
#     else:
#         errors.append('car_uid must be provide')
#         car_uid = None
 
#     return car_uid, errors


@post_cars_blueprint.route('/api/v1/add_car_single/', methods=['POST'])
async def add_cars( *args, **kwargs) -> Response:

    payload = await request.json
    print(payload)
    car_uid= uuid.uuid1()
    # if len(errors) > 0:
    #     return Response(
    #         status=400,
    #         content_type='application/json',
    #         response=json.dumps({
    #             'errors': errors
    #         })
    # )
    brand = payload.get('brand')
    model = payload.get('model')
    registration_number = payload.get('registration_number')
    power = payload.get('power')
    price = payload.get('price')
    availability=payload.get('availability')
    type=payload.get('type')
    try:
        car = CarsModel.select().where(CarsModel.car_uid == car_uid).get()
        print(car)
    except DoesNotExist :
        CarsModel.create(
        car_uid = car_uid,
        brand = brand,
        model = model,
        registration_number = registration_number,
        power = power,
        price = price,
        availability = availability,
        type = type
        )
        return Response(
            status=201,
            content_type='application/json',
            response=json.dumps({
                
            "message": ['Car save successful.'],
            # 'car_uid': car_uid  
            })
            )
    except Exception as f:
        return Response(
            status=401,
            content_type='application/json',
            response=json.dumps({
                'Error': [f'{f}']})
            )
    # else:
        # car.car_uid = car_uid,
        # car.brand = brand,
        # car.model = model,
        # car.registration_number = registration_number,
        # car.power = power,
        # car.price = price,
        # car.availability = availability,
        # car.type = type
        # car.save()
        # return Response(
        #     status=200,
        #     content_type='application/json',
        #     response=json.dumps({
        #         'message': ['Car updated successful.'],
        #         'car_uid': car_uid                
        #         })
        #     )
