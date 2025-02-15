from django.shortcuts import render
from django.http import HttpResponse
from .models import maps

def index(request):
    latest_question_list = maps.objects.order_by("-pub_date")[:5]
    context = {"latest_question_list": latest_question_list}
    return render(request, "map/index.html", context)

def detail(request, question_id):   # http://localhost:8000/wiki/polls/5/
    return HttpResponse("You're looking at map %s." % question_id)

def results(request, question_id):  # http://localhost:8000/wiki/polls/5/results/
    response = "You're looking at the results of map %s."
    return HttpResponse(response % question_id)