import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import TodoList from '../screens/todoList'
import TodoAdd from '../screens/todoAdd'

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='TodoList'
                screenOptions={{
                    gestureEnabled: true,
                    headerShown: true,
                }}
            >
                <Stack.Screen
                    name='TodoList'
                    component={TodoList}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='TodoAdd'
                    component={TodoAdd}
                    options={{ title: 'Add Task' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
