import React, { useState } from "react";
import { SafeAreaView, Text, Alert, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaskedTextInput } from "react-native-mask-text"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { COLORS, FONTS } from "../constants/theme";
import Navigation from "../compos/Navigation";
import AddTask from "../compos/AddTask";

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

type TaskScreenProps = {
    onTaskAdded?: () => void; 
};

export default function TaskScreen({ onTaskAdded }: TaskScreenProps) {

    const navigation = useNavigation<any>()

    const [taskTitle, setTaskTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [priority, setPriority] = useState("Low");

    const saveTask = async () => {
        if (!taskTitle.trim() || !date.trim() || !startTime.trim() || !endTime.trim()) {
            Alert.alert("Please fill all the fields");
            return;
        }

        const existingTasks = await AsyncStorage.getItem("tasks");
        let tasks: Task[] = existingTasks ? JSON.parse(existingTasks) : [];

        const newTask: Task = {
            id: Date.now().toString(),
            title: taskTitle,
            date,
            priority,
            description,
            complete: false,
            sTime: startTime,
            eTime: endTime,
        };

        tasks.push(newTask);
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));

        Alert.alert("Task saved successfully!");

        
        setTaskTitle("");
        setDescription("");
        setDate("");
        setPriority("Low");
        setStartTime("");
        setEndTime("");

        
        if (onTaskAdded) onTaskAdded();
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
        });
    };

    return (
        <SafeAreaView style={styles.container}> 
            <Text style={styles.pageHead}>Create New Task</Text>
            <View style={styles.formCard}>
                <Text style={styles.containerHeader}>Task Name</Text>
                <TextInput
                    placeholder="Task Name"
                    value={taskTitle}
                    style={styles.formInputs}
                    onChangeText={setTaskTitle}
                />

                <Text style={styles.containerHeader}>Date</Text>
                <MaskedTextInput
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
                        value={startTime}
                        onChangeText={setStartTime}
                        keyboardType="numeric"
                        placeholder="HH:MM"
                        style={styles.timeInputs}
                    />
                    <MaskedTextInput
                        mask="99:99"
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
                        selectedValue={priority}
                        onValueChange={setPriority}
                        style={styles.formInputs}
                    >
                        <Picker.Item label="Low" value="Low" />
                        <Picker.Item label="Medium" value="Medium" />
                        <Picker.Item label="High" value="High" />
                    </Picker>
                </View>

                <Text style={styles.containerHeader}>Description</Text>
                <TextInput
                    placeholder="Description"
                    style={styles.formInputs}
                    value={description}
                    onChangeText={setDescription}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={saveTask}>
                        <Text style={{ color: "#fff" }}>Create Task</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <AddTask/>
            <Navigation />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    formCard: {
        marginTop: 40,
        marginHorizontal: 20,
    },
    formInputs: {
        borderColor: COLORS.border,
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    dropDown: {
        margin: 10,
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        justifyContent: 'center',
    },
    addButton: {
        height: 40,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 10,
    },
    buttonContainer: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    containerHeader: {
        fontWeight: 'bold',
        fontSize: FONTS.regular,
        marginHorizontal: 20,
        marginBottom: 0,
    },
    pageHead: {
        textAlign: 'center',
        paddingTop: 25,
        fontSize: 24,
        fontWeight: 'bold',
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    timeInputs: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    timeText: {
        flex: 1,
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: FONTS.regular,
        marginHorizontal: 10,
        marginBottom: 0,
    },
});
