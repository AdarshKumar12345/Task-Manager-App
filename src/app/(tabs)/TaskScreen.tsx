// import {
//   deleteTask,
//   fetchTasks,
//   markCompleted,
//   updateTaskInDatabase,
// } from "@/lib/firestore/TasksManagment";
// import { Task } from "@/types/Tasks";
// import { router, useLocalSearchParams } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { Button, Card } from "react-native-paper";
// const { useAuth } = require("@/context/AuthContext");

// const TaskScreen = () => {
//   const { type } = useLocalSearchParams();
//   console.log("Type of Task:", type);

//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   const handletask = (data: Task[]) => {
//     if (type === "daily") {
//       const today = new Date();
//       const updatedTasks = data.map((task) => {
//         if (task.tasktype === "perday" && new Date(task.startDate) > today) {
//           const newStartDate = new Date();
//           newStartDate.setHours(0, 0, 0, 0);
//           const newEndDate = new Date();
//           newEndDate.setHours(23, 59, 59, 999);
//           const updatedTask = {
//             ...task,
//             startDate: newStartDate.toISOString(),
//             endDate: newEndDate.toISOString(),
//             completed: false,
//           };

//           updateTaskInDatabase(updatedTask);
//           return updatedTask;
//         }
//         return task;
//       });
//       const filteredTasks = updatedTasks.filter((task) => {
//         return (
//           (task.tasktype === "daily" &&
//             new Date(task.endDate) >= today &&
//             new Date(task.startDate) <= today) ||
//           (task.tasktype === "perday" &&
//             new Date(task.startDate) <= today &&
//             new Date(task.endDate) >= today)
//         );
//       });

//       setTasks(filteredTasks);
//     } else if (type === "weekly") {
//       const today = new Date();
//       const filteredTasks = data.filter((task) => {
//         return (
//           task.tasktype === "weekly" &&
//           new Date(task.endDate) >= today &&
//           new Date(task.startDate) < today
//         );
//       });
//       setTasks(filteredTasks);
//     } else if (type === "monthly") {
//       const today = new Date();
//       const filteredTasks = data.filter((task) => {
//         return (
//           task.tasktype === "monthly" &&
//           new Date(task.endDate) >= today &&
//           new Date(task.startDate) <= today
//         );
//       });
//       setTasks(filteredTasks);
//     }
//   };
//   useEffect(() => {
//     const loadTasks = async () => {
//       if (!user) {
//         return;
//       }
//       setLoading(true);
//       try {
//         const data = await fetchTasks();
//         console.log("Fetched Tasks:", data);
//         handletask(data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         alert("Error fetching tasks");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadTasks();
//   }, [user]);
//   const handleCompleteTask = async (task: Task) => {
//     markCompleted(task.id);
//     setTasks((prevTasks) =>
//       prevTasks.map((t) =>
//         t.id === task.id ? { ...t, completed: true } : t
//       )
//     );
//   };
//   const handleDeleteTask = (task: Task) => {
//     deleteTask(task.id);
//     setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
//     alert("Task deleted successfully");
//     console.log("Task deleted:", task.id);
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#00ffcc" />
//         <Text style={styles.loadingText}>
//           We're getting things ready for you
//         </Text>
//       </View>
//     );
//   }

//   console.log("User in Home Screen:1", user);

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
//         <Text style={styles.header}>My Tasks</Text>

//         {tasks.length === 0 ? (
//           <Text style={styles.noTaskText}>No tasks available</Text>
//         ) : (
//           tasks.map((task) => (
//             <>{
//               task.completed ? (
//                 <ScrollView>
//                   <Text> Task Completed</Text>
//                 <Card key={task.id} style={styles.card}>
//               <Card.Title title={task.title} titleStyle={styles.cardTitle} />
//               <Card.Content>
//                 <Text style={styles.description}>{task.description}</Text>
//                 <View style={styles.metaContainer}>
//                   <Text style={styles.dueDate}>Due: {task.endDate}</Text>
//                   <Text style={styles.createdAt}>
//                     Created: {task.createdAt}
//                   </Text>
//                 </View>
//               </Card.Content>
//               <Card.Actions style={styles.actions}>
//                 <Button
//                   mode="contained-tonal"
//                   onPress={() => handleCompleteTask(task)}
//                 >
//                   completed
//                 </Button>
//                 <Button
//                   mode="contained"
//                   buttonColor="#e53935"
//                   textColor="white"
//                   onPress={() => handleDeleteTask(task)}
//                 >
//                   Delete
//                 </Button>
//               </Card.Actions>
//             </Card>
//             </ScrollView>
//               ):(
//                 <ScrollView>
//                   <Text> Task Not Completed</Text>
//                             <Card key={task.id} style={styles.card}>
//               <Card.Title title={task.title} titleStyle={styles.cardTitle} />
//               <Card.Content>
//                 <Text style={styles.description}>{task.description}</Text>
//                 <View style={styles.metaContainer}>
//                   <Text style={styles.dueDate}>Due: {task.endDate}</Text>
//                   <Text style={styles.createdAt}>
//                     Created: {task.createdAt}
//                   </Text>
//                 </View>
//               </Card.Content>
//               <Card.Actions style={styles.actions}>
//                 <Button
//                   mode="contained-tonal"
//                   onPress={() => handleCompleteTask(task)}
//                 >
//                   completed
//                 </Button>
//                 <Button
//                   mode="contained"
//                   buttonColor="#e53935"
//                   textColor="white"
//                   onPress={() => handleDeleteTask(task)}
//                 >
//                   Delete
//                 </Button>
//               </Card.Actions>
//             </Card>
//             </ScrollView>
//               )
//             }
//             </>

//           ))
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// export default TaskScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#555879",
//     paddingTop: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//     color: "white",
//   },
//   noTaskText: {
//     textAlign: "center",
//     color: "#fff",
//     fontSize: 16,
//     marginTop: 30,
//   },
//   card: {
//     marginVertical: 10,
//     marginHorizontal: 16,
//     borderRadius: 12,
//     elevation: 4,
//     backgroundColor: "#DED3C4",
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textTransform: "capitalize",
//     color: "#333",
//   },
//   description: {
//     fontSize: 14,
//     color: "#555",
//     marginTop: 4,
//     marginBottom: 10,
//   },
//   metaContainer: {
//     marginTop: 8,
//   },
//   dueDate: {
//     fontSize: 12,
//     color: "#d32f2f",
//     fontStyle: "italic",
//   },
//   createdAt: {
//     fontSize: 12,
//     color: "#888",
//   },
//   actions: {
//     justifyContent: "space-between",
//     paddingHorizontal: 8,
//     paddingBottom: 8,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000", // Optional: to match dark theme
//   },
//   loadingText: {
//     color: "white",
//     marginTop: 16,
//     fontSize: 16,
//     textAlign: "center",
//   },
// });

import {
  deleteTask,
  fetchTasks,
  markCompleted,
  updateTaskInDatabase,
} from "@/lib/firestore/TasksManagment";
import { Task } from "@/types/Tasks";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Badge, Button, Card, Divider, Text as PaperText } from "react-native-paper";
const { useAuth } = require("@/context/AuthContext");


const Prioritytext = ({task} : {task: Task}) =>{

  return(
    <View > 
      {
        task.priority === "high" && (
          <Badge style={[styles.badge, { backgroundColor: "#d32f2f" }]}  size={16} >
            
          </Badge>
        ) 
      }
      {task.priority === "medium" && (
          <Badge style={[styles.badge, { backgroundColor: "#FFA000" }]} size={16} >
            
          </Badge>
      )}
      {
        task.priority === "low" && (
          <Badge style={[styles.badge, { backgroundColor: "#4CAF50" }]} size={16} >
            
          </Badge>
        )
      }
    </View>
  )
}

  // A dedicated component for rendering a single task card.
// This improves code organization and reusability.
const TaskCard = ({ task, onComplete, onDelete }: { task: Task; onComplete: (task: Task) => void; onDelete: (task: Task) => void; }) => (
  <Card
    style={[
      styles.card,
      task.completed ? styles.completedCard : styles.pendingCard,
    ]}
  >
    <View style={styles.cardHeader}>
    <Card.Title
      title={task.title}
      titleStyle={[
        styles.cardTitle,
        task.completed && styles.completedCardTitle,
      ]}
    >
    </Card.Title>
    <View style={ { position: "absolute", right: 5, top: 5 }}>
      <Prioritytext task={task} />
    </View>
    </View>
    
    <Card.Content>
      <PaperText
        style={[
          styles.description,
          task.completed && styles.completedDescription,
        ]}
      >
        {task.description}
      </PaperText>
      <View style={styles.metaContainer}>
        <PaperText style={styles.dueDate}>Due: {new Date(task.endDate).toLocaleDateString()}</PaperText>
        <PaperText style={styles.createdAt}>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </PaperText>
      </View>
    </Card.Content>
    <Card.Actions style={styles.actions}>
      {!task.completed && (
        <Button
          mode="contained"
          onPress={() => onComplete(task)}
          style={styles.completeButton}
          labelStyle={styles.buttonLabel}
        >
          Mark as Complete
        </Button>
      )}
      <Button
        mode="outlined"
        onPress={() => onDelete(task)}
        style={styles.deleteButton}
        textColor="#e53935"
      >
        Delete
      </Button>
    </Card.Actions>
  </Card>
);

const TaskScreen = () => {
  const { type } = useLocalSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // This function filters tasks based on the type ('daily', 'weekly', 'monthly')
  const handleTaskFiltering = (data: Task[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999); // End of today

    // This logic handles recurring 'perday' tasks, resetting them for the current day if needed.
    const updatedTasks = data.map((task) => {
      if (
        task.tasktype === "perday" &&
        new Date(task.startDate) < today &&
        !task.completed
      ) {
        const newStartDate = new Date(today);
        const newEndDate = new Date(endOfToday);
        const updatedTask = {
          ...task,
          startDate: newStartDate.toISOString(),
          endDate: newEndDate.toISOString(),
          completed: false,
        };
        // Update in the database for persistence
        updateTaskInDatabase(updatedTask);
        return updatedTask;
      }
      return task;
    });

    let filteredTasks: Task[] = [];
    if (type === "daily") {
      filteredTasks = updatedTasks.filter((task) => {
        const taskStartDate = new Date(task.startDate);
        const taskEndDate = new Date(task.endDate);
        return (
          (task.tasktype === "daily" &&
            taskEndDate >= today &&
            taskStartDate <= today) ||
          (task.tasktype === "perday" &&
            taskStartDate <= endOfToday &&
            taskEndDate >= today)
        );
      });
    } else if (type === "weekly") {
      filteredTasks = data.filter(
        (task) =>
          task.tasktype === "weekly" &&
          new Date(task.endDate) >= today &&
          new Date(task.startDate) <= today
      );
    } else if (type === "monthly") {
      filteredTasks = data.filter(
        (task) =>
          task.tasktype === "monthly" &&
          new Date(task.endDate) >= today &&
          new Date(task.startDate) <= today
      );
    }
    setTasks(filteredTasks);
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadTasks = async () => {
      setLoading(true);
      try {
        const data = await fetchTasks();
        handleTaskFiltering(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        // Consider using a more user-friendly error display like a toast message
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [user, type]); // Rerun effect if user or type changes

  const handleCompleteTask = async (task: Task) => {
    try {
      await markCompleted(task.id);
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, completed: true } : t
        )
      );
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDeleteTask = async (task: Task) => {
    try {
      await deleteTask(task.id);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
      // Consider a less disruptive confirmation like a snackbar
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // useMemo helps to avoid re-calculating these lists on every render
  const incompleteTasks = useMemo(
    () => tasks.filter((task) => !task.completed),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed),
    [tasks]
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ffcc" />
        <Text style={styles.loadingText}>Loading your tasks...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.header}>{String(type).toUpperCase()} TASKS</Text>

      {/* Section for Incomplete Tasks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending ({incompleteTasks.length})</Text>
        {incompleteTasks.length === 0 ? (
          <Text style={styles.noTaskText}>No pending tasks. Great job!</Text>
        ) : (
          incompleteTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </View>

      <Divider style={styles.divider} />

      {/* Section for Completed Tasks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Completed ({completedTasks.length})</Text>
        {completedTasks.length === 0 ? (
          <Text style={styles.noTaskText}>No tasks completed yet.</Text>
        ) : (
          completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#555879", // Darker background
  },
  cardHeader:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },

  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginVertical: 20,
    letterSpacing: 1,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#E0E0E0",
    marginBottom: 15,
    paddingLeft: 5,
  },
  noTaskText: {
    textAlign: "center",
    color: "#A0A0A0",
    fontSize: 16,
    marginTop: 20,
    fontStyle: "italic",
  },
  card: {
    borderRadius: 12,
    elevation: 4,
    marginBottom: 15,
  },
  pendingCard: {
    backgroundColor: "#DED3C4",
  },
  completedCard: {
    backgroundColor: "#F4EBD3",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#555879",
  },
  completedCardTitle: {
    textDecorationLine: "line-through",
    color: "#555879",
  },
  description: {
    fontSize: 14,
    color: "black",
    marginTop: 4,
    marginBottom: 12,
  },
  completedDescription: {
    color: "#888",
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#444",
    paddingTop: 8,
  },
  dueDate: {
    fontSize: 12,
    color: "#98A1BC", 
    fontStyle: "italic",
  },
  createdAt: {
    fontSize: 12,
    color: "#555879",
  },
  actions: {
    justifyContent: "flex-end",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  completeButton: {
    backgroundColor: "#555879",
  },
  buttonLabel: {
    color: "#FFFFFF",
  },
  deleteButton: {
    borderColor: "#e53935",
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#98A1BC",
  },
  loadingText: {
    color: "white",
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
  divider: {
    backgroundColor: '#444',
    marginVertical: 20,
    marginHorizontal: 16,
  },
  badge:{
    backgroundColor: "#98A1BC",
    color: "#FFFFFF",
    marginRight: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
    overflow: "hidden",
    alignSelf: "flex-start",
    marginTop: 4,
    marginLeft: 8,
  }
});

