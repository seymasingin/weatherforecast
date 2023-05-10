import React from "react";
import 'react-native-gesture-handler';
import Home from "./src/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './src/components/DrawerContent';

const Drawer = createDrawerNavigator();

function App(){
  return(
    <NavigationContainer>
      <Drawer.Navigator  screenOptions={{headerShown: false,  
                                      }}
                        drawerContent={props => <DrawerContent {...props} />} 
                        >
        <Drawer.Screen name= "Home" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App;
