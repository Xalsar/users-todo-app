from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from .models import User, Todo
from .serializers import UserSerializer, TodoSerializer
from .tasks import do_work
from celery.result import AsyncResult

# Users


@api_view(['GET', 'POST'])
def users(request):
    if request.method == 'GET':
        users = User.objects.all()
        usersSerialized = UserSerializer(users, many=True)
        return JsonResponse(usersSerialized.data, safe=False)
    if request.method == 'POST':
        title = request.data["title"]
        description = request.data["description"]
        userId = request.data["userId"]

        try:
            title
            description
            userId
        except:
            return JsonResponse({'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(pk=userId)
        except User.DoesNotExist:
            return JsonResponse({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

        user.todos.create(
            title=title, description=description
        )

        user.save()

        userSerialized = UserSerializer(user)
        return JsonResponse(userSerialized.data, safe=False)


@api_view(['POST'])
def updateTodo(request):
    id = request.data["id"]
    title = request.data["title"]
    description = request.data["description"]
    completed = request.data["completed"]

    try:
        id
        title
        description
        completed
    except:
        return JsonResponse({'message': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        todo = Todo.objects.get(id=id)
    except Todo.DoesNotExist:
        return JsonResponse({'message': 'Todo does not exist'}, status=status.HTTP_404_NOT_FOUND)

    todo.title = title
    todo.description = description
    todo.completed = completed

    todo.save()

    todoSerialized = TodoSerializer(todo)
    return JsonResponse(todoSerialized.data, safe=False)

@api_view(['POST'])
def start_process(request):
    job = do_work.delay()
    return JsonResponse({"id":job.id}, safe=False)

@api_view(['POST'])
def check_status(request):
    job = AsyncResult(request.data["taskId"])
    print(job.result)
    print(job.state)
    return JsonResponse({'result': job.result, 'state': job.state}, safe=False)