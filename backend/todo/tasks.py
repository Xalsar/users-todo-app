from time import sleep

# Create your tasks here

from celery import shared_task, current_task
from todo.models import User, Todo
from django.http.response import JsonResponse
from todo.serializers import UserSerializer, TodoSerializer


@shared_task
def add(x, y):
    return x + y


@shared_task
def mul(x, y):
    return x * y


@shared_task
def xsum(numbers):
    return sum(numbers)

@shared_task
def hola():
    return "Hello!"

@shared_task
def user_list():
    users = User.objects.all()
    usersSerialized = UserSerializer(users, many=True)
    return usersSerialized.data

@shared_task
def do_work():
    for i in range(100):
        sleep(0.1)
        current_task.update_state(state='PROGRESS', meta={'current': i, 'total': 100})