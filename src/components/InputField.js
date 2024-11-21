import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Pressable} from 'react-native';
import ErrorIcon from './ErrorIcon';
import SearchIcon from './SearchIcon';

const Input = ({
  externalStyles,
  value,
  setValue,
  label,
  desc,
  placeholder,
  clickHandler,
  errorMsg,
  inputMode,
  keyboardType,
  autoCapitalize,
  optional = false,
  required = false,
  isError = false,
  searchIcon = false,
}) => {
  const [clicked, setClicked] = useState(false);
  const Styles = getStyles();
  return (
    <View style={[externalStyles, Styles.container]}>
      <View style={Styles.labelHead}>
        <Text style={Styles.label}>{label}</Text>
        {required && <Text>*</Text>}
        {optional && (
          <Text style={[Styles.label, Styles.optional]}>{'(optional)'}</Text>
        )}
      </View>
      <View style={[Styles.inputField, isError && Styles.error]}>
        <View style={Styles.errorField}>
          {isError && <ErrorIcon />}
          <TextInput
            value={autoCapitalize ? value.toUpperCase() : value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={[
              searchIcon ? Styles.inputIcons : Styles.input,
              isError && Styles.error,
            ]}
            inputMode={inputMode}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
          />
        </View>
        {searchIcon && (
          <Pressable
            onPress={() => clickHandler()}
            onTouchStart={() => setClicked(true)}
            onTouchEnd={() => setClicked(false)}>
            <SearchIcon clicked={clicked} />
          </Pressable>
        )}
      </View>
      <View>
        <Text style={Styles.desc}>{desc}</Text>
        {isError && (
          <Text style={Styles.errorText}>
            {errorMsg ? errorMsg : `${label} is mandatory`}
          </Text>
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
    input: {
      width: '100%',
    },
    inputIcons: {
      width: '80%',
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
    errorField: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
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

export default Input;
