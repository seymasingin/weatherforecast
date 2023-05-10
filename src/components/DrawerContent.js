import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import {View,TextInput, TouchableOpacity, Text, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function DrawerContent(props ){

    const navigation = useNavigation();
        return(
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    )
}

export default DrawerContent;

const styles= {
    search:{borderWidth: 1, borderColor:'black'}
}
