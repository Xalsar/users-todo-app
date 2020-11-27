from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from .models import User, Todo
from .serializers import UserSerializer, TodoSerializer

# Users


def list_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        usersSerialized = UserSerializer(users, many=True)
        return JsonResponse(usersSerialized.data, safe=False)
    if request.method == 'POST':
        return JsonResponse("Hello!", safe=False)
