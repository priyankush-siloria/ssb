import json
import uuid
from quart import Blueprint, Response, request
from .models.cars_model import CarsModel
from peewee import DoesNotExist, _transaction

post_cars_blueprint = Blueprint('add_cars', __name__, )


def validate_args(args):
    errors = []
    
    if 'brand' in args:
        brand = args.get('brand')
    else:
        errors.append('brand must is not vaild')
    if 'registration_number' in args:
        registration_number = args.get('registration_number')
    else:
        errors.append('registration_number must is not vaild')
    if 'model' in args:
        model = args.get('model')
    else:
        errors.append('model must is not vaild')
    if 'power' in args:
        power = args.get('power')
    else:
        errors.append('power must is not vaild')
    if 'price' in args:
        price = args.get('price')
    else:
        errors.append('price must is not vaild')
    if 'availability' in args:
        availability = args.get('availability')
    else:
        errors.append('availability must is not vaild')
    if 'type' in args:
        type = args.get('type')
    else:
        errors.append('type must is not vaild')
 
    return brand,registration_number, model, power, price, availability, type, errors


@post_cars_blueprint.route('/api/v1/add_car_single/', methods=['POST'])
async def add_cars( *args, **kwargs) -> Response:

    payload = await request.json
    brand,registration_number, model, power, price, availability, type, errors = validate_args(payload)
    car_uid= uuid.uuid1()
    if len(errors) > 0:
        return Response(
            status=400,
            content_type='application/json',
            response=json.dumps({
                'errors': errors
            })
    )

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
