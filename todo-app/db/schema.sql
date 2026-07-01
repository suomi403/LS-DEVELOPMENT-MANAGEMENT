CREATE TABLE IF NOT EXISTS tasks (
  task_id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_name TEXT NOT NULL,                     -- CharField(max_length=100) ※SQLiteではTEXTで管理し、アプリ側で文字数制御
  task_detail TEXT DEFAULT '',                 -- TextField(blank=True, max_length=250)
  create_date TEXT DEFAULT (DATETIME('now', 'localtime')), -- DateTimeField(auto_now_add=True)
  deadline TEXT,                               -- DateTimeField(null=True, blank=True)
  complete_flag INTEGER DEFAULT 0,             -- BooleanField(default=False) -> 0か1で管理
  complete_date TEXT,                          -- DateTimeField(null=True, blank=True)
  delete_flag INTEGER DEFAULT 0                -- BooleanField(default=False) -> 0か1で管理
);