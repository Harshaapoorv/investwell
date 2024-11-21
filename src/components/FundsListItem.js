import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {convert_to_short_date} from '../shared/utils';
import ArrowIcon from './ArrowIcon';

const ListItem = ({data}) => {
  const Styles = getStyles();
  const navigation = useNavigation();
  return (
    data && (
      <Pressable
        onPress={() => navigation.navigate('FundDetails', {data: data})}>
        <View style={Styles.container}>
          <View style={Styles.row}>
            <Text style={Styles.value}>{data.fund_name}</Text>
            <Text style={[Styles.value, {textAlign: 'right'}]}>
              {data.current_value}
            </Text>
          </View>
          <View style={[Styles.row, {marginTop: 8}]}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 4,
              }}>
              <Text style={Styles.label}>{data.investment_type}</Text>
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: '#808080',
                  borderRadius: '50%',
                }}></View>
              <Text>{convert_to_short_date(data?.invested_date)}</Text>
            </View>
            <ArrowIcon width={24} height={24} />
          </View>
        </View>
      </Pressable>
    )
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: 16,
      marginTop: 16,
      borderRadius: 8,
    },
    row: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    label: {
      fontFamily: 'InriaSans-Regular',
      fontWeight: '400',
      fontSize: 14,
      color: '#000000',
    },
    value: {
      width: '50%',
      fontFamily: 'InriaSans-Bold',
      fontWeight: 'bold',
      fontSize: 24,
      color: '#000000',
      flexWrap: 'wrap',
    },
  });

export default ListItem;
