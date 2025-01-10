import React from "react";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  description: string;
  expectedTime: string; // Adding expectedTime field
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

// Function to determine card color based on expected time
const getCardColor = (expectedTime: string) => {
  const [hours, minutes] = expectedTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes < 5) return "bg-red-500";
  if (totalMinutes < 15) return "bg-orange-500";
  return "bg-green-500";
};

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No tasks yet. Add your first task to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className={`aspect-square ${getCardColor(task.expectedTime)}`}
        >
          <CardContent className="flex flex-col h-full p-6">
            <div className="flex-1">
              <div className="flex items-start space-x-4 mb-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => onToggle(task.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                </div>
              </div>
              <p
                className={`text-sm ${
                  task.completed
                    ? "line-through text-muted-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {task.description}
              </p>
              <p
                className={`text-sm ${
                  task.completed
                    ? "line-through text-muted-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Expected Time: {task.expectedTime}
              </p>
            </div>
            <div className="flex justify-end mt-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(task.id)}
                className="text-destructive hover:text-destructive/90"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
