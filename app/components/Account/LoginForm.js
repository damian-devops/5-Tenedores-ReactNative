import React, { useState } from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import {Input, Icon, Button} from 'react-native-elements'
import firebase from 'firebase'
import { isEmpty } from "lodash";
import { useNavigation } from '@react-navigation/native';

import Loading from '../../components/Loading';
import { validateEmail } from "../../utils/validations";

export default function LoginForm(props){

    const { toastRef } = props;
    const [showPassword,setShowPassword] = useState(false);
    const [formData, setformData] = useState(defaulFormValue);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = () =>{

        if(isEmpty(formData.email) || 
           isEmpty(formData.password)){
    
            toastRef.current.show("Todos los campos obligatorios");
    
          }else if(!validateEmail(formData.email)){
    
            toastRef.current.show("Email no es correcto");

          }else{
            
            setLoading(true);

            firebase.auth().signInWithEmailAndPassword(formData.email,formData.password)
            .then(response=>{

              setLoading(false);
              navigation.navigate("account")

            }).catch(err=>{

              setLoading(false);
              toastRef.current.show("El email no existe o la contraseña es incorrecta");

            });
    
          }
        }
       
      const onChange = (e,type)=>{
        setformData({...formData,[type]:e.nativeEvent.text});
      }

    return(
        <View style={styles.formContainer}>
            <Input 
              placeholder="Correo electronico"
              containerStyle={styles.inputForm}
              onChange = {e=>onChange(e,"email")}
              rightIcon={
                  <Icon 
                    type="material-community"
                    name="at"
                    iconStyle={styles.iconRigth}
                  />
              }
            />
            <Input 
              placeholder="Contraseña"
              containerStyle={styles.inputForm}
              onChange = {e=>onChange(e,"password")}
              password={true}
              secureTextEntry={!showPassword}
              rightIcon={
                <Icon 
                  type="material-community"
                  name= {showPassword ? "eye-off-outline" : "eye-outline"}
                  iconStyle={styles.iconRigth}
                  onPress={()=>setShowPassword(!showPassword)}
                />
            }
            /> 
            <Button 
              title="Inciar Seccion"
              containerStyle={styles.btnContainerRegister}
              buttonStyle={styles.btnLogin}
              onPress={onSubmit}
            /> 
            <Loading isVisible={loading} text="Cargando Cuenta" />
        </View>
    )

}


function defaulFormValue() {
    return{
      email:"",
      password:""
    }
  }


const styles = StyleSheet.create({
    formContainer:{
         flex:1,
         alignItems:"center",
         justifyContent:"center",
         marginTop:30
    },
    inputForm:{
        width:"100%",
        marginTop:20,
        
    },
    btnContainerRegister:{
        marginTop:20,
        width:"95%"
    },
    btnLogin:{
        backgroundColor:"#00a860"
    },
    iconRigth:{
        color:"#c1c1c1"
    }
});