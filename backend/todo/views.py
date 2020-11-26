from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Todo
from .serializers import UserSerializer, TodoSerializer


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
