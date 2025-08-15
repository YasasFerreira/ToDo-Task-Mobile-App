import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { COLORS } from "../constants/theme";

type NavigationBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type NavigationBarRouteProp = RouteProp<RootStackParamList, keyof RootStackParamList>;

export default function Navigation() {
  const navigation = useNavigation<NavigationBarNavigationProp>();
  const route = useRoute<NavigationBarRouteProp>();

  const ROUTES = {
    HOME: "Home" as const,
    TASK: "Task" as const,
  };

  const handlePress = (routeName: "Home" | "Task") => {
    navigation.navigate({ name: routeName, params: undefined });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tabs} onPress={() => handlePress(ROUTES.HOME)}>
        <FontAwesome
          name="home"
          size={30}
          color={route.name === ROUTES.HOME ? COLORS.secondary : COLORS.border}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabs} onPress={() => handlePress(ROUTES.TASK)}>
        <FontAwesome
          name="tasks"
          size={30}
          color={route.name === ROUTES.TASK ? COLORS.secondary : COLORS.border}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 4,
  },
  tabs: {
    flex: 1,
    alignItems: "center",
  },
});
