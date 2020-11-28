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
def users(request):
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
            return JsonResponse({'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(pk=todoData['userId'])
        except User.DoesNotExist:
            return JsonResponse({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

        user.todos.create(
            title=todoData["title"], description=todoData["description"]
        )

        user.save()

        userSerialized = UserSerializer(user)
        return JsonResponse(userSerialized.data, safe=False)


@api_view(['POST'])
def updateTodo(request):
    todoData = JSONParser().parse(request)

    try:
        todoData["id"]
        todoData["title"]
        todoData["description"]
        todoData["completed"]
    except:
        return JsonResponse({'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        todo = Todo.objects.get(id=todoData["id"])
    except Todo.DoesNotExist:
        return JsonResponse({'message': 'Todo does not exist'}, status=status.HTTP_404_NOT_FOUND)

    todo.title = todoData["title"]
    todo.description = todoData["description"]
    todo.completed = todoData["completed"]

    todo.save()

    todoSerialized = TodoSerializer(todo)
    return JsonResponse(todoSerialized.data, safe=False)
