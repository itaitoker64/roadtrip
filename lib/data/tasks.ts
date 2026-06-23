export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignee: string | null;
  due: string | null; // ISO date
}

export const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "לעשות",
  doing: "בתהליך",
  done: "הושלם",
};

export const STATUS_ORDER: TaskStatus[] = ["todo", "doing", "done"];

const seed: [string, string | null, string | null][] = [
  ["להזמין טיסות לכל החמישה", "me", "2026-03-01"],
  ["להשכיר ואן 9 מקומות", "dad", "2026-03-15"],
  ["להזמין מדריך קניונינג", "bro", "2026-04-01"],
  ["לרכוש ביטוח נסיעות", "mom", "2026-04-15"],
  ["לבדוק תוקף דרכונים (6 חודשים)", "mom", "2026-02-15"],
  ["להזמין וילה / לינה לכל השבוע", "me", "2026-03-10"],
  ["להזמין כרטיסי סירה למפרץ אורוזאי", "gf", "2026-05-01"],
  ["להזמין eSIM / להמיר מטבע", "gf", "2026-06-15"],
];

export const TASK_SEED: Task[] = seed.map(([title, assignee, due], i) => ({
  id: `task-${i}`,
  title,
  status: "todo",
  assignee,
  due,
}));
