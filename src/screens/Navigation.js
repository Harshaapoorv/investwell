import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './Dashboard';
import FundDetails from './FundDetails';
import ArrowBack from '../components/ArrowBack';

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          component={Dashboard}
          name="Dashboard"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={FundDetails}
          name="FundDetails"
          options={{
            headerStyle: {
              height: '100%',
              backgroundColor: '#56DFDB',
            },
            headerBackTitle: null,
            headerBackImage: () => <ArrowBack width={24} height={24} />,
            headerTitle: 'Invest Well',
            headerTitleStyle: {
              fontFamily: 'InriaSans-Bold',
              fontWeight: 'bold',
              fontSize: 24,
              color: '#000000',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
