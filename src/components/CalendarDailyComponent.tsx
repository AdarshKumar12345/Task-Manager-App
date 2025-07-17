import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

const CalendarDailyComponent = ({
  dailycal,
}: {
  dailycal: (startDate: Date, endDate: Date) => void;
}) => {
  const [selected, setSelected] = useState('');

  const handleDayPress = (day: any) => {
    setSelected(day.dateString);

    // Create start and end date range
    const selectedDate = new Date(day.dateString);
    const startDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      0,
      0,
      0
    );
    const endDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      23,
      59,
      59
    );

    dailycal(startDate, endDate);
  };

  return (
    <Calendar
      onDayPress={handleDayPress}
      markedDates={{
        [selected]: {
          selected: true,
          marked: true,
          dotColor: 'yellow',
        },
      }}
    />
  );
};

export default CalendarDailyComponent;

const styles = StyleSheet.create({});
