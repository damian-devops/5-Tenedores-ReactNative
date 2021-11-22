import React,{ useState } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import firebase from 'firebase';
import reauthenticate  from '../../utils/api'; "../../utils/api";

import { validateEmail } from "../../utils/validations";

export default function ChangeEmailForm(props) {

    const { email, setShowModal, setReloadUserInfo, toastRef } = props;
    const [formData, setformData] = useState({email: email, password:""});
    const [error, setError] = useState({email:"", password:""});
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword,setShowPassword] = useState(false);

    const onChange = (e,type)=>{
        setformData({...formData,[type]:e.nativeEvent.text});
      }

    const onSubmit = () => {

        setError({email:"", password:""});

        console.log(`formData`, formData);

        if(!formData.email){
            setError({
                email:"El campo email no puede estar vacia."
            });
        }else if(!validateEmail(formData.email)){
            setError({
                email:"El email no es correcto."
            });
        }else if(email === formData.email){
            setError({
                email:"El correo no puede ser igual al actual."
            });
        }else if(!formData.password){
            setError({
                password:"El campo password no puede estar vacia."
            });
        }
        else{
            setIsLoading(true);

            reauthenticate(formData.password)
            .then((response)=>{
                firebase.auth()
                    .currentUser.updateEmail(formData.email)
                    .then(()=>{
                        setIsLoading(false);
                        setReloadUserInfo(true);
                        toastRef.current.show("Email actualizado correctamente");
                        setShowModal(false);
                    })
                    .catch(()=>{
                        toastRef.current.show("Error al actualizar el Email");
                        setIsLoading(false);
                    })
                
            })
            .catch((error)=>{
                setIsLoading(false);
                setError({
                    password:"El password es incorrecto."
                });
            });
        }
    
    }
    
    return(
        <View style={styles.view}>
            <Input 
            placeholder="Correo Electronico"
            containerStyle={styles.input}
            rightIcon={{
                type:"material-community",
                name:"at",
                color:"#c2c2c2"
            }}
            defaultValue={email || ""}
            onChange={e=>onChange(e,"email")}
            errorMessage={error.email}
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
            errorMessage={error.password}
            /> 

            <Button 
            title="Cambiar Correo"
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
    },
    iconRigth:{
        color:"#c1c1c1"
    }
});