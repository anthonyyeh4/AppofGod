import { createStackNavigator } from 'react-navigation';
import {
  Button,
  Text,
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
import ListView from './ListView';
import DetailView from './DetailView';

const ImageNavigator = createStackNavigator(
  {
    List: {
      screen: ListView,
    },
    Detail: {
      screen: DetailView,
    },
  },
  {
    initialRouteName: 'List'
  }
);

export default ImageNavigator;
