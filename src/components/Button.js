import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const Button = ({buttonText, clickHandler}) => {
  const Styles = getStyles();
  return (
    <Pressable onPress={() => clickHandler()} style={Styles.container}>
      <Text style={Styles.buttonText}>{buttonText}</Text>
    </Pressable>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5CC880',
      paddingHorizontal: 52,
      paddingVertical: 13,
      borderRadius: 16,
    },
    buttonText: {
      fontFamily: 'InriaSans-Regular',
      fontWeight: '400',
      fontSize: 20,
      color: '#FFFFFF',
    },
  });

export default Button;
