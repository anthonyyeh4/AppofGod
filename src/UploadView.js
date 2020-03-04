import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AlertIOS
} from 'react-native';

//图片选择器
var ImagePicker = require('react-native-image-picker');

//图片选择器参数设置
var options = {
  title: '請選擇圖片來源',
  cancelButtonTitle:'取消',
  takePhotoButtonTitle:'拍照',
  chooseFromLibraryButtonTitle:'相冊圖片',
  // customButtons: [
  //   {name: 'hangge', title: '上傳連結'},
  // ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class UploadView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          avatarSource: null
      };
   }

   //渲染
   render() {
      return (
        <View style={styles.container}>
         <Text style={styles.item} onPress={this.choosePic.bind(this)}>選擇照片</Text>
         <Image source={this.state.avatarSource} style={styles.image} />
        </View>
      );
   }

   //选择照片按钮点击
   choosePic() {
      ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('用戶取消了選擇！');
      }
      else if (response.error) {
        alert("ImagePicker發生錯誤：" + response.error);
      }
      else if (response.customButton) {
        alert("自定義按鈕點擊：" + response.customButton);
      }
      else {
        let source = { uri: response.uri };
        console.log(response.uri);
        console.log(response.data)
        var queryURL = 'http://nudb1.ddns.net:3000/uploadImg';
        var app = this;
        var data = [];
        fetch(queryURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    base64:response.data,
                    filename:response.fileName
                })
            })
            .then((response) => response.json())
            .then((responseData)=>{
                console.log(responseData)
                var queryURL = 'http://nudb1.ddns.net:3000/appIdentify';
                fetch(queryURL, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            url:responseData.url
                        })
                    })
                    .then((response) => response.json())
                    .then((responseData)=>{
                        console.log(responseData)
                    })
                    .catch((error) => {
                        console.warn(error);
                    })
                    .done();
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
   }
 }

//样式定义
const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop:25
  },
  item:{
    margin:15,
    height:30,
    borderWidth:1,
    padding:6,
    borderColor:'#ddd',
    textAlign:'center'
  },
  image:{
   height:198,
   width:300,
   alignSelf:'center',
 },
});
