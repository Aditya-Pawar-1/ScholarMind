import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GoalItem = ({ goal, onToggleComplete, onDelete, onEdit }) => {
  return (
    <View style={styles.goalItem}>
      <TouchableOpacity onPress={() => onToggleComplete(goal.id)} style={styles.checkbox}>
        {goal.completed ? (
          <Ionicons name="checkbox" size={24} color="#4a90e2" />
        ) : (
          <Ionicons name="square-outline" size={24} color="#4a90e2" />
        )}
      </TouchableOpacity>

      <View style={styles.goalContent}>
        <Text style={[styles.goalTitle, goal.completed && styles.goalCompleted]}>
          {goal.title}
        </Text>
        <Text style={styles.goalSubject}>Subject: {goal.subject}</Text>
        {goal.description ? (
          <Text style={styles.goalDescription}>Description: {goal.description}</Text>
        ) : null}
      </View>

      <View style={styles.goalActions}>
        {/* <TouchableOpacity style={styles.goalActionButton}>
          <Text style={styles.actionButtonText}
            onPress={() => onEdit(goal.id)}
          > Edit</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={[styles.goalActionButton, styles.deleteButton]} onPress={() => onDelete(goal.id)}>
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  checkbox: {
    marginBottom: 10,
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  goalCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  goalSubject: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  goalDescription: {
    fontSize: 14,
    color: '#666',
  },
  goalActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  goalActionButton: {
    width: '30%',
    backgroundColor: '#4a90e2',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#e25c5c',
  },
  actionButtonText: {
    width: '100%',
    color: '#fff',
  },
});

export default GoalItem;
