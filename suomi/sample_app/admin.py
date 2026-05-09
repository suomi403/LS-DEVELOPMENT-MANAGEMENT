from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Task

# Register your models here.
admin.site.register(Task)
admin.site.unregister(Group)
