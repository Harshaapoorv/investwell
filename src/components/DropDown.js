import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import DropDownIcon from './DropDownIcon';
import ErrorIcon from './ErrorIcon';
import CheckMark from './CheckMark';

const DropDown = ({
  optionsArray,
  externalStyles,
  value,
  setValue,
  label,
  desc,
  placeholder,
  optional = false,
  required = false,
  isError = false,
}) => {
  const Styles = getStyles();
  const [showDropDown, setShowDropDown] = useState(false);
  const [item, setItem] = useState(placeholder);

  const selectItem = (label, value) => {
    setItem(label);
    setValue(value);
    setShowDropDown(false);
  };
  return (
    <View>
      <View style={[externalStyles, Styles.container]}>
        <View style={Styles.labelHead}>
          <Text style={Styles.label}>{label}</Text>
          {required && <Text>*</Text>}
          {optional && (
            <Text style={[Styles.label, Styles.optional]}>{'(optional)'}</Text>
          )}
        </View>
        <Pressable
          onPress={() => setShowDropDown(!showDropDown)}
          style={[
            Styles.inputField,
            isError && Styles.error,
            showDropDown && {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          ]}>
          <View style={Styles.errorField}>
            {isError && <ErrorIcon />}
            <Text>{item}</Text>
          </View>
          <DropDownIcon showContent={showDropDown} />
        </Pressable>
        {showDropDown && (
          <View style={Styles.dropdown}>
            {optionsArray.map((obj, index) => (
              <Pressable
                key={index}
                onPress={() => selectItem(obj.label, obj.value)}
                style={Styles.item}>
                <Text style={Styles.itemText}>{obj.label}</Text>
                {item === obj.label && <CheckMark />}
              </Pressable>
            ))}
          </View>
        )}
        {!showDropDown && (
          <View>
            <Text style={Styles.desc}>{desc}</Text>
            {isError && (
              <Text style={Styles.errorText}>{`${label} is mandatory`}</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    labelHead: {
      display: 'flex',
      flexDirection: 'row',
      columnGap: 4,
    },
    label: {
      fontFamily: 'InriaSans-Bold',
      fontWeight: 'bold',
      fontSize: 16,
      color: '#000000',
    },
    optional: {
      color: '#808080',
    },
    inputField: {
      width: '100%',
      height: 48,
      borderWidth: 1,
      borderColor: '#808080',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 16,
      marginTop: 8,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    desc: {
      fontFamily: 'InriaSans-Light',
      fontWeight: '300',
      fontSize: 12,
      color: '#444141',
      marginTop: 4,
    },
    dropdown: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      width: '100%',
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#808080',
      paddingVertical: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    item: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderBottomColor: '#808080',
      borderBottomWidth: 1,
    },
    itemText: {
      fontFamily: 'InriaSans-Bold',
      fontWeight: '400',
      fontSize: 16,
      color: '#000000',
    },
    errorField: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: 4,
    },
    error: {
      borderColor: '#E52124',
    },
    errorText: {
      color: '#E52124',
      marginTop: 4,
    },
  });

export default DropDown;
