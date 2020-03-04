import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import ImageNavigator from './ImageNavigator'
import SearchView from './SearchView';
import UploadView from './UploadView';
import {
  Button,
  H3,
  Container,
  Card,
  CardItem,
  Item,
  Input,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Thumbnail,
  Spinner,
} from "native-base";


const MainNavi = createBottomTabNavigator({
  ImageCollection: ImageNavigator,
  Search: SearchView,
  Upload: UploadView,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      switch (routeName) {
        case "ImageCollection":
          return <Icon name="image" size={28} color={focused ? '#0080FF' : '#CDE1f9'} />;
        case 'Search':
          return <Icon name="search" size={28} color={focused ? '#0080FF' : '#CDE1f9'} />;
        case 'Upload':
          return <Icon name="camera" size={28} color={focused ? '#0080FF' : '#CDE1f9'} />;
        default:
          return null;
      }
    },
  }),
  initialRouteName: 'ImageCollection',
});

export default createAppContainer(MainNavi)
