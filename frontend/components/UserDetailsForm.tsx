"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserCircle, Calendar, ClipboardList, CheckCircle } from "lucide-react";

const UserDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    routine: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (
      !formData.age ||
      isNaN(Number(formData.age)) ||
      Number(formData.age) <= 0
    ) {
      newErrors.age = "Please enter a valid age";
    }
    if (formData.routine.length < 10) {
      newErrors.routine = "Please provide more details about your routine";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <h2 className="text-2xl font-bold">Thank you!</h2>
            <p className="text-gray-600">
              Your details have been successfully submitted.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", age: "", routine: "" });
              }}
              className="mt-4"
            >
              Submit Another Response
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Tell us about yourself
        </CardTitle>
        <CardDescription className="text-center">
          Please fill in your personal details below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <UserCircle className="w-5 h-5 text-blue-500" />
              <label className="text-sm font-medium">Name</label>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
            {errors.name && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription>{errors.name}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <label className="text-sm font-medium">Age</label>
            </div>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your age"
            />
            {errors.age && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription>{errors.age}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ClipboardList className="w-5 h-5 text-blue-500" />
              <label className="text-sm font-medium">Daily Routine</label>
            </div>
            <textarea
              name="routine"
              value={formData.routine}
              onChange={handleChange}
              className="w-full p-2 border rounded-md min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about your daily routine..."
            />
            {errors.routine && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription>{errors.routine}</AlertDescription>
              </Alert>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserDetailsForm;
