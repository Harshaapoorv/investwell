import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Profile from '../components/ProfileCard';
import Card from '../components/FundsCard';
import DiffCard from '../components/DiffCard';

const FundDetails = ({route}) => {
  const data = route?.params.data;
  const Styles = getStyles();
  return (
    <SafeAreaView>
      <View style={Styles.screen}>
        <Profile
          username={data.user_name}
          panNumber={data.pan_number}
          externalStyles={Styles.profile}
        />
        <DiffCard
          currentVal={parseFloat(data?.current_value)}
          investVal={parseFloat(data?.invested_amount)}
          externalStyles={Styles.diff}
        />
        <Card data={data} />
      </View>
    </SafeAreaView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    screen: {
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: '#F4F1F1',
      paddingHorizontal: 16,
    },
    profile: {
      marginTop: 32,
    },
    diff: {
      marginTop: 8,
    },
  });

export default FundDetails;
