import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import ScholarLogo from "../components/ScholarLogo";
import SubjectItem from "../components/SubjectItem";

const AddSubjectScreen = ({ navigation }) => {
  const [newSubject, setNewSubject] = useState("");
  const [error, setError] = useState("");

  const { user } = useAuth();
  const { subjects, addSubject, deleteSubject } = useData();

  const handleAddSubject = () => {
    if (!newSubject.trim()) {
      setError("Please enter a subject name");
      return;
    }

    setError("");

    try {
      addSubject(newSubject.trim());
      setNewSubject("");
    } catch (err) {
      setError(err?.message || "Failed to add subject");
    }
  };

  const handleDeleteSubject = (id) => {
    try {
      deleteSubject(id);
    } catch (err) {
      setError(err?.message || "Failed to delete subject");
    }
  };

  const handleContinue = () => {
    if (subjects.length === 0) {
      setError("Please add at least one subject");
      return;
    }

    navigation.navigate("MainApp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ScholarLogo />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Add your subjects</Text>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newSubject}
            onChangeText={setNewSubject}
            placeholder="Subject"
          />
          <TouchableOpacity onPress={handleAddSubject} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.subjectList}>
          {subjects.length === 0 ? (
            <Text style={styles.noSubjectsText}>No subjects added yet. Add your first subject above.</Text>
          ) : (
            subjects.map((subject) => (
              <SubjectItem
                key={subject.id}
                id={subject.id}
                name={subject.name}
                onDelete={handleDeleteSubject}
              />
            ))
          )}
        </View>

        <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Let's Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  errorContainer: {
    backgroundColor: "#f8d7da",
    padding: 10,
    marginBottom: 12,
  },
  errorText: {
    color: "#721c24",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 4,
  },
  addButton: {
    backgroundColor: "#4a90e2",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  subjectList: {
    flex: 1,
    marginBottom: 20,
  },
  noSubjectsText: {
    textAlign: "center",
    color: "#aaa",
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#4a90e2",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default AddSubjectScreen;
