import React from "react"
import {Button,Platform,BackHandler, Alert, Image, View, ScrollView, Keyboard, StyleSheet, Dimensions,SectionList,ListItem,H1,TouchableOpacity,Animated,PanResponder,FlatList,TextInput } from "react-native"
import {
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
const name_list = {
    '1b413811-4200-4b6a-acea-2686cdfc5ebb':'孫桂芝',
    '6564cc5b-2c8c-412f-bdc5-00e47d797983':'尉天驄',
    '7570348b-6e09-4312-a8b7-5a1a25c8c167':'崔仁勳',
    '12539c71-7ee3-43f9-9476-754a925410f4':'J. Thyagarajan AshokaMitran',
    'a6006a12-5965-45c7-ac50-3f3ec1a65ee9':'安娜·布蘭迪亞娜',
    '907967b3-39e7-40bf-88e8-248f526110f2':'聶華苓',
    '75b79917-b47d-403c-8c98-25fc28f23f38':'西雅',

}
export default class DetailView extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerStyle: { color:'gray' },
        title: '圖片資訊',
    });
    state = {
        title:{},
        place:'',
        time:'',
        description:'',
        item:'',
        keyword_list:{},
        keyword:[],
        update:true,
        real_width:300,
        real_height:300
    }
    componentWillMount() {

    }
    componentDidMount() {
        var app = this;
        console.log(this.props.navigation.state.params.data)
        this.initialData()
        .then(() => {
            app.initialKeyword()
        })
        .then(() => {
            app.renderkeyword(app.props.navigation.state.params.data.face_list[0].faceId)
        })
        try {
            Image.getSize(this.props.navigation.state.params.data.image_links,(width,height) => {
                console.log(width,height)
                app.setState({
                    real_width:width,
                    real_height:height
                })
            })
        } catch (e) {
            console.log(e)
        }
    }
    initialData = async () => {
        var temp = {}
        for(let i in this.props.navigation.state.params.data.face_list){
            temp[this.props.navigation.state.params.data.face_list[i].faceId] = this.props.navigation.state.params.data.face_list[i].title
            if(i == this.props.navigation.state.params.data.face_list.length - 1){
                this.setState({
                    image_links:this.props.navigation.state.params.data.image_links,
                    title:temp,
                    place:this.props.navigation.state.params.data.face_list[0].place,
                    time:this.props.navigation.state.params.data.face_list[0].time,
                    item:this.props.navigation.state.params.data.face_list[0].item,
                    description:this.props.navigation.state.params.data.face_list[0].description,
                    select_id:this.props.navigation.state.params.data.face_list[0].faceId
                })
            }
        }
    }
    initialKeyword = () => {
        let data = {}
        for(let i in this.props.navigation.state.params.data.face_list){
            data[this.props.navigation.state.params.data.face_list[i].faceId] = []
            for(let j in this.props.navigation.state.params.data.face_list[i].candidates){
                data[this.props.navigation.state.params.data.face_list[i].faceId].push(name_list[this.props.navigation.state.params.data.face_list[i].candidates[j].personId])
                if( i == this.props.navigation.state.params.data.face_list.length - 1 && j == this.props.navigation.state.params.data.face_list[i].candidates.length - 1){
                    this.setState({ keyword_list:data })
                }
            }
        }
    }
    renderedge = () => {
        var edge_list = [];
        for(let i in this.props.navigation.state.params.data.face_list){
            edge_list.push(
                <TouchableOpacity onPress={()=> {this.renderkeyword(this.props.navigation.state.params.data.face_list[i].faceId);}} style={{position:'absolute',borderColor:this.state.select_id == this.props.navigation.state.params.data.face_list[i].faceId ? 'blue' : 'black',borderWidth:1,width:300*(this.props.navigation.state.params.data.face_list[i].faceRectangle.width/this.state.real_width),height:300*(this.props.navigation.state.params.data.face_list[i].faceRectangle.height/this.state.real_height),top:(this.props.navigation.state.params.data.face_list[i].faceRectangle.top/this.state.real_height)*400,left:(this.props.navigation.state.params.data.face_list[i].faceRectangle.left/this.state.real_width)*400 - 20}}>
                </TouchableOpacity>
            )
            if( i == this.props.navigation.state.params.data.face_list.length -1 ){
                return edge_list;
            }
        }
    }
    update_info = () => {
        console.log(this.state)
        var app = this;
        var queryURL = 'http://nudb1.ddns.net:3000/updateList'
        fetch(queryURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData) {
                    console.log(responseData)
                    app.props.navigation.state.params.reload();
                    app.setState({update:true})
                }
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
    }
    textChange = (title) => {
        var title_obj = this.state.title;
        title_obj[this.state.select_id] = title;
        this.setState({title:title_obj,update:false});
    }
    renderkeyword = (faceId) => {
        console.log(faceId)
        this.setState({
            select_id:faceId
        })
        var data = [];
        var keyword_list = this.state.keyword_list;
        console.log(keyword_list)
        for(let i in keyword_list[faceId]){
            console.log(keyword_list[faceId][i])
            data.push(<TouchableOpacity style={{marginLeft:10,backgroundColor:'#0689cb',padding:5}} onPress={()=>{ this.clickkeyword(keyword_list[faceId][i]) }}  ><Text style={{fontSize:13,color:'white'}}>{keyword_list[faceId][i]}</Text></TouchableOpacity>)
            if(i == keyword_list[faceId].length - 1){
                this.setState({keyword:data})
            }
        }
    }
    clickkeyword = (keyword) => {
        var title = this.state.title;
        title[this.state.select_id] = keyword;
        this.setState({
            title:title,
            update:false
        })
    }
    render() {
        return(
            <ScrollView>
                <Container style={{alignItems: 'center'}}>
                <Item style={{ marginTop:10 }}>
                    <Button onPress={()=> { this.update_info() }} title="更新" disabled={this.state.update}  ></Button>
                    <Button onPress={()=> {this.props.navigation.navigate('List')} } title="取消" style={{ marginLeft:20 }} ></Button>
                </Item>
                <Image source={{uri:this.props.navigation.state.params.data.image_links}} style={{width:250,height:250,marginTop:20}} onError={(error) => {console.log('loadinf',error)}} />
                { this.renderedge() }
                <Item>
                    <Text>姓名｜</Text>
                    <TextInput
                        onChangeText={(title) => { this.textChange(title) }}
                        value={this.state.title[this.state.select_id]}
                        placeholder="Name"
                        style={{width:200,height:40,marginRight:10,marginTop:5}}
                      />
                </Item>
                <Item style={{width:250,height:20,marginRight:10,marginTop:10,borderBottomWidth: 0}}>
                <Text style={{fontSize:10}} >                 推薦:</Text>
                    { this.state.keyword }
                </Item>
                <Item>
                    <Text>時間｜</Text>
                    <TextInput
                          onChangeText={(time) => this.setState({time:time,update:false})}
                          value={this.state.time}
                          placeholder="Time"
                          style={{width:200,height:40,marginRight:10,marginTop:5}}
                    />
                </Item>
                <Item>
                <Text>地點｜</Text>
                  <TextInput
                      onChangeText={(place) => this.setState({place:place,update:false})}
                      value={this.state.place}
                      placeholder="Place"
                      style={{width:200,height:40,marginRight:10,marginTop:5}}
                    />
                </Item>
                <Item>
                <Text>物品｜</Text>
                    <TextInput
                        onChangeText={(item) => this.setState({item:item,update:false})}
                        value={this.state.item}
                        placeholder="Items"
                        style={{width:200,height:40,marginRight:10,marginTop:5}}
                      />
                </Item>
                <Item>
                <Text>備註｜</Text>
                      <TextInput
                          onChangeText={(description) => this.setState({description:description,update:false})}
                          value={this.state.description}
                          placeholder="Description"
                          style={{width:200,height:40,marginRight:10,marginTop:5}}
                        />
                </Item>
                </Container>
            </ScrollView>
        )
    }

}
