import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import Input from './InputField';
import CloseIcon from './CloseIcon';
import Button from './Button';
import DropDown from './DropDown';

const AddModal = ({
  updateVal,
  setUpdateVal,
  inputsArray,
  isModalVisible,
  setIsModalVisible,
}) => {
  const [errorsArray, setErrorsArray] = useState([]);
  const Styles = getStyles();
  const clickUpdate = () => {
    let flag = 0;
    let obj = updateVal;
    let array = [];
    for (let i = 0; i < inputsArray.length; i++) {
      if (inputsArray[i].value) {
        if (inputsArray[i].key === 'invested_amount') {
          if (!isNaN(parseFloat(inputsArray[i].value))) {
            obj.body[inputsArray[i].key] = parseFloat(inputsArray[i].value);
          } else {
            array.push(inputsArray[i].key);
            inputsArray[i]['errorMsg'] =
              'Please enter a valid investment amount';
          }
        } else if (inputsArray[i].key === 'pan_number') {
          if (inputsArray[i].value.length === 10) {
            obj.body[inputsArray[i].key] = inputsArray[i].value;
          } else {
            array.push(inputsArray[i].key);
            inputsArray[i]['errorMsg'] = 'Please enter a valid PAN Number';
          }
        } else {
          obj.body[inputsArray[i].key] = inputsArray[i].value;
        }
      } else if (i !== inputsArray.length - 1) {
        flag = 1;
        array.push(inputsArray[i].key);
      }
    }
    if (array.length === 0) {
      setIsModalVisible(false);
      setErrorsArray([]);
      setUpdateVal(obj);
    } else {
      setErrorsArray(array);
    }
  };

  const onClickHandler = () => {
    setIsModalVisible(false);
    setErrorsArray([]);
  };

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={() => onClickHandler()}
      transparent={true}
      animationType="slide">
      <View style={Styles.centeredView}>
        <View style={Styles.modalView}>
          <View style={Styles.modalHead}>
            <Text style={Styles.title}>Add Investments</Text>
            <Pressable
              onStartShouldSetResponder={() => true}
              onPress={() => onClickHandler()}>
              <CloseIcon />
            </Pressable>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={Styles.modalBody}>
              {inputsArray.map((obj, index) =>
                obj?.type === 'input' ? (
                  <Input
                    key={index}
                    label={obj.label}
                    desc={obj.desc}
                    value={obj.value}
                    setValue={obj.setValue}
                    optional={obj?.optional}
                    required={obj?.required}
                    placeholder={obj?.placeholder}
                    inputMode={obj?.inputMode}
                    keyboardType={obj?.keyboard}
                    autoCapitalize={obj?.autoCapitalize}
                    errorMsg={obj?.errorMsg}
                    externalStyles={
                      index !== 0 && {
                        marginTop: 24,
                      }
                    }
                    isError={errorsArray.includes(obj.key)}
                  />
                ) : (
                  <DropDown
                    key={index}
                    optionsArray={obj?.optionsArray}
                    label={obj.label}
                    desc={obj.desc}
                    value={obj.value}
                    setValue={obj.setValue}
                    optional={obj?.optional}
                    required={obj?.required}
                    placeholder={obj?.placeholder}
                    externalStyles={
                      index !== 0 && {
                        marginTop: 24,
                      }
                    }
                    isError={errorsArray.includes(obj.key)}
                  />
                ),
              )}
            </View>
          </ScrollView>
          <View style={Styles.buttonContainer}>
            <Button buttonText={'Update'} clickHandler={() => clickUpdate()} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = () =>
  StyleSheet.create({
    centeredView: {
      width: '100%',
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 5,
    },
    modalView: {
      width: '100%',
      height: '90%',
      backgroundColor: '#FFFFFF',
      borderRadius: 32,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 5,
    },
    modalHead: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomColor: '#808080',
      borderBottomWidth: 1,
    },
    title: {
      fontFamily: 'InriaSans-Bold',
      fontWeight: 'bold',
      fontSize: 16,
      color: '#000000',
      marginRight: '20%',
    },
    modalBody: {
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
    buttonContainer: {
      width: '100%',
      height: 131,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default AddModal;
