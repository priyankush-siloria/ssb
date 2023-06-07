from peewee import *
from .base_model import BaseModel

class StatistiqueModel(BaseModel):
    id = IdentityField()
    rentaluid = UUIDField(null=False)
    username = CharField(max_length=55)
    carname = CharField(max_length=55)

    def to_dict(self):
        return {
            "rentaluid": str(self.rentaluid),
            "username": str(self.username),
            "carname": self.carname,
        }

    class Meta:
        db_table = "statistique"
