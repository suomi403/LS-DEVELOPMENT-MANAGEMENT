import Link from 'next/link';

interface TaskFormProps {
  task?: {
    task_id?: number;
    task_name: string;
    task_detail: string;
    deadline: string;
  };
}

export default function TaskForm({ task }: TaskFormProps) {
  const isEdit = !!task?.task_id;
  // 送信先のAPIエンドポイントを条件分岐
  const actionUrl = isEdit ? `/api/tasks/edit` : `/api/tasks/create`;

  return (
    <main>
      <h4>タスクの追加/編集</h4>
      <form action={actionUrl} method="POST">
        {isEdit && <input type="hidden" name="task_id" value={task.task_id} />}
        
        <div>
          <label>タスク名: </label>
          <input type="text" name="task_name" defaultValue={task?.task_name || ''} required />
        </div>
        
        <div>
          <label>タスク概要: </label>
          <textarea name="task_detail" defaultValue={task?.task_detail || ''} />
        </div>
        
        <div>
          <label>期限: </label>
          <input type="date" name="deadline" defaultValue={task?.deadline || ''} />
        </div>

        <br />
        <button type="submit">送信</button>
      </form>
      <br />
      <Link href="/tasks">戻る</Link>
    </main>
  );
}