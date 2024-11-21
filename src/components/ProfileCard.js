import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import contentConfig from '../assets/json/content.json';

const Profile = ({username, panNumber, externalStyles}) => {
  const Styles = getStyles();
  const pageConfig = contentConfig.profile;
  return (
    <View style={[Styles.container, externalStyles]}>
      <View style={Styles.row}>
        <Text style={Styles.label}>{pageConfig.username}</Text>
        <Text style={Styles.label}>{pageConfig.panNumber}</Text>
      </View>
      <View style={[Styles.row, {marginTop: 8}]}>
        <Text style={Styles.value}>{username.toUpperCase()}</Text>
        <Text style={Styles.value}>{panNumber}</Text>
      </View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      padding: 8,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      fontFamily: 'InriaSans-Regular',
      fontWeight: '400',
      fontSize: 12,
      color: '#000000',
    },
    value: {
      fontFamily: 'InriaSans-Bold',
      fontWeight: 'bold',
      fontSize: 14,
      color: '#000000',
    },
  });

export default Profile;
