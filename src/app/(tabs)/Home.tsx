import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}> Welcome back</Text>

        {/* Daily */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/TaskScreen",
              params: { type: "daily" },
            })
          }
        >
          <View style={styles.card}>
            <Image source={require("@/assets/daily.png")} style={styles.icon} />
            <Text style={styles.cardTitle}>Daily Tasks</Text>
          </View>
        </TouchableOpacity>

        {/* Weekly */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/TaskScreen",
              params: { type: "weekly" },
            })
          }
        >
          <View style={styles.card}>
            <Image
              source={require("@/assets/weekly.png")}
              style={styles.icon}
            />
            <Text style={styles.cardTitle}>Weekly Tasks</Text>
          </View>
        </TouchableOpacity>

        {/* Monthly */}
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/TaskScreen",
              params: { type: "monthly" },
            })
          }
        >
          <View style={styles.card}>
            <Image
              source={require("@/assets/monthly.png")}
              style={styles.icon}
            />
            <Text style={styles.cardTitle}>Monthly Tasks</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Task Button - Full Width & Bottom Fixed */}
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/AddTask")}
        style={styles.addtaskCard}
      >
        <Text style={[styles.cardTitle, { color: "#fff" , }]}>+ Add Your Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#98A1BC",
    paddingTop: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 100, // Make space for the button
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 100,
    height: 200,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34495e",
    marginTop: 10,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  addtaskCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#555879",
    borderRadius: 16,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
});
