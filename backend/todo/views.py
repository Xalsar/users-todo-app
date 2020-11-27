from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from .models import User, Todo
from .serializers import UserSerializer, TodoSerializer

# Users


@api_view(['GET', 'POST'])
def list_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        usersSerialized = UserSerializer(users, many=True)
        return JsonResponse(usersSerialized.data, safe=False)
    if request.method == 'POST':
        todoData = JSONParser().parse(request)

        try:
            todoData["title"]
            todoData["description"]
            todoData["userId"]
        except:
            return JsonResponse({'message': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(pk=todoData['userId'])
        except User.DoesNotExist:
            return JsonResponse({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

        user.todos.create(
            title=todoData["title"], description=todoData["description"]
        )

        user.save()

        return JsonResponse(UserSerializer(user), safe=False)
