from django.urls import path
from . import views

from django.urls import path

from . import views

urlpatterns = [
    # ex: http://localhost:8000/maps/
    path("", views.index, name="index"),
    # ex: http://localhost:8000/maps/5/
    path("<int:question_id>/", views.detail, name="detail"),
    # ex: http://localhost:8000/maps/5/results/
    path("<int:question_id>/results/", views.results, name="results"),

]
