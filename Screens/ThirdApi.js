import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {WebView} from 'react-native-webview';
import axios from 'axios';
import data from './data';
export default class ThirdApi extends Component {
  constructor() {
    super();
    this.state = {
      datas: [],
    };
  }

  componentDidMount() {
    this.setState({
      datas: data,
    });

    // try {
    //     axios.get('http://www.appdomain.com/users').then((response)=>{
    //     console.log(response.json())

    // })

    // } catch (error) {
    //     console.log(error)

    // }
  }

  render() {
    const {datas} = this.state;
    console.log(datas);
    return (
      <ScrollView>
        <View style={{alignItems: 'center', top: 40}}>
          <Text style={styles.boldText}>THIRD API</Text>
        </View>
        <View style={styles.experienceView}>
          {datas.map((part, index) => (
            <View style={{paddingHorizontal: 20, marginLeft: 20}} key={index}>
              <Text style={{fontSize: 15, color: '#059dab', marginTop: 15}}>
                User Id : {part.userId}
              </Text>
              <Text style={styles.boldText}>{part.title}</Text>

              <Text style={styles.commonText}>{part.body}</Text>
            </View>
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
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  commonText: {
    fontSize: 18,
  },
  experienceView: {
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
  ViewData1: {
    shadowColor: 13,
    borderRadius: 12,
    height: 240,
    width: 220,
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 28,
    top: 35,
  },
  Badge: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    width: 145,
    height: 20,
  },
  scroll: {
    paddingLeft: 20,
    flexDirection: 'row',
    height: 300,
  },
  title: {
    fontSize: 28,
    marginTop: 5,
    fontWeight: 'bold',
    marginLeft: 25,
    color: 'white',
  },
});
