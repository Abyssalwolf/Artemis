import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No tasks yet. Add your first task to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="flex items-start justify-between p-6">
            <div className="flex items-start space-x-4">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggle(task.id)}
                className="mt-1"
              />
              <div>
                <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                  {task.title}
                </h3>
                <p className={`text-sm ${task.completed ? "line-through text-muted-foreground" : "text-muted-foreground"}`}>
                  {task.description}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}