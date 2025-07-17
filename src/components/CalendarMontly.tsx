import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const months = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

export default function CalendarMonthly({monthlycal}: { monthlycal: (start: Date, end: Date) => void }) {
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(()=>{
    if (selectedMonth) {
      const startDate = new Date(new Date().getFullYear(), parseInt(selectedMonth) - 1, 1);
      const endDate = new Date(new Date().getFullYear(), parseInt(selectedMonth), 0);
      monthlycal(startDate, endDate);
    }
    

  } , [selectedMonth]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Month</Text>
      
      <RNPickerSelect
        placeholder={{ label: 'Select month...', value: null }}
        items={months}
        onValueChange={(value) => setSelectedMonth(value)}
        style={pickerSelectStyles}
      />

      {selectedMonth && (
        <Text style={styles.result}>
          Selected Month: {months.find(m => m.value === selectedMonth)?.label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
    paddingRight: 30,
  },
});
