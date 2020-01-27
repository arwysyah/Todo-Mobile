import React, {Component} from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Button, Text, Icon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
export default class TodoList extends Component {
  state = {
    inputText: '',
    data: [],
    isLoading: true,
    isChecked: false,
  };

  async componentDidMount() {
    await setTimeout(() => {
      this.setState({isLoading: false, data: this.state.data});
    }, 3000);
  }

  handleDelete = async e => {
    let array = [...this.state.data];
    let index = array.indexOf(e.target.value);

    array.splice(index, 1);
    this.setState({data: array});

    try {
      let me = await AsyncStorage.setItem(
        'keya',
        JSON.stringify([...this.state.data]),
      );
     
    } catch (error) {
      console.log(error);
    }

    ToastAndroid.show('Delete Successfully', ToastAndroid.SHORT);
    // console.log(this.state.data, 'proda');
  };
  addTodo = async e => {
    const activity = this.state.inputText;

    this.setState({data: [activity,...this.state.data]});
    try {
        let me = await AsyncStorage.setItem(
            'keya',
            JSON.stringify([...this.state.data]),
          
          );
        //   this.setState({data:this.state.data.reverse()})
    } catch (error) {
        console.log(error)
    }
  

    ToastAndroid.show('Add todo Successfully', ToastAndroid.SHORT);
    // this.setState({
    //   data: this.state.data,
    // });
  };

  handleCheckBox = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  render() {
    const datass = AsyncStorage.getItem('keya').then(req =>
      console.log(JSON.parse(req)),
    );

    // console.log('check', this.state.isChecked);
    // console.log('searc', this.state.inputText);

    const {inputText, data, isLoading, isChecked} = this.state;
    // console.log('da', data);
    if (isLoading) {
      return (
        <View style={{top: 300}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
    return (
      <View>
        <View>
          <Text>Sign In</Text>

          <View style={styles.itemsTodo}>
            <TextInput
              id="inputText"
              type="inputText"
              value={inputText}
              style={{backgroundColor: 'pink', width: 170}}
              onChangeText={inputText => this.setState({inputText})}
            />

            <Button
              primary
              style={{height: 40}}
              onPress={() => {
                this.addTodo();
                this.setState({inputText: ''});
              }}>
              <Text> Add </Text>
            </Button>
          </View>
        </View>
        <View style={{height: 30, top: 60}}></View>
        {data.map((todo, index) => (
          <View key={index} style={styles.toDo}>
            <View style={{width: 200}}>
              <Text style={{textAlign: 'center', fontSize: 15}}>{todo}</Text>
            </View>
            <CheckBox
              style={{height: 20}}
              value={this.state.isChecked}
              onChange={() => this.handleCheckBox()}
            />
            <Button
              style={{justifyContent: 'center'}}
              primary
              onPress={e => {
                this.handleDelete(e);
              }}>
              <Icon
                type="FontAwesome5"
                name="trash-alt"
                style={{fontSize: 14, color: 'white'}}
              />
            </Button>
          </View>
        ))}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  toDo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemsTodo: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
