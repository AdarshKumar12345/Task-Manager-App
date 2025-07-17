import React from "react";
import { db, auth } from "@/services/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Task } from "@/types/Tasks";

export const addTask = async (task: Omit<Task, "id" | "createdAt">) => {
  console.log("Adding task:", task);
  const user = auth.currentUser;
  console.log("Current user:", user);
  if (!user) {
    throw new Error("User not authenticated");
  }
  if (
    !task.title ||
    !task.description ||
    !task.startDate ||
    !task.endDate ||
    !task.tasktype ||
    !task.priority
  ) {
    throw new Error("Please fill all fields");
  }
  const taskData = {
    ...task,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  try {
    const docRef = await addDoc(
      collection(db, "users", user.uid, "tasks"),
      taskData
    );
    return docRef.id;
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Error adding task");
  }
};
export const fetchTasks = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  try {
    const tasksCollection = collection(db, "users", user.uid, "tasks");
    const tasks = await getDocs(tasksCollection);
    return tasks.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Error fetching tasks");
  }
};
export const updateTaskInDatabase = async (task: Task) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  try {
    const taskRef = doc(db, "users", user.uid, "tasks", task.id);
    await updateDoc(taskRef, {
      startDate: task.startDate,
      endDate: task.endDate,
      completed: task.completed,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Error updating task");
  }
};

export const deleteTask = async (taskId: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  try {
    const taskRef = doc(db, "users", user.uid, "tasks", taskId);
    await deleteDoc(taskRef);
    console.log("Task deleted successfully");
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Error deleting task");
  }
};
export const markCompleted = async (taskId: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  try {
    const taskRef = doc(db, "users", user.uid, "tasks", taskId);
    await updateDoc(taskRef, {
      completed: true,
    });
  } catch (error) {
    console.error("Error marking task as completed:", error);
    throw new Error("Error marking task as completed");
  }
};
