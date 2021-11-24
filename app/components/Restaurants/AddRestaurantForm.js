import React, { useState, useRef } from "react";
import { StyleSheet ,View,Text } from "react-native";
import {Icon, Avatar, Image, Input, Button} from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

export default function AddRestaurantForm() {
    return(
        <ScrollView>
            <FormAdd />
        </ScrollView>
    );
}

function FormAdd(props) {

    return(
    <View style={styles.viewForm}>
        <Input 
            placeholder="Nombre del Restaurante"
            containerStyle={styles.input}
        />
        <Input 
            placeholder="Direccion"
            containerStyle={styles.input}
        />
        <Input 
            placeholder="Descripcion del Restaurante"
            multiline={true}
            inputContainerStyle={styles.textArea}
        />
    </View>
    );
}

const styles= StyleSheet.create({
    scrollView:{
        height:"100%"
    },
    viewForm:{
        marginLeft:10,
        marginRight:10
    },
    input:{
        marginBottom:10
    },
    textArea:{
        height:100,
        width:"100%",
        padding:0,
        margin:0
    }
});