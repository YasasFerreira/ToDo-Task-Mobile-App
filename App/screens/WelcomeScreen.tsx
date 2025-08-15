import React,{useEffect} from "react"
import {View,Text,Image, SafeAreaView, StyleSheet, ActivityIndicator} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { COLORS } from "../constants/theme"
export default function WelcomeScreen(){

    const navigation = useNavigation<any>()

    useEffect(() => {
    const timer = setTimeout(() => {
      
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }, 5000); 

    return () => clearTimeout(timer); 
  }, []);

    return(

        <SafeAreaView style={styles.container}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Welcome!</Text>
            <View style = {{margin:20,}}> 
                <Image source={require("../assets/splash-icon.jpeg")}
                
                resizeMode="contain">

                </Image>
            
                <ActivityIndicator size="large" color={COLORS.secondary} />
            </View>

        </SafeAreaView>
    )    


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff',
    },
 


})