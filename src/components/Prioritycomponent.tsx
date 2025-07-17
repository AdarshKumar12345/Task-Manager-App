import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

type PriorityComponentProps = {
  handlePriorityChange: (value: string) => void;
};

const PriorityComponent: React.FC<PriorityComponentProps> = ({ handlePriorityChange }) => {
  const [priority, setPriority] = React.useState('medium');

  const handleChange = (value: string) => {
    setPriority(value);
    handlePriorityChange(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Priority:</Text>
      <RadioButton.Group onValueChange={handleChange} value={priority}>
        {['low', 'medium', 'high'].map((level) => (
          <View style={styles.option} key={level}>
            <RadioButton value={level} />
            <Text style={styles.text}>{level.charAt(0).toUpperCase() + level.slice(1)}</Text>
          </View>
        ))}
      </RadioButton.Group>
    </View>
  );
};

export default PriorityComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  text: {
    fontSize: 15,
    color: '#444',
  },
});
