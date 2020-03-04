import React from "react"
import {Platform,BackHandler, Alert, Image, View, ScrollView, Keyboard, StyleSheet, Dimensions,SectionList,ListItem,H1,TouchableOpacity,Animated,PanResponder,FlatList } from "react-native"
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

export default class ListView extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerStyle: { color:'gray' },
        title: '老舊照片辨識:所有照片',
    });
    state = {
        latest_list:[],
        date_list:['12/16','12/15','12/14','12/13']
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.reload()
    }
    reload = () => {
        var queryURL = 'http://nudb1.ddns.net:3000/getList';
        var app = this;
        var data = [];
        var date_list = {'12/16':[],'12/15':[],'12/14':[],'12/13':[]}
        fetch(queryURL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((responseData)=>{
                console.log(responseData)
                for(let i in responseData){
                    var temp = {};
                    temp.image_links = i;
                    temp.face_list = responseData[i];
                    if(responseData[i][0].time == '12/16'){
                        date_list['12/16'].push(temp);
                    } else if(responseData[i][0].time == '12/15'){
                        date_list['12/15'].push(temp);
                    } else if(responseData[i][0].time == '12/14'){
                        date_list['12/14'].push(temp);
                    } else if(responseData[i][0].time == '12/13'){
                        date_list['12/13'].push(temp);
                    } else {

                    }
                    data.push(temp);
                }
            })
            .then(()=> {
                app.setState({
                    latest_list:data,
                    date_list:date_list
                })
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
    }
    renderLatestItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.topicItem} onPress={() => { this.props.navigation.navigate('Detail',{ data:item,reload:this.reload }) }}  >
                <Image source={{uri:item.image_links}} style={styles.topicImg} />
            </TouchableOpacity>
        )
    }
    render() {
        return(
            <ScrollView>
                <Container>
                    <Content>
                        <View style={{ flex: 1, height: 25 }}>
                            <Text style={styles.sectionHeader} >最近上傳</Text>
                        </View>
                        <FlatList
                            data={this.state.latest_list}
                            extradata={this.state}
                            renderItem={this.renderLatestItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                       <View style={{ flex: 1, height: 25 }}>
                            <Text style={styles.sectionHeader} >12月16日 ｜ 2018</Text>
                        </View>
                        <FlatList
                            data={this.state.date_list['12/16']}
                            extradata={this.state}
                            renderItem={this.renderLatestItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                        <View style={{ flex: 1, height: 25 }}>
                            <Text style={styles.sectionHeader} >12月15日 ｜ 2018</Text>
                        </View>
                        <FlatList
                            data={this.state.date_list['12/15']}
                            extradata={this.state}
                            renderItem={this.renderLatestItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                        <View style={{ flex: 1, height: 25 }}>
                            <Text style={styles.sectionHeader} >12月14日 ｜ 2018</Text>
                        </View>
                        <FlatList
                            data={this.state.date_list['12/14']}
                            extradata={this.state}
                            renderItem={this.renderLatestItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                        <View style={{ flex: 1, height: 25 }}>
                            <Text style={styles.sectionHeader} >12月13日 ｜ 2018</Text>
                        </View>
                        <FlatList
                            data={this.state.date_list['12/13']}
                            extradata={this.state}
                            renderItem={this.renderLatestItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        />
                    </Content>
                </Container>
            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    sectionHeader: {
          marginLeft: 10,
          paddingBottom: 10,
          padding: 6.5,
          fontSize: 12,
          color: '#787878',
    },
    topicItem: {
        // width: width*0.7,
        marginTop:10,
        marginLeft:15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topicImg: {
        width: 100,
        height: 100,
        borderWidth:0.5,
        borderColor:'#cdcdcd',
    },
})
