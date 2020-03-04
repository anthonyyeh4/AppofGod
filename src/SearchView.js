import React from "react"
import {Platform,BackHandler, Alert, Image, View, ScrollView, Keyboard, StyleSheet, Dimensions,SectionList,ListItem,H1,TouchableOpacity,Animated,PanResponder,FlatList,Picker } from "react-native"
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

export default class SearchView extends React.Component {
    state = {
        searchKey:'',
        search_list:[],
        category:'title'
    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    reload = () => {
        var queryURL = 'http://nudb1.ddns.net:3000/getList';
        var app = this;
        var data = [];
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
                    data.push(temp);
                }
            })
            .then(()=> {
                app.setState({latest_list:data})
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
    }
    search_click = () => {
        console.log("search_click")
        var app = this;
        var queryURL = 'http://nudb1.ddns.net:3000/searchData';
        let data = [];
        fetch(queryURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    keyword:app.state.searchKey,
                    category:app.state.category
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData) {
                    console.log(responseData.data)
                    for(let i in responseData.data){
                        var temp = {};
                        temp.image_links = i;
                        temp.face_list = responseData.data[i];
                        console.log(i)
                        data.push(
                            <TouchableOpacity style={styles.topicItem} onPress={() => { this.props.navigation.navigate('Detail',{ data:temp,reload:this.reload }) }}  >
                                <Image source={{uri:i}} style={styles.topicImg} />
                            </TouchableOpacity>
                        );
                    }
                }
            })
            .then(()=> {
                if(data.length == 0){
                    data.push(
                        <Text>無此照片</Text>
                    )
                }
                app.setState({searchResult:data})
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
            <Container>
                <Header searchBar rounded>
                  <Item>
                    <Icon name="ios-search" />
                    <Input
                      ref={ref => this.refSearchKey = ref}
                      placeholder="Search"
                      onChangeText={val => this.setState({searchKey:val})}
                      value={this.state.searchKey} />
                  </Item>
                  <Picker
                      selectedValue={this.state.category}
                      style={{ height: 50, width: 100 }}
                      onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
                      <Picker.Item label="姓名" value="title" />
                      <Picker.Item label="地點" value="place" />
                      <Picker.Item label="物品" value="item" />
                  </Picker>
                  <Button transparent small style={{width:'auto'}}
                    onPress={() => this.search_click()}>
                    <Text>搜尋</Text>
                  </Button>
                </Header>
                <ScrollView>
                    <Content>
                        <View>
                            <Text style={styles.sectionHeader} >搜尋關鍵字：{this.state.searchKey}</Text>
                        </View>
                        {this.state.searchResult}
                    </Content>
                </ScrollView>
            </Container>
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
        width: 300,
        height: 300,
        borderWidth:0.5,
        borderColor:'#cdcdcd',
    },
})
