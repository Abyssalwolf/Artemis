"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TaskList from "@/components/TaskList";
import AddTaskDialog from "@/components/AddTaskDialog";

interface UserDetails {
  name: string;
  age: string;
  routine: string;
}

export default function TasksPage() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState<Array<{ id: string; title: string; description: string; completed: boolean }>>([]);

  useEffect(() => {
    const storedDetails = localStorage.getItem("userDetails");
    if (!storedDetails) {
      router.push("/");
      return;
    }
    setUserDetails(JSON.parse(storedDetails));
    
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [router]);

  const addTask = (task: { title: string; description: string }) => {
    const newTask = {
      id: Date.now().toString(),
      ...task,
      completed: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsAddTaskOpen(false);
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  if (!userDetails) return null;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome, {userDetails.name}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Age: {userDetails.age}</p>
            <p className="text-muted-foreground mt-2">Daily Routine: {userDetails.routine}</p>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Tasks</h2>
          <Button onClick={() => setIsAddTaskOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />

        <AddTaskDialog
          open={isAddTaskOpen}
          onOpenChange={setIsAddTaskOpen}
          onAddTask={addTask}
        />
      </div>
    </div>
  );
}