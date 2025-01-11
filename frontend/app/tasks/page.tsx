"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Calendar, Clock, User2 } from "lucide-react";
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
  const [tasks, setTasks] = useState<
    Array<{
      id: string;
      title: string;
      description: string;
      completed: boolean;
    }>
  >([]);

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
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  if (!userDetails) return null;

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Welcome Section */}
        <Card className="border-none shadow-lg bg-gradient-to-r from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
              <span className="text-white">Welcome back,</span>{" "}
              {userDetails.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <User2 className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">
                Age: {userDetails.age}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">
                Routine: {userDetails.routine}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Progress Card */}
        <Card className="border-none shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Task Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>
              <Button
                onClick={() => setIsAddTaskOpen(true)}
                className="bg-primary hover:bg-primary/90 buttonn"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Your Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            </div>
          </CardContent>
        </Card>

        {/* Add Task Dialog */}
        <AddTaskDialog
          open={isAddTaskOpen}
          onOpenChange={setIsAddTaskOpen}
          onAddTask={addTask}
        />
      </div>
    </div>
  );
}
