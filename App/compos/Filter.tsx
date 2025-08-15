import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/theme";

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

type FilterProps = {
    onFilter: (tasks: Task[]) => void;
};

export default function Filter({ onFilter }: FilterProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTab, setActiveTab] = useState("All");

    const loadTasks = async () => {
        const stored = await AsyncStorage.getItem("tasks");
        if (stored) setTasks(JSON.parse(stored));
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const filterTasks = (tab: string) => {
        setActiveTab(tab);

        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        const formattedDate = `${year}/${month}/${day}`;

        let filtered: Task[] = [];
        if (tab === "All") filtered = tasks;
        else if (tab === "Today") filtered = tasks.filter(t => t.date === formattedDate);
        else if (tab === "Completed") filtered = tasks.filter(t => t.complete);

        onFilter(filtered);
    };

    return (
        <View style={styles.container}>
            {["All", "Today", "Completed"].map(tab => (
                <TouchableOpacity
                    key={tab}
                    style={[
                        styles.tab,
                        { backgroundColor: activeTab === tab ? COLORS.secondary : "#fff" },
                    ]}
                    onPress={() => filterTasks(tab)}
                >
                    <Text style={{ color: activeTab === tab ? "#fff" : "#000", fontWeight: "bold" }}>
                        {tab} Tasks
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-around",
        marginHorizontal: 5,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
});
