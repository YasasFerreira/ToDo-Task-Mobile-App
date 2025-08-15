import React, { useState } from "react";
import { Alert, View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaskedTextInput } from "react-native-mask-text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import Navigation from "../compos/Navigation";
import AddTask from "../compos/AddTask";
import { COLORS, FONTS } from "../constants/theme";

type Task = {
  id: string;
  title: string;
  date: string;
  sTime: string;
  eTime: string;
  priority: string;
  description: string;
  complete: boolean;
};

type RootStackParamList = {
  Home: undefined;
  EditTask: { task: Task };
};

type EditTaskProps = NativeStackScreenProps<RootStackParamList, "EditTask">;

function EditTask({ route }: EditTaskProps) {
  const { task } = route.params;
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [date, setDate] = useState(task.date);
  const [startTime, setStartTime] = useState(task.sTime);
  const [endTime, setEndTime] = useState(task.eTime);
  const [priority, setPriority] = useState(task.priority);
  const [description, setDescription] = useState(task.description);
  const [complete, setComplete] = useState(task.complete);
  const [editable, setEditable] = useState(false);

  const navigation = useNavigation<any>();

  const saveComplete = async () => {
    if (!complete) {
      
      await handleUpdate({ complete: true });
      Alert.alert("Task marked as completed");
    }else{
      Alert.alert("Already marked as completed");
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  const handleUpdate = async (overrides: Partial<Task> = {}) => {
    
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (!storedTasks) return;

      const tasks: Task[] = JSON.parse(storedTasks);

      const updatedTasks = tasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              title: taskTitle,
              date,
              sTime: startTime,
              eTime: endTime,
              priority,
              description,
              complete,
              ...overrides,
            }
          : t
      );

      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setEditable(false);

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
          
  };

  const handleDelete = async () => {
  
    const storedTasks = await AsyncStorage.getItem("tasks");
    if (!storedTasks) return;

    const tasks: Task[] = JSON.parse(storedTasks);
    const filteredTasks = tasks.filter((t) => t.id !== task.id);

    await AsyncStorage.setItem("tasks", JSON.stringify(filteredTasks));
    Alert.alert("Task deleted successfully");
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.formCard}>
        <Text style={styles.containerHeader}>Task Name</Text>
        <TextInput
          placeholder="Task Name"
          value={taskTitle}
          style={styles.formInputs}
          editable={editable}
          onChangeText={setTaskTitle}
        />

        <Text style={styles.containerHeader}>Date</Text>
        <MaskedTextInput
          editable={editable}
          mask="9999/99/99"
          value={date}
          onChangeText={setDate}
          keyboardType="numeric"
          placeholder="YYYY/MM/DD"
          style={styles.formInputs}
        />

        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>Start Time</Text>
          <Text style={styles.timeText}>End Time</Text>
        </View>

        <View style={styles.timeContainer}>
          <MaskedTextInput
            mask="99:99"
            editable={editable}
            value={startTime}
            onChangeText={setStartTime}
            keyboardType="numeric"
            placeholder="HH:MM"
            style={styles.timeInputs}
          />
          <MaskedTextInput
            mask="99:99"
            editable={editable}
            value={endTime}
            onChangeText={setEndTime}
            keyboardType="numeric"
            placeholder="HH:MM"
            style={styles.timeInputs}
          />
        </View>

        <Text style={styles.containerHeader}>Category</Text>
        <View style={styles.dropDown}>
          <Picker
            style={styles.formInputs}
            selectedValue={priority}
            onValueChange={setPriority}
            enabled={editable}
          >
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </View>

        <Text style={styles.containerHeader}>Description</Text>
        <TextInput
          placeholder="Description"
          editable={editable}
          style={styles.formInputs}
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.completeButton} onPress={saveComplete}>
            <Text style={{ color: "#ffffff" }}>Mark as Completed</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={{ color: "#ffffff" }}>Delete Task</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={async () => {
              if (editable) await handleUpdate();
              else setEditable(true);
            }}
          >
            <Text style={{ color: "#ffffff" }}>{editable ? "Save Task" : "Edit Task"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AddTask />
      <Navigation />
    </SafeAreaView>
  );
}

export default EditTask;

const styles = StyleSheet.create({
  formCard: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  formInputs: {
    borderColor: COLORS.border,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    padding: 8,
  },
  dropDown: {
    margin: 10,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    justifyContent: "center",
  },
  editButton: {
    height: 40,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderRadius: 10,
  },
  buttonContainer: {
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  containerHeader: {
    fontWeight: "bold",
    fontSize: FONTS.regular,
    marginHorizontal: 20,
    marginBottom: 0,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  timeInputs: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 8,
  },
  timeText: {
    flex: 1,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: FONTS.regular,
    marginHorizontal: 10,
    marginBottom: 0,
  },
  completeButton: {
    height: 40,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderRadius: 10,
  },
  deleteButton: {
    height: 40,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderRadius: 10,
  },
});
