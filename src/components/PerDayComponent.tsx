import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { set } from 'firebase/database';

const PerDayComponent = ({ perdaycal }:{perdaycal : (start: Date, end: Date) => void}) => {
 const getTotalrange = () => {
    const start  = new Date();
    start.setHours( 0,0,0,0);
    const end = new Date();
    end.setHours(23,59,59,999);
    return { start, end };
 }

  const [startDate, setStartDate] = useState<Date>(()=> getTotalrange().start );
  const [endDate, setEndDate] = useState<Date>(()=> getTotalrange().end );

  useEffect(()=>{
    perdaycal(startDate, endDate);
  },[startDate, endDate])

  return (
    <View>
       <View><Text> startFrom today {startDate.toDateString()} </Text></View>
    </View>
  )
  
}

export default PerDayComponent

const styles = StyleSheet.create({})