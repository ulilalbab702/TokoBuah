import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Screens
import Home from './screens/Home';
import Profile from './screens/Profile';
import MyCart from './screens/MyCart';
import ProductInfo from './screens/ProductInfo';
import Create from './screens/Create';
import Splash from './screens/Splash';
import User from './screens/User';

//Screen names
const homeName = "Home";
const detailsName = "MyCart";
const settingsName = "User";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Beranda" component={Tab1}  />
        <Stack.Screen name="MyCart" component={MyCart} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;

export function Tab1() {
  return (
    <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'cart' : 'cart-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'person' : 'person-outline';
            }
            else if (rn === createName) {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#6495ed',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 12 },
          style: { padding: 10, height: 70}
        }}>
        <Tab.Screen name={homeName} component={Home} options={{headerShown: false}} />
        <Tab.Screen name={detailsName} component={MyCart} options={{headerShown: false}} />
        <Tab.Screen name={settingsName} component={User} options={{headerShown: false}} />
      </Tab.Navigator>
  );
}