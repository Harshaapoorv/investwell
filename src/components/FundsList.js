import React from 'react';
import ListItem from './FundsListItem';
import {View} from 'react-native';
const FundsList = ({config}) => {
  return (
    <View>
      {config.map((data, index) => (
        <ListItem data={data} key={index} />
      ))}
    </View>
  );
};

export default FundsList;
