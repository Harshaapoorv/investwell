import React, {useState} from 'react';
import {Modal, View, Text, StyleSheet, Pressable} from 'react-native';
import contentConfig from '../assets/json/content.json';
import {convert_to_full_date} from '../shared/utils';
import CloseIcon from './CloseIcon';

const Card = ({data}) => {
  const [showNote, setShowNote] = useState(false);
  const Styles = getStyles();
  const pageConfig = contentConfig.fundDetails.fundcard;
  const array = [
    {
      label: pageConfig.name,
      value: data.fund_name,
    },
    {
      label: pageConfig.type,
      value: data.investment_type,
    },
    {
      label: pageConfig.amount,
      value: data.invested_amount,
    },
    {
      label: pageConfig.date,
      value: convert_to_full_date(data.invested_date),
    },
  ];
  const getNote = () => {
    return (
      <Modal
        visible={showNote}
        onRequestClose={() => setShowNote(false)}
        animationType="none"
        transparent={true}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: 4,
                alignItems: 'center',
              }}>
              <View style={Styles.mediumIcon}>
                <Text style={Styles.mediumIconText}>i</Text>
              </View>
              <Text>{data.note}</Text>
            </View>
            <Pressable onPress={() => setShowNote(!showNote)}>
              <CloseIcon width={24} height={24} />
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <View style={Styles.container}>
      <View>
        <Text style={Styles.desc}>{pageConfig.desc}</Text>
        <View style={Styles.title}>
          <Text style={Styles.heading}>{data.current_value}</Text>
          {data?.note && (
            <Pressable
              style={[Styles.smallIcon, {marginBottom: 8, marginLeft: 8}]}
              onPress={() => setShowNote(!showNote)}>
              <Text style={Styles.smallIconText}>i</Text>
            </Pressable>
          )}
        </View>
      </View>
      <View style={Styles.innerContainer}>
        {array.map((config, index) => (
          <View key={index} style={Styles.row}>
            <Text>{config.label}</Text>
            <Text style={Styles.value}>{config.value}</Text>
          </View>
        ))}
      </View>
      {getNote()}
    </View>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      marginTop: 16,
      padding: 16,
    },
    desc: {
      fontFamily: 'InriaSans-Regular',
      fontWeight: '400',
      fontSize: 10,
      color: '#000000',
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginTop: 4,
    },
    innerContainer: {
      backgroundColor: '#9ABFF0',
      paddingVertical: 16,
      borderRadius: 8,
      marginTop: 16,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderColor: '#FFFFFF',
    },
    value: {
      fontFamily: 'InriaSans-Bold',
      fontWeight: 'bold',
      fontSize: 16,
      color: '#000000',
      flexWrap: 'wrap',
      textAlign: 'right',
    },
    heading: {
      fontFamily: 'InriaSans-Bold',
      fontWeight: 'bold',
      fontSize: 32,
      color: '#000000',
    },
    centeredView: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      marginTop: '90%',
    },
    modalView: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: 4,
      width: '80%',
      padding: 8,
      paddingVertical: 12,
      borderRadius: 8,
      // marginBottom: '40%',
      // marginTop: '12%',
      marginRight: '6%',
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    smallIcon: {
      width: 16,
      height: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      borderColor: '#000000',
      borderWidth: 1,
    },
    smallIconText: {
      fontSize: 10,
    },
    mediumIcon: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      borderColor: '#000000',
      borderWidth: 2,
    },
    mediumIconText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default Card;
