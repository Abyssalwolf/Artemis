"use client";

import "./addtask.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  expectedDays: z
    .number()
    .int("Expected time must be an integer")
    .positive("Expected time must be a positive number")
    .min(1, "Expected time is required"),
});

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: {
    title: string;
    description: string;
    expectedDays: number;
  }) => void;
}

export default function AddTaskDialog({
  open,
  onOpenChange,
  onAddTask,
}: AddTaskDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      expectedDays: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Get existing tasks from localStorage
      const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

      // Create new task object
      const newTask = {
        id: `task_${Date.now()}`, // Generate unique ID
        title: values.title,
        description: values.description,
        expectedDays: values.expectedDays,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      // Add new task to existing tasks
      const updatedTasks = [...existingTasks, newTask];

      // Save updated tasks to localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      // Call the parent component's callback
      onAddTask(values);

      // Reset the form
      form.reset();

      // Close the dialog
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter task description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expectedDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Time (in days)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full buttonn">
              Add Task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
