from django.contrib import admin

from .models import maps

# allows admin panel to edit the maps database
admin.site.register(maps)
