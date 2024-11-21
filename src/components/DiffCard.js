import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GainIcon from './GainIcon';
import LossIcon from './LossIcon';

const DiffCard = ({currentVal, investVal, externalStyles}) => {
  const Styles = getStyles();
  const res = currentVal > investVal ? 'gain' : 'loss';
  const percent = (((currentVal - investVal) / investVal) * 100).toFixed(2);
  return (
    <View style={[Styles.container, externalStyles]}>
      <View style={Styles.row}>
        <Text style={Styles.label}>{`Your total \n${res} is`}</Text>
        <Text
          style={[
            Styles.label,
            {textAlign: 'right'},
          ]}>{`Your total \n${res} percentage is`}</Text>
      </View>
      <View style={Styles.row}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 4,
          }}>
          {res === 'gain' ? <GainIcon /> : <LossIcon />}
          <Text style={[Styles.value, Styles[res]]}>
            {currentVal - investVal}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 4,
          }}>
          {res === 'gain' ? <GainIcon /> : <LossIcon />}
          <Text style={[Styles.value, Styles[res]]}>{`${percent}%`}</Text>
        </View>
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
      rowGap: 8,
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
    gain: {
      color: '#21E527',
    },
    loss: {
      color: '#E52124',
    },
  });

export default DiffCard;
