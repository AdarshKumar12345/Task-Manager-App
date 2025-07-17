import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CalendarDailyComponent from "./CalendarDailyComponent";
import WeeklyCalendar from "./WeeklyCalendar";
import { Button } from "react-native-paper";
import { set } from "firebase/database";
import CalendarMonthly from "./CalendarMontly";
import PerDayComponent from "./PerDayComponent";

const TimePeriod = ({ setTimePeriod }: { setTimePeriod: (startDate: Date, endDate: Date, timePeriodType:string) => void }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timePeriodType, setTimePeriodType] = useState<string>("");

  const perdaycal = (start: Date, end: Date) => {
    setTimePeriod(start, end, "perday");
    setStartDate(start);
    setEndDate(end);
    console.log("Start Date:", start);
    console.log("End Date:", end);
  };

  const dailycal = (start: Date, end: Date) => {
    setTimePeriod(start, end, "daily");
    setStartDate(start);
    setEndDate(end);
    console.log("Start Date:", start);
    console.log("End Date:", end);
  };
  const weeklycal = (start: Date, end: Date) => {
    setTimePeriod(start, end, "weekly");
    setStartDate(start);
    setEndDate(end);
    console.log("Start Date:", start);
    console.log("End Date:", end);
  };
  const monthlycal = (start: Date, end: Date) => {
    setTimePeriod(start, end, "monthly");
    setStartDate(start);
    setEndDate(end);
    console.log("Start Date:", start);
    console.log("End Date:", end);
  };

  return (

    <View style={styles.container}>
      <Text style={styles.label}>Time Period:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      
      <View style={styles.buttonGroup}>
        <Button style={styles.button} buttonColor="#98A1BC"  mode="contained" onPress={() => setTimePeriodType("perday")}>
          Daily
        </Button>
        <Button style={styles.button} buttonColor="#98A1BC" mode="contained" onPress={() => setTimePeriodType("daily")}>
          Day
        </Button>
        <Button style={styles.button} buttonColor="#98A1BC" mode="contained" onPress={() => setTimePeriodType("weekly")}>
          Week
        </Button>
        <Button style={styles.button} buttonColor="#98A1BC" mode="contained" onPress={() => setTimePeriodType("monthly")}>
          Month
        </Button>
      </View>
      </ScrollView>
      
     <ScrollView>
      <View>
      {timePeriodType === "daily" && (
        <>
          <CalendarDailyComponent dailycal={dailycal} />
          <Text style={styles.header}>Selected Dates</Text>
          <Text>day: {startDate.toDateString()}</Text>
        </>
      )}
      {timePeriodType === "weekly" && (
        <>
          <WeeklyCalendar weeklycal={weeklycal} />
          <Text style={styles.header}>Selected Dates</Text>
          <Text>Start: {startDate.toDateString()}</Text>
          <Text>End: {endDate.toDateString()}</Text>
        </>
      )}
      {timePeriodType === "monthly" && (
        <>
          <CalendarMonthly monthlycal={monthlycal} />
          <Text style={styles.header}>Selected Dates</Text>
          <Text>Start: {startDate.toDateString()}</Text>
          <Text>End: {endDate.toDateString()}</Text>
        </>
      )}
      {timePeriodType === "perday" && (
        <PerDayComponent perdaycal={perdaycal} />
      )}
    </View>
    
    </ScrollView>
    </View>

  );
};

export default TimePeriod;

const styles = StyleSheet.create({
  container: {
    padding: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  button:{
    
    
  }
});
