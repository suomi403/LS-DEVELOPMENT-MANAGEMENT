from django.urls import path
from suomi_app import views


app_name = 'suomi_app'
urlpatterns = [
    path('task/create/', views.create_task, name='create_task'),  # 作成
    path('task/edit/<int:task_id>/', views.edit_task, name='edit_task'),  # 修正
    path('task/complete/<int:task_id>/', views.complete_task, name='complete_task'),  # 完了
    path('task/', views.read_task, name='read_task'),   # 一覧表示
    path('task/delete/<int:task_id>/', views.delete_task, name='delete_task'),   # 削除
]
