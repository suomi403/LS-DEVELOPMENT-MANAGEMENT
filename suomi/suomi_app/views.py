from django.shortcuts import render, get_object_or_404, redirect
from django.forms import ModelForm
from django.utils import timezone

from suomi_app.models import Task


def create_task(request):
    """
    新たなデータを作成する
    """
    # オブジェクトを新規作成する
    task = Task()

    # ページロード時
    if request.method == 'GET':
        form = TaskForm(instance=task)
        return render(request,
                      'suomi_app/task_form.html',  # 呼び出す Template
                      {'form': form})  # Template に渡すデータ

    # 実行ボタン押下時
    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)

        # 入力されたデータのバリデーション
        if form.is_valid():
            # チェック結果に問題なければデータを作成する
            task = form.save(commit=False)
            task.save()

        return redirect('suomi_app:read_task')


def read_task(request):
    """
    データの一覧を表示する
    """
    # 全オブジェクトを取得
    tasks = Task.objects.all().filter(delete_flag=False, complete_flag=False).order_by('task_id')
    return render(request,
                  'suomi_app/task_list.html',  # 呼び出す Template
                  {'tasks': tasks})  # Template に渡すデータ


def edit_task(request, task_id):
    """
    対象のデータを編集する
    """
    # IDを引数に、対象オブジェクトを取得
    task = get_object_or_404(Task, pk=task_id)

    # ページロード時
    if request.method == 'GET':
        form = TaskForm(instance=task)
        return render(request,
                      'suomi_app/task_form.html',  # 呼び出す Template
                      {'form': form, 'task_id': task_id})  # Template に渡すデータ

    # 実行ボタン押下時
    elif request.method == 'POST':
        form = TaskForm(request.POST, instance=task)

        # 入力されたデータのバリデーション
        if form.is_valid():
            # チェック結果に問題なければデータを更新する
            task = form.save(commit=False)
            task.save()

        return redirect('suomi_app:read_task')


def complete_task(request, task_id):
    """
    対象のデータを完了にする
    """
    # IDを引数に、対象オブジェクトを取得
    task = get_object_or_404(Task, pk=task_id)
    task.complete_flag = True
    task.complete_date = timezone.now()
    task.save()
    return redirect('suomi_app:read_task')


def delete_task(request, task_id):
    # 対象のオブジェクトを取得
    task = get_object_or_404(Task, pk=task_id)
    task.delete_flag = True
    task.save()
    return redirect('suomi_app:read_task')


class TaskForm(ModelForm):
    """
    フォーム定義
    """
    class Meta:
        model = Task
        # fields は models.py で定義している変数名
        fields = ('task_id','task_name','task_detail','deadline'
        # ,'complete_flag', 'complete_date'
        )
