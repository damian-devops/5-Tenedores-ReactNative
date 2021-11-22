import React,{ useState } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { size, isEmpty } from "lodash";
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

import reauthenticate  from '../../utils/api'; "../../utils/api";
import { validateEmail } from "../../utils/validations";

export default function ChangePasswordForm(props) {

    const navigation = useNavigation();

    const {setShowModal, toastRef } = props;
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setformData] = useState({
        currentPassword:"", newPassword:"", repeatNewPassword:""
    });

    const [error, setError] = useState({
        currentPassword:"", newPassword:"", repeatNewPassword:""
    });

    const [showPasswords,setShowPasswords] = useState({
        currentPassword:false, newPassword:false, repeatNewPassword:false
    });

    const onChange = (e,type)=>{
        setformData({...formData,[type]:e.nativeEvent.text});
    }

    const onSubmit = async () => {

        setError({currentPassword:"", newPassword:"", repeatNewPassword:""});

        if(!formData.currentPassword){
            setError({
                currentPassword:"El campo no puede estar vacio"
            });
        }else if(size(formData.currentPassword) < 6){
            setError({
                currentPassword:"La contraseña no puede tener menos de 6 caracteres"
            });
        }
        
        else if(!formData.newPassword){
            setError({
                newPassword:"El campo no puede estar vacio"
            });
        }else if(size(formData.newPassword) < 6){
            setError({
                newPassword:"La contraseña no puede tener menos de 6 caracteres"
            });
        }
        
        else if(!formData.repeatNewPassword){
            setError({
                repeatNewPassword:"El campo no puede estar vacio"
            });
        }

        else if(formData.newPassword !== formData.repeatNewPassword){
            setError({
                repeatNewPassword:"La contraseñas deben ser iguales"
            });
        }

        else{
            setIsLoading(true);

           await reauthenticate(formData.currentPassword)
            .then(async()=>{
               await firebase.auth()
                    .currentUser.updatePassword(formData.newPassword)
                    .then(()=>{
                        setIsLoading(false);
                        toastRef.current.show("La contraseña se actualizo correctamente");
                        setShowModal(false);
                        firebase.auth().signOut();
                    })
                    .catch(()=>{
                        toastRef.current.show("Error al actualizar el password");
                        setIsLoading(false);
                        setShowModal(false);
                    })
                
            })
            .catch((error)=>{
                setIsLoading(false);
                setError({
                    currentPassword:"La contraseña actual es incorrecta."
                });
            });
        }
    
    }
    
    return(
        <View style={styles.view}>

            <Input 
              placeholder="Contraseña Actual"
              containerStyle={styles.inputForm}
              onChange = {e=>onChange(e,"currentPassword")}
              password={true}
              secureTextEntry={!showPasswords.currentPassword}
              rightIcon={
                <Icon 
                  type="material-community"
                  name= {showPasswords.currentPassword ? "eye-off-outline" : "eye-outline"}
                  iconStyle={styles.iconRigth}
                  onPress={()=>setShowPasswords({
                      currentPassword: !showPasswords.currentPassword
                  })}
                />
            }
            errorMessage={error.currentPassword}
            />

            <Input 
              placeholder="Nueva Contraseña"
              containerStyle={styles.inputForm}
              onChange = {e=>onChange(e,"newPassword")}
              password={true}
              secureTextEntry={!showPasswords.newPassword}
              rightIcon={
                <Icon 
                  type="material-community"
                  name= {showPasswords.newPassword ? "eye-off-outline" : "eye-outline"}
                  iconStyle={styles.iconRigth}
                  onPress={()=>setShowPasswords({
                    newPassword: !showPasswords.newPassword
                })}
                />
            }
            errorMessage={error.newPassword}
            />

             <Input 
              placeholder="Repite Nueva Contraseña"
              containerStyle={styles.inputForm}
              onChange = {e=>onChange(e,"repeatNewPassword")}
              secureTextEntry={!showPasswords.repeatNewPassword}
              rightIcon={
                <Icon 
                  type="material-community"
                  name= {showPasswords.repeatNewPassword ? "eye-off-outline" : "eye-outline"}
                  iconStyle={styles.iconRigth}
                  onPress={()=>setShowPasswords({
                    repeatNewPassword: !showPasswords.repeatNewPassword
                })}
                />
            }
            errorMessage={error.repeatNewPassword}
            />

            <Button 
            title="Cambiar Contraseña"
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
    inputForm:{
        marginTop:10,
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