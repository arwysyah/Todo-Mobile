import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Maps extends React.Component {
  constructor() {
    super();
    this.state = {
      latitude: null,
      longitude: null,
      isLoading: true,
    };
  }
  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: false,
      timeOut: 20000,
      maxumumAge: 60 * 60 * 4,
    };
    Geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions,
    );
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 5000);
  }
  geoSuccess = position => {
    // console.log("position",position)
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };
  geoFailure = err => {
    console.log(err.message);
  };
  render() {
    // console.log('latit',this.state.latitude)
    // console.log('longit',this.state.longitude)
    const {longitude, latitude, isLoading} = this.state;
    if (isLoading) {
      return (
        <View style={{top: 300}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }
    return (
      <View style={{backgroundColor:'black',flex:1}}>
        <View style={styles.title}>
          <Text style={styles.boldText}>MAPS</Text>
        </View>
        <View style={{height:80}}></View>
        <View style={{marginHorizontal: 20, top: 40}}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              title="Here I Am ">
              <Callout style={{height: 120}}></Callout>
            </Marker>
          </MapView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    height: 400,
  },
  imaps: {
    height: 80,
    width: 80,
    marginTop: 10,
    left: 20,
  },
  commonText: {
    fontSize: 18,
  },
  boldText: {
    fontSize: 25,
    fontWeight: 'bold',
    top:40,
    color:'grey'
  },
  title: {
    alignItems: 'center',
    top: 20,
  },
});
