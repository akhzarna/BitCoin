import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MuhammadAli from './MuhammadAli';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Bitcoin Price" component={MuhammadAli} />
        {/* Add more screens as needed */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
