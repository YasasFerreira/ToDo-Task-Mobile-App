import React from "react"
import {View,StyleSheet,TouchableOpacity} from "react-native"
import { COLORS } from "../constants/theme"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function(){
    const ROUTE = {
        TASK:"Task"
    }

    const navigation = useNavigation<any>()
   
    const handlePress = ()=>{
        navigation.navigate(ROUTE.TASK)
    }
    return(
        
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton}
                onPress={handlePress}
            >
                <FontAwesome
                    name="plus"
                    style={styles.icon}
                    size={24}
                    color={COLORS.card}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        position: 'absolute',
        bottom: 60,          
        left: '50%',        
        transform: [{ translateX: -30 }], 
        zIndex: 10,
        elevation:4,
    },
    addButton:{
        backgroundColor: COLORS.secondary,
        height: 60,    
        width: 60,
        borderRadius: 30,
        justifyContent: "center",  
        alignItems: "center",   
    },
    icon:{
    
    }
})