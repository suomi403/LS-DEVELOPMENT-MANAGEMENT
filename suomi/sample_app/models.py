from django.db import models

# Create your models here.
class Task(models.Model):
    task_id = models.AutoField('task id', primary_key=True)
    task_name = models.CharField('task name', max_length=100)
    task_detail = models.TextField('task detail', blank=True, max_length=250)
    create_date = models.DateTimeField('create date', auto_now_add=True)
    deadline = models.DateTimeField('deadline', null=True, blank=True)
    complete_flag = models.BooleanField('complete flag', default=False)
    complete_date = models.DateTimeField('complete date', null=True, blank=True)
    delete_flag = models.BooleanField('delete flag', default=False)

    def __str__(self):
        return self.task_name
