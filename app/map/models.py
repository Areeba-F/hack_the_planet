from datetime import datetime
from django.db import models
from django.contrib.postgres.fields import ArrayField


# database to store the maps
class maps(models.Model):
    board = ArrayField(
        ArrayField(
            models.CharField(max_length=10, blank=True),
            size=7,
        ),
        size=7,
    )   
    pub_date = models.DateTimeField("date published", default=datetime.now)   

    def __str__(self):
        return self.name
