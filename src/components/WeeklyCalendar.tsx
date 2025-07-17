import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { set } from "firebase/database";

dayjs.extend(isoWeek); // Week starts on Monday

const WeeklyCalendar = ({ weeklycal }: { weeklycal: (start: Date, end: Date) => void }) => {

  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({});
  const [weekRange, setWeekRange] = useState<{
    start: string | null;
    end: string | null;
  }>({
    start: null,
    end: null,
  });

  const selectWeek = (dateString: string) => {
    const startOfWeek = dayjs(dateString).startOf("week").add(0, "day"); // Monday
    const endOfWeek = startOfWeek.add(6, "day");

    const newMarked: { [key: string]: any } = {};
    for (let i = 0; i < 7; i++) {
      const date = startOfWeek.add(i, "day").format("YYYY-MM-DD");
      newMarked[date] = {
        selected: true,
        startingDay: i === 0,
        endingDay: i === 6,
        color: "#00adf5",
        textColor: "white",
      };
    }
    weeklycal(startOfWeek.toDate(), endOfWeek.toDate());


    setMarkedDates(newMarked);
    setWeekRange({
      start: startOfWeek.format("YYYY-MM-DD"),
      end: endOfWeek.format("YYYY-MM-DD"),
    });
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Week</Text>
      <Calendar
        markingType="period"
        markedDates={markedDates}
        onDayPress={(day) => selectWeek(day.dateString)}
        theme={{
          todayTextColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          arrowColor: "#00adf5",
        }}
      />
      {weekRange.start && weekRange.end && (
        <Text style={styles.rangeText}>
          Selected Week: {weekRange.start} → {weekRange.end}
        </Text>
      )}
    </View>
  );
};

export default WeeklyCalendar;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  rangeText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
});
