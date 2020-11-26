from django.db import models
from django.utils import timezone


class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    active = models.BooleanField(default=True)

    def _str_(self):
        return self.name


class Todo(models.Model):
    user = models.ForeignKey(User, related_name="todos",
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    start_time = models.DateTimeField(
        "Starting time for the task", default=timezone.now, blank=True)
    end_time = models.DateTimeField(
        "Time when task was ended", blank=True, null=True)

    def _str_(self):
        return self.title
