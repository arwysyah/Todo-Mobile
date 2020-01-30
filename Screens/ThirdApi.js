import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';

import axios from 'axios';
import {Card ,Button,Icon} from 'native-base'

export default class ThirdApi extends Component {
  constructor() {
    super();
    this.state = {
      jsonData: [],
      title:'',
      body:'',
      isLoading:true
    };
  }

  async componentDidMount() {
    await setTimeout(() => {
      this.setState({isLoading: false});
    }, 2000);
    
    try {
        await axios.get('http://jsonplaceholder.typicode.com/posts').then((response)=>{
       this.setState({
         jsonData:response.data
       })

    })

    } catch (error) {
        console.log(error)

    }
   
this.onRefresh()
   
  }
  onRefresh=async()=>{

    
    console.log('hello')
    axios.get('http://jsonplaceholder.typicode.com/posts').then(result=>{
      this.setState({
        jsonData:response.data
      
      })
    })
    
  }
  submitJson=async()=>{
    const dataPost ={
      title:this.state.title,
      body:this.state.body
    }
    console.log(dataPost)
   
    await axios.post('http://jsonplaceholder.typicode.com/posts').then((res)=>{
   console.log(res)
      ToastAndroid.show('Post Succesfully' ,ToastAndroid.SHORT)
    })
 
  }


  render() {

    const {jsonData,title,body,isLoading} = this.state;
    // console.log(jsonData);
    if (isLoading) {
      return (
        <View style={{top: 300}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
    
    return (
      <View style={{flex:1,backgroundColor:'black'}}>
        <View style={{height:140,alignItems:'center'}}><Text style={styles.boldTexts}>THIRD API</Text></View>
        <View style={{alignItems: 'center',top:-40}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{color:'white',justifyContent:'center',left:-30,fontSize:20}}>Title</Text>
          <TextInput
              id="title"
              type="title"
              value={title}
              style={{
                backgroundColor: 'white',
                width: 210,
                height: 30,
                borderRadius: 5,
                elevation: 3,
              }}
              onChangeText={title => this.setState({title})}
            />
            
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',top:15}}>
            <Text style={{color:'white',justifyContent:'center',left:-30,fontSize:18}}>Body</Text>
          <TextInput
              id="body"
              type="body"
              value={body}
              style={{
                backgroundColor: 'white',
                width: 210,
                height: 30,
                borderRadius: 5,
                elevation: 3,
              }}
              onChangeText={body => this.setState({body})}
            />
          </View>
         
        <Button
              style={{height: 30,width:60, backgroundColor: 'green',top:30,alignItems:'center'}}
              onPress={() => {
               this.submitJson()
               this.setState({body:'',title:''})
              }}>
              <Text style={{textAlign:'center',left:12}}> Post </Text>
            </Button>
           <View style={{top:30,left:120}}>
           <Button
           style={{
             backgroundColor:'transparent'
           }} onPress={() => this.onRefresh()}>
            
            <Icon style={{color: 'white'}} name="refresh" />
      <Text>refresh</Text>
        </Button>
           </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.marger}>
          {jsonData.map((part, index) => (
            <Card key={index}> 
            <View style={{paddingHorizontal: 20, marginLeft: 20,paddingVertical:20}} >
            
              <Text style={styles.boldText}>{part.title}</Text>

              <Text style={styles.commonText}>{part.body}</Text>
            </View>
            </Card>
          ))}

          <View style={{top: 40, paddingLeft: 10, alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 15,
                alignItems: 'center',
                color: 'grey',
              }}></Text>
          </View>
        </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topNav: {
    backgroundColor: 'white',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 40,
    marginLeft: 300,
    top: 30,
  },
  boldTexts: {
    fontSize: 25,
    top:40,
    fontWeight: 'bold',
    color:'grey'
  },
  boldText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  commonText: {
    fontSize: 18,
  },
  marger: {
    marginTop: 30,

    flexDirection: 'row',

    flexWrap: 'wrap',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 29,
  },
  commonText: {
    fontSize: 16,
  },
  
  title: {
    fontSize:25 ,
    marginTop: 5,
    fontWeight: 'bold',
    marginLeft: 25,
    color: 'white',
  },
  card: {
    borderRadius: 5,
    elevation: 0,
    borderColor: 'transparent',
  },
});
