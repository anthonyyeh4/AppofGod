import React from 'react';
import { Text, View,Button,StyleSheet,Image,ImageBackground,TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
// import Icon from 'react-native-ionicons';
import ImageNavigator from './src/ImageNavigator'
import SearchView from './src/SearchView';
import UploadView from './src/UploadView';
import MainNavi from './src/MainNavi'
import {
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




export default class App extends React.Component {
    state = {
        enter:false
    }
    render(){
        if(this.state.enter){
            return(
                <Container>
                    <MainNavi/>
                </Container>
            )
        } else {
            return(
                <View style={{width: '100%',height: '100%',justifyContent: 'center',alignItems: 'center',position:'relative'}}>
                    <ImageBackground style={styles.backgroundImage} source={{uri:'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/48429710_1331862060289228_6721672961255800832_n.jpg?_nc_cat=108&_nc_ht=scontent-tpe1-1.xx&oh=5e337d4beda0bd8dc613de1a3bb7ea9c&oe=5CA9778F'}} >
                        <TouchableOpacity style={styles.start} onPress={()=> this.setState({enter:true})}><Text style={{fontSize:20}}>Start</Text></TouchableOpacity>
                    </ImageBackground>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },
    start: {
        width:100,
        height:30,
        backgroundColor:'white',
        borderRadius:5,
        alignItems: 'center',
        borderColor:'#a3d8dd',
        borderWidth:2,
        top:200

    }
});
// export default createAppContainer(MainNavigator);
