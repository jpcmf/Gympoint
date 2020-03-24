import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';

import Dashboard from '~/pages/Dashboard';
import ListHelpOrders from '~/pages/HelpOrders/ListHelpOrders';
import DetailHelpOrder from '~/pages/HelpOrders/DetailHelpOrder';
import NewHelpOrder from '~/pages/HelpOrders/NewHelpOrder';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,

            HelpOrders: {
              screen: createStackNavigator(
                {
                  ListHelpOrders,
                  DetailHelpOrder,
                  NewHelpOrder,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#ee4e62',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: false,
                tabBarLabel: 'Pedidos de ajuda',
                tabBarIcon: (
                  <Icon name="help" size={20} color="rgba(255,255,255,0.5)" />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255,255,255,0.5)',
              style: {
                backgroundColor: '#ee4e62',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
