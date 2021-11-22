import React,{ useState } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import firebase from 'firebase';

export default function ChangeDisplayNameForm(props) {

    const { displayName, setShowModal, setReloadUserInfo, toastRef } = props;
    const [newDisplayName, setnNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = () => {

        setError(null)

        if(!newDisplayName){
            setError("El campo no puede estar vacio.");
        }else if(displayName === newDisplayName){
            setError("El nombre no puede ser igual al actual.");
        }else{

            setIsLoading(true);
            const update = {
                displayName: newDisplayName
            }

            firebase
               .auth().currentUser.updateProfile(update)
               .then(()=>{
                   console.log("OK",displayName,newDisplayName);
                   setIsLoading(false);
                   setShowModal(false);
                   setReloadUserInfo(true)
               })
               .catch(()=>{
                    setError("Error al actualizar el nombre");
                    setIsLoading(false);
               });
        }
    
    }
    
    return(
        <View style={styles.view}>
            <Input 
            placeholder="Nombre y Apellido"
            containerStyle={styles.input}
            rightIcon={{
                type:"material-community",
                name:"account-circle-outline",
                color:"#c2c2c2"
            }}
            defaultValue={displayName || ""}
            onChange={e=>setnNewDisplayName(e.nativeEvent.text)}
            errorMessage={error}
            />

            <Button 
            title="Cambiar nombre"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={onSubmit}
            loading={isLoading}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    view:{
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10
    },
    input:{
        marginBottom:10,
    },
    btnContainer:{
        marginTop:20,
        width:"95%"
    },
    btn:{
        backgroundColor:"#00a680"
    }
});