import React from 'react';
import {Modal, View, Text, StyleSheet, Pressable} from 'react-native';

const ErrorModal = ({errorMsg, showErrorModal, setShowErrorModal}) => {
  const Styles = getStyles();
  return (
    <Modal visible={showErrorModal} animationType="none" transparent={true}>
      <View style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <View style={Styles.heading}>
            <Text style={Styles.title}>{'Error'}</Text>
          </View>
          <View style={Styles.content}>
            <Text>{errorMsg}</Text>
          </View>
          <View style={Styles.button}>
            <Pressable onPress={() => setShowErrorModal(!showErrorModal)}>
              <Text>{'Ok'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = () =>
  StyleSheet.create({
    centeredView: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '00%',
      shadowColor: '#000000',
      shadowOpacity: '10%',
    },
    modalView: {
      display: 'flex',
      flexDirection: 'column',
      width: '75%',
      height: '40%',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    heading: {
      width: '100%',
      paddingTop: 24,
      borderBottomWidth: 1,
      borderColor: '#808080',
    },
    title: {
      fontFamily: 'InriaSans-Bold',
      fontWeight: 'bold',
      fontSize: 24,
      color: '#000000',
      textAlign: 'center',
    },
    content: {
      display: 'flex',
      width: '60%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    message: {
      fontFamily: 'InriaSans-Regular',
      fontWeight: '400',
      fontSize: 24,
      color: '#000000',
      textAlign: 'center',
    },
    button: {
      width: '100%',
      paddingVertical: 13,
      borderTopWidth: 1,
      borderTopColor: '#808080',
      alignItems: 'center',
    },
  });

export default ErrorModal;
