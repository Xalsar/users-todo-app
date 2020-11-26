from django.contrib import admin

from .models import User, Todo

class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed', 'start_time', 'end_time')

admin.site.register(User, UserAdmin)
admin.site.register(Todo, TodoAdmin)


