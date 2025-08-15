import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { COLORS, FONTS } from "../constants/theme";
import Filter from "../compos/Filter";
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



export default function HomeScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const navigation = useNavigation<any>()

    
    const loadTasks = useCallback(async () => {
        const stored = await AsyncStorage.getItem("tasks");
        if (stored) {
            const parsed: Task[] = JSON.parse(stored);
            setTasks(parsed);
            setFilteredTasks(parsed); 
        }
    }, []);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

   
    
    const handleFilter = (filtered: Task[]) => {
        setFilteredTasks(filtered);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Filter onFilter={handleFilter} />
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskCard}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>{item.date} | {item.sTime} - {item.eTime}</Text>
                        <Text>Priority: {item.priority}</Text>
                        <Text>{item.complete ? "Completed" : "Pending"}</Text>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate("EditTask", { task: item })}
                        >
                            <FontAwesome 
                                name="angle-right"
                                size={40}
                                style={styles.arrowIcon}
                                
                            />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>No tasks found</Text>
                )}
            />
            <AddTask/>
            <Navigation  /> 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: COLORS.background 
    },
    taskCard: {
        backgroundColor: COLORS.card,
        margin: 10,
        padding: 15,
        borderRadius: 10,
        
    },
    title: { 
        fontWeight: "bold", 
        fontSize: FONTS.largeTitle, 
    },
    emptyText: { 
        textAlign: "center", 
        marginTop: 50, 
        color: "gray", 
    },
    arrowIcon:{
        position:'absolute',
        right:20,
        bottom:25,
    }
});
