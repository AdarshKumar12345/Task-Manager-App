import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Snackbar } from "react-native-paper";
import TimePeriod from "@/components/TimePeriod";
import { router, useFocusEffect } from "expo-router";
import PriorityComponent from "@/components/Prioritycomponent";
import { addTask } from "@/lib/firestore/TasksManagment";

const AddTaskScreen = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timePeriodType, setTimePeriodType] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("medium");

  const onShowSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

 const setTimePeriod = (startDate: Date, endDate: Date, timePeriodType: string) => {
   setStartDate(startDate);
   setEndDate(endDate);
   setTimePeriodType(timePeriodType);
 }


  const handlePriorityChange = (value: string) => {
    setPriority(value);
    console.log("Selected Priority:", value);
  }
  const handletitlechange = ( title : string )=>{
   setTitle(title);
  }
  const handleDescriptionChange = (description: string) => {
    setDescription(description);
  };

  const handleAddTask = async() => {
    if (
      !title ||
      !description ||
      title.trim() === "" ||
      description.trim() === ""
    ) {
      return onShowSnackbar("Please fill all fields");
    }
    console.log("Task Added:", { title, description });
    await addTask({
      title: title.trim(),
      description: description.trim(),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      tasktype: timePeriodType.trim(),
      priority: priority.trim(),
      completed: false,
    });
    onShowSnackbar("Task added successfully");
    router.replace("/Home");

  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16, backgroundColor: "#F4EBD3" }}>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    <View style={styles.container}>
      <Text style={styles.header}>Add Task</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Task Title"
          placeholderTextColor="#888"
          style={styles.input}
          onChangeText={handletitlechange}
        />
        <TextInput
          placeholder="Task Description"
          placeholderTextColor="#888"
          multiline
          style={[styles.input, styles.textArea]}
          onChangeText={handleDescriptionChange}
        />
      <PriorityComponent handlePriorityChange={handlePriorityChange} />
      <TimePeriod
        setTimePeriod={setTimePeriod}
      />
        <Button
          mode="contained"
          onPress={handleAddTask}
          style={{ marginTop: 16 }}

        >
          Add Task
        </Button>
      </View>
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4EBD3",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
    color: "#000",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default AddTaskScreen;
