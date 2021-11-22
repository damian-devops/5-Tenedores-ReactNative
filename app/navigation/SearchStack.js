import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Search from "../screens/Search";

const Stack = createStackNavigator();

export default function SearchStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="top-restaurants"
                component={Search}
                options={{title:"El Buscador"}}
            />
        </Stack.Navigator>
    )
}