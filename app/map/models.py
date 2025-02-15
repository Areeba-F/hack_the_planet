from datetime import datetime
from django.db import models
from django.contrib.postgres.fields import ArrayField

def default_grid():
    return [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

# database to store the maps
class maps(models.Model):
    data = models.CharField(max_length=500, default="Grid object")    
    def __str__(self):
        return self.name
