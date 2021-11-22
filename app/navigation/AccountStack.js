import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";

const Stack = createStackNavigator();

export default function AccountStack(){

    return(
        <Stack.Navigator> 
            {/* Stack.Navigator: Si no se usa el atributo initialRouteName para indicar el componente inicial
             entonces va tomar el primer 'Stack.Screen' de la lista */}
            <Stack.Screen 
                name="account"
                component={Account}
                options={{title:"Mi Cuenta"}}
            />
            <Stack.Screen 
                name="login"
                component={Login}
                options={{title:"Iniciar sesión"}}
            />
            <Stack.Screen 
                name="register"
                component={Register}
                options={{title:"Registro"}}
            />
        </Stack.Navigator>
    )
}