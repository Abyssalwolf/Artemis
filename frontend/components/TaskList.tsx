import React from "react";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  description: string;
  expectedDays: number; // Update to expectedDays field
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

// Function to determine card color based on expected days
const getCardColor = (expectedDays: number) => {
  if (expectedDays <= 1) return "bg-red-500 text-white";
  if (expectedDays > 1 && expectedDays <= 10) return "bg-orange-500 text-white";
  return "bg-green-500 text-white";
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
          className={`aspect-square ${getCardColor(task.expectedDays)}`}
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
                      task.completed ? "line-through text-gray-300" : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                </div>
              </div>
              <p
                className={`text-sm ${
                  task.completed
                    ? "line-through text-gray-300"
                    : "text-gray-100"
                }`}
              >
                {task.description}
              </p>
              <p className="text-sm">
                Expected Time:{" "}
                <span
                  className={`${
                    task.expectedDays <= 1
                      ? "text-red-200"
                      : task.expectedDays > 1 && task.expectedDays <= 10
                      ? "text-orange-200"
                      : "text-green-200"
                  }`}
                >
                  {task.expectedDays === 1
                    ? "1 day"
                    : `${task.expectedDays} days`}
                </span>
              </p>
            </div>
            <div className="flex justify-end mt-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(task.id)}
                className="text-destructive hover:text-destructive/90 text-black"
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
