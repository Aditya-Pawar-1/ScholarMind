import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { useData } from "../context/DataContext";

const SubjectsSetup = ({ navigation }) => {
  const [subject, setSubject] = useState("");
  const { subjects, addSubject, deleteSubject } = useData();

  const handleAddSubject = () => {
    try {
      if (subject.trim()) {
        addSubject(subject.trim());
        setSubject("");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleRemoveSubject = (id) => {
    try {
      deleteSubject(id);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleContinue = () => {
    if (subjects.length > 0) {
      navigation.navigate("MainApp");
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.subjectItem}>
      <Text style={styles.subjectNumber}>{index + 1}.</Text>
      <Text style={styles.subjectName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleRemoveSubject(item.id)}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://eeaa294a-9ee4-4387-9297-e47587d9b7ba.lovableproject.com/lovable-uploads/c7619878-13c4-44c3-9e5c-23d84169a8dc.png",
          }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>ScholarMind</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Add your subjects</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={subject}
            onChangeText={setSubject}
            placeholder="Subject"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddSubject}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={subjects}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.subjectsList}
        />

        <TouchableOpacity
          style={[
            styles.continueButton,
            subjects.length === 0 ? styles.disabledButton : null,
          ]}
          onPress={handleContinue}
          disabled={subjects.length === 0}
        >
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4990E2",
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#4990E2",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  subjectsList: {
    marginBottom: 20,
  },
  subjectItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  subjectNumber: {
    width: 30,
    fontSize: 16,
    fontWeight: "bold",
  },
  subjectName: {
    flex: 1,
    fontSize: 16,
  },
  deleteIcon: {
    fontSize: 18,
    color: "#4990E2",
  },
  continueButton: {
    backgroundColor: "#4990E2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: "auto",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SubjectsSetup;
