from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
import json
# Create your views here.

class ReactView(APIView):
  
    serializer_class = ReactSerializer

    def get(self, request):
        detail = [ {"grid": detail.grid} 
        for detail in React.objects.all()]
        return Response(detail)

    def post(self, request):

        grid_string = request.data.get('grid')
        serializer = ReactSerializer(data={'grid': grid_string})  
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Grid saved successfully"}, status=201)
        return Response(serializer.errors, status=400)


class PromptFormView(APIView):
    def get(self, request):
        print("???")
        return Response()

    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        return Response("test")
