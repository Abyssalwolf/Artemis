import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CoolMode } from "./ui/cool-mode";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function UserDetailsForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      age: "",
      routine: "",
    },
  });

  const validateForm = (values) => {
    const errors = {};

    if (!values.name || values.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!values.age || isNaN(Number(values.age)) || Number(values.age) <= 0) {
      errors.age = "Please enter a valid age";
    }

    if (!values.routine || values.routine.length < 10) {
      errors.routine = "Please provide more details about your routine";
    }

    return errors;
  };

  function onSubmit(values) {
    const errors = validateForm(values);

    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((key) => {
        form.setError(key, {
          type: "manual",
          message: errors[key],
        });
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Generate a unique ID for the user
      const userId = `user_${Date.now()}`;

      // Create user data object
      const userData = {
        ...values,
        id: userId,
        createdAt: new Date().toISOString(),
      };

      // Save user data to localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      // Initialize empty tasks array
      localStorage.setItem("tasks", JSON.stringify([]));

      toast.success("Profile saved successfully!");
      console.log("Submitted values:", userData);

      // Navigate to tasks page
      router.push("/tasks");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to save profile");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div id="background">
        {Array.from({ length: 22 }).map((_, index) => (
          <div key={index}>
            <span></span>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto p-4"
      >
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Tell us about yourself
            </CardTitle>
            <CardDescription className="text-gray-500">
              Fill in your details to personalize your experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            {...field}
                            className="h-11 text-base transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                          />
                        </FormControl>
                        <FormDescription>
                          This is how we'll address you throughout the app
                        </FormDescription>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Age
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your age"
                            {...field}
                            className="h-11 text-base transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                          />
                        </FormControl>
                        <FormDescription>
                          Used to customize recommendations for you
                        </FormDescription>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <FormField
                    control={form.control}
                    name="routine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Daily Routine
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your daily routine..."
                            className="min-h-[150px] text-base transition-all duration-200 focus:ring-2 focus:ring-purple-500 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Help us understand your schedule better
                        </FormDescription>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CoolMode>
                    <Button
                      type="submit"
                      className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Profile"
                      )}
                    </Button>
                  </CoolMode>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
