import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {getDistance} from 'geolib';

import BackButton from '../../components/BackButton';
import CustomHeader from '../../components/CustomHeader';
import {colors} from '../../constants/colors';
import {textStyles} from '../../constants/textStyles';
import {scale} from '../../utils/responsive';
import {useSelector, useDispatch} from 'react-redux';
import {setGeoLocationAction} from '../../redux/dashboardSlice';

const GeoValidationScreen = ({navigation, route}) => {
  const {radius} = route.params;
  const dispatch = useDispatch();

  const latitude = useSelector(state => state.profile.userOffice.latitude);
  const longitude = useSelector(state => state.profile.userOffice.longitude);

  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(null);
  const [latlng, setLatlng] = useState({latitude: 0, longitude: 0});
  const [distance, setDistance] = useState(0);

  const OFFICE_LOCATION = {
    latitude: Number(latitude),
    longitude: Number(longitude),
  };

  const mapRef = useRef(null);

  useEffect(() => {
    _requestAccessLocation();
  }, []);

  const findCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        dispatch(
          setGeoLocationAction({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        );
        const getDis = getDistance(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          OFFICE_LOCATION,
        );
        setLatlng(position.coords);
        setDistance(getDis);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const _requestAccessLocation = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    } else {
      setLocationPermissionGranted(
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Accesing your location',
            message: 'This app need to access your current location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        ),
      );
    }
  };

  const _handleFocus = () => {
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: latlng.latitude,
          longitude: latlng.longitude,
        },
      });
    }
  };

  const renderMap = () => {
    if (locationPermissionGranted !== 'granted' && Platform.OS === 'android') {
      return (
        <Text style={textStyles.Subline}>Please enable location first</Text>
      );
    }

    return (
      <View>
        <MapView
          ref={mapRef}
          onMapReady={findCurrentLocation}
          provider={PROVIDER_GOOGLE}
          // onUserLocationChange={findCurrentLocation}
          style={styles.map}
          showsUserLocation
          region={{
            latitude: latlng.latitude,
            longitude: latlng.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.005,
          }}>
          <Circle
            radius={radius}
            center={OFFICE_LOCATION}
            strokeColor={'rgba(55, 120, 187, 0.7)'}
            fillColor={'rgba(55, 120, 187, 0.25)'}
          />
          <Marker coordinate={OFFICE_LOCATION} />
        </MapView>
        <View style={[styles.containerBack, {}]}>
          <BackButton navigation={navigation} />
        </View>
        <TouchableOpacity
          onPress={() => _handleFocus()}
          style={styles.containerFocus}>
          <Image
            style={styles.image}
            source={require('../../assets/images/map-focus.png')}
          />
        </TouchableOpacity>
        <View style={styles.containerRadius}>
          <Text style={[textStyles.normal, {alignSelf: 'center'}]}>
            You are in radius
          </Text>
          <Text
            style={[
              textStyles.normal,
              {alignSelf: 'center', fontSize: scale(24), marginVertical: 5},
            ]}>
            {distance} M
          </Text>
          <Text
            style={[
              textStyles.normal,
              {width: scale(150), textAlign: 'center'},
            ]}>
            The nearest check-in point is {radius} meters
          </Text>
          {distance <= radius && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Attendance', {endShift: false})}
              style={styles.containerButton}>
              <Text style={[textStyles.normal, {color: 'white'}]}>
                Validate
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      {renderMap()}
    </View>
  );
};

export default GeoValidationScreen;

const styles = StyleSheet.create({
  containerFocus: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  containerButton: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: colors.PRIMARY,
    marginTop: 5,
  },
  containerRadius: {
    position: 'absolute',
    bottom: scale(100),
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingVertical: scale(10),
    paddingHorizontal: scale(30),
  },
  image: {
    width: 35,
    height: 35,
  },
  container: {
    backgroundColor: colors.BACKGROUND,
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  containerBack: {
    position: 'absolute',
    top: 15,
    backgroundColor: '#D7D7D7',
    paddingRight: 6,
    paddingVertical: 5,
    left: 15,
  },
});
