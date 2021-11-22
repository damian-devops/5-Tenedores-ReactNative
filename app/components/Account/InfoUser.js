// import React from 'react';
import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default function InfoUser(props) {

      var { userInfo: { uid, photoURL, displayName, email },
            toastRef,
            setLoading,
            setLoadingText 
          } = props;

    console.log(`userInfo`, props.userInfo);

    let changeAvatar = async () =>{
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);   
        const resultPermissionOnCamera = resultPermission.permissions.cameraRoll.status;
        
        if(resultPermissionOnCamera === "denied"){
            toastRef.current.show("Es necesario aceptar los permisos de la galeria");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing:true,
                    aspect:[4,3],
            });

            if(result.cancelled){
                toastRef.current.show("Has cerrado la seleccion de imagenes");
            }else{
                uploadImage(result.uri).then(()=>{
                     updatePhotoUrl();
                }).catch((err)=>{
                    console.log(`err`, err)
                    toastRef.current.show("error");
                });
            }
            
        }

    };

    const uploadImage = async (uri) => {
        setLoadingText("Actualizando Avatar");
        setLoading(true);

        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`Avatar/${uid}`);
        return ref.put(blob);
    }

    const updatePhotoUrl = () =>{
        const result =  firebase.storage().ref(`Avatar/${uid}`).getDownloadURL().then(async(response)=>{
            const update = {
                photoURL: response
            };
        await firebase.auth().currentUser.updateProfile(update); 
        photoURL = response;
        setLoading(false);
        }).catch((err)=>{
            setLoading(false);
            toastRef.current.show("Error al actualizar el avatar");
        });
    }

    return(
        <View style={sytles.viewUserInfo}>
            <Avatar 
            rounded
            size="large"
            showEditButton
            onEditPress={changeAvatar}
            containerStyle={StyleSheet.userInfoAvatar}
            source={ 
                photoURL ? {uri:photoURL} : require('../../../assets/img/avatar-default.jpg')
            }
            />
            <View>
                <Text style={sytles.displayName}>
                    { displayName ? displayName : "Anonimo" }
                </Text>
                <Text style={sytles.displayEmail}>
                    { email ? email : "Social Login"}
                </Text>
            </View>
        </View>
    )
}

const sytles = StyleSheet.create({
    viewUserInfo:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#f2f2f2",
        paddingTop:30,
        paddingBottom:30,
    },
    userInfoAvatar:{
        marginRight:20
    },
    displayName:{
        fontWeight:"bold",
        paddingBottom:5,
        marginLeft:15
    },
    displayEmail:{
        paddingBottom:5,
        marginLeft:15
    }
});

