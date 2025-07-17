import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DailyTasksComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>

      {tasks.length === 0 ? (
        <Text style={styles.noTaskText}>No tasks available</Text>
      ) : (
        tasks.map((task) => (
          <Card key={task.id} style={styles.card}>
            <Card.Title title={task.title} titleStyle={styles.cardTitle} />
            <Card.Content>
              <Text style={styles.description}>{task.description}</Text>
              <View style={styles.metaContainer}>
                <Text style={styles.dueDate}>Due: {task.endDate}</Text>
                <Text style={styles.createdAt}>Created: {task.createdAt}</Text>
              </View>
            </Card.Content>
            <Card.Actions style={styles.actions}>
              <Button mode="contained-tonal">Edit</Button>
              <Button mode="contained" buttonColor="#e53935" textColor="white">
                Delete
              </Button>
            </Card.Actions>
          </Card>
        ))
      )}
    </View>
  )
}

export default DailyTasksComponent

const styles = StyleSheet.create({})