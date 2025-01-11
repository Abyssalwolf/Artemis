import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./addtask.css";

interface Task {
  id: string;
  title: string;
  description: string;
  expectedDays: number;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dailyMinutes, setDailyMinutes] = useState("");
  const [totalMinutes, setTotalMinutes] = useState("");

  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No tasks yet. Add your first task to get started!
      </div>
    );
  }

  const getNeonShadowClass = (expectedDays: number) => {
    if (expectedDays <= 1) return "neon-red";
    if (expectedDays > 1 && expectedDays <= 10) return "neon-orange";
    return "neon-green";
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setDailyMinutes("");
    setTotalMinutes("");
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    // Here you can handle the submission of time commitments in minutes
    console.log({
      taskId: selectedTask?.id,
      dailyTimeCommitment: parseInt(dailyMinutes),
      totalTimeCommitment: parseInt(totalMinutes),
    });
    setIsModalOpen(false);
    window.location.href = `/focus`;
  };

  return (
    <>
      <div className="card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`relative aspect-square ${getNeonShadowClass(
              task.expectedDays
            )} shadow-lg hover:shadow-xl transition-shadow duration-300`}
          >
            <CardContent className="flex flex-col h-full p-6 bg-neutral-800">
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
              </div>
              <div className="flex justify-end mt-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(task.id)}
                  className="absolute top-0 right-0 mt-4 mr-4 text-destructive hover:text-destructive/90"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <button
                  className="buttonn"
                  onClick={() => handleViewTask(task)}
                >
                  View Task
                  <div className="star-1 buttonn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      style={{
                        shapeRendering: "geometricPrecision",
                        textRendering: "geometricPrecision",
                        imageRendering: "auto",
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                      }}
                      viewBox="0 0 784.11 815.53"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs></defs>
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path
                          className="fil0"
                          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      style={{
                        shapeRendering: "geometricPrecision",
                        textRendering: "geometricPrecision",
                        imageRendering: "auto",
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                      }}
                      viewBox="0 0 784.11 815.53"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs></defs>
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path
                          className="fil0"
                          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      style={{
                        shapeRendering: "geometricPrecision",
                        textRendering: "geometricPrecision",
                        imageRendering: "auto",
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                      }}
                      viewBox="0 0 784.11 815.53"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs></defs>
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path
                          className="fil0"
                          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      style={{
                        shapeRendering: "geometricPrecision",
                        textRendering: "geometricPrecision",
                        imageRendering: "auto",
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                      }}
                      viewBox="0 0 784.11 815.53"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs></defs>
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path
                          className="fil0"
                          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      style={{
                        shapeRendering: "geometricPrecision",
                        textRendering: "geometricPrecision",
                        imageRendering: "auto",
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                      }}
                      viewBox="0 0 784.11 815.53"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs></defs>
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path
                          className="fil0"
                          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="star-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      style={{
                        shapeRendering: "geometricPrecision",
                        textRendering: "geometricPrecision",
                        imageRendering: "auto",
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                      }}
                      viewBox="0 0 784.11 815.53"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <defs></defs>
                      <g id="Layer_x0020_1">
                        <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                        <path
                          className="fil0"
                          d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {selectedTask?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Description</h4>
              <p className="mt-1 text-sm">{selectedTask?.description}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="daily-time">
                  How many minutes can you spend today?
                </Label>
                <Input
                  id="daily-time"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Enter minutes (e.g., 30)"
                  value={dailyMinutes}
                  onChange={(e) => setDailyMinutes(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="total-time">
                  How many total minutes are you willing to spend on this
                  project?
                </Label>
                <Input
                  id="total-time"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Enter minutes (e.g., 120)"
                  value={totalMinutes}
                  onChange={(e) => setTotalMinutes(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} className="w-full mt-4 btn">
              Start Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
