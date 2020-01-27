import React,{Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import {Icon} from 'native-base'
import Maps from './Screens/Maps'
import TodoList from './Screens/TodoList'
import ThirdApi from './Screens/ThirdApi'


const AppStack= createStackNavigator({
  TodoList :{
    screen:TodoList,
    navigationOptions: {
      headerShown: false
    }
  }

})
const MapsStack= createStackNavigator({
  Maps :{
    screen:Maps,
    navigationOptions: {
      headerShown: false
    }
  }

})

const ThirdApiStack = createStackNavigator({
  ThirdApi:{
    screen:ThirdApi,
    navigationOptions:{
      headerShown:false
    }
  }
})


const BottomNavigator = createBottomTabNavigator(
  {
    TodoList: {
      screen: AppStack,
      navigationOptions: {
        tabBarLabel: 'ToDOList',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="FontAwesome5"
            name="clipboard-list"
            style={{color: tintColor, fontSize: 30}}
          />
        ),
      },
    },
        Maps: {
      screen: MapsStack,
      navigationOptions: {
        tabBarLabel: 'Maps',
        tabBarIcon: ({tintColor}) => (
          <Icon
            type="MaterialCommunityIcons"
            name="google-maps"
            style={{color: tintColor, fontSize: 30}}
          />
        ),
      },
    },

  ThirdApi: {
    screen:ThirdApiStack,
    navigationOptions: {
      tabBarLabel: 'API',
      tabBarIcon: ({tintColor}) => (
        <Icon
          type="MaterialCommunityIcons"
          name='file-document-box-multiple'
          style={{color: tintColor, fontSize: 30}}
        />
      ),
    },
  },
 
  
},
  {
    tabBarOptions: {
      activeTintColor: '#059dab',
      inactiveTintColor: '#757575',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 5,
      },
    },
  },
)




const SwitchScreen = createAppContainer(BottomNavigator)

class App extends Component{
  render(){
    return(
      <View>
      < SwitchScreen />
      </View>
    )
  }
}
export default SwitchScreen