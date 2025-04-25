import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { useData } from "../context/DataContext";
import GoalItem from "../components/GoalItem";
import UserHeader from "../components/UserHeader";
import { auth } from '../firebase/firebaseconfig';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const { goals, subjects, addGoal, toggleGoalCompletion, deleteGoal, updateGoal, setSubjects } = useData();
  const [newGoal, setNewGoal] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [description, setDescription] = useState("");
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      // Get user info
      if (auth.currentUser) {
        setUser(auth.currentUser);
      }

      // Load goals from AsyncStorage
      try {
        const savedGoals = await AsyncStorage.getItem("goals");
        if (savedGoals) {
          setGoals(JSON.parse(savedGoals));
        }

        const savedSubjects = await AsyncStorage.getItem("subjects");
        if (savedSubjects) {
          setSubjects(JSON.parse(savedSubjects));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadUserData();
  }, []);
  const handleAddGoal = () => {
    if (!newGoal.trim() || !selectedSubject) return;

    const newGoalItem = {
      title: newGoal,
      subject: selectedSubject,
      description,
      date: new Date().toISOString(),
    };

    addGoal(newGoalItem);
    setNewGoal("");
    setSelectedSubject("");
    setDescription("");
    setShowAddGoal(false);
    setShowSubjectDropdown(false);
  };
  const handleCloseGoal = () => {
    setNewGoal("");
    setSelectedSubject("");
    setDescription("");
    setShowAddGoal(false);
    setShowSubjectDropdown(false);
  };

  const renderAddGoalForm = () => {
    if (!showAddGoal) return null;

    return (
      <View style={styles.goalForm}>
        <Text style={styles.formLabel}>Goal</Text>
        <TextInput
          style={styles.input}
          placeholder="write your goal"
          value={newGoal}
          onChangeText={setNewGoal}
        />

        <Text style={styles.formLabel}>Select Subject</Text>
        <TouchableOpacity
          style={styles.selectContainer}
          onPress={() => setShowSubjectDropdown(!showSubjectDropdown)}
        >
          <Text style={styles.selectText}>
            {selectedSubject || "Tap to select a subject"}
          </Text>
          <Ionicons name="chevron-down" size={20} />
        </TouchableOpacity>

        {showSubjectDropdown && (
          <View style={styles.dropdown}>
            {subjects.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={styles.subjectItem}
                onPress={() => {
                  setSelectedSubject(item.name);
                  setShowSubjectDropdown(false);
                }}
              >
                <Text style={styles.subjectItemList}>{`${index + 1}. ${item.name}`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}


        <Text style={styles.formLabel}>Add Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description ...."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <UserHeader
        username={user?.displayName}
        onTimerPress={() => navigation.navigate("Timer")}
      />

      <ScrollView style={styles.content}>
        {showAddGoal ? (
          <>
            <Text style={styles.sectionTitle}>Add Goal</Text>
            {renderAddGoalForm()}
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Today's Study Goals</Text>
            {goals.length === 0 ? (
              <Text style={styles.noGoalsText}>No goals added yet.</Text>
            ) : (
              goals.map((goal) => (
                <GoalItem
                  key={goal.id}
                  goal={goal}
                  onToggleComplete={toggleGoalCompletion}
                  onDelete={deleteGoal}
                  onEdit={updateGoal}
                />
              ))
            )}
          </>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          if (showAddGoal) handleAddGoal();
          else setShowAddGoal(true);
        }}
      >
        <Ionicons
          name={showAddGoal ? "checkmark" : "add"}
          size={30}
          color="#fff"
        />
      </TouchableOpacity>
      {showAddGoal && <TouchableOpacity
        style={styles.fabCross}
        onPress={() => {
          if (showAddGoal) handleCloseGoal();
          else setShowAddGoal(true);
        }}
      >
        <Ionicons
          name={"close"}
          size={30}
          color="#fff"
        />
      </TouchableOpacity>
      }
    </View >
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4a90e2",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 14,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  timerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  goalItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  goalCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  goalSubject: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  goalDescription: {
    fontSize: 14,
    color: "#666",
  },
  goalActions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  goalActionButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#e25c5c",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  infoButton: {
    marginLeft: 5,
  },
  noGoalsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4a90e2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabCross: {
    position: "absolute",
    left: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4a90e2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  goalForm: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: {
    width: '70%',
    color: "#666",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subjectItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  subjectItemList: {
    fontSize: 16,
    color: "#333",
  },
});

export default HomeScreen;