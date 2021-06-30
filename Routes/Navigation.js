import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Todo from '../src/Todo'
import Api from '../src/Api'

const Tab = createBottomTabNavigator();

export default function Naviagtion() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Todo" component={Todo} />
                <Tab.Screen name="Api" component={Api} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}