import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';
import Input from '../components/InputField';
// import Button from '../components/Button';
import FundsList from '../components/FundsList';
import Profile from '../components/ProfileCard';
import contentConfig from '../assets/json/content.json';
import {
  useGetInvestmentsQuery,
  useAddInvestmentsMutation,
} from '../store/api/investmentSVC';
// import ErrorModal from '../components/ErrorModal';
import MySVG from '../components/EmptySvg';
import DiffCard from '../components/DiffCard';
import AddModal from '../components/AddModal';

const Dashboard = () => {
  const Styles = getStyles();
  const pageConfig = contentConfig.dashboard;
  const [input, setInput] = useState('');
  const [panNumber, setPanNumber] = useState('');
  // const [showButton, setShowButton] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [inputErrorMsg, setInputErrorMsg] = useState('');
  const [errMsg, setErrMsg] = useState(pageConfig.noPan);
  // const [showErrorModal, setShowErrorModal] = useState(false);
  const [totalCurrentVal, setTotalCurrentVal] = useState(0);
  const [totalInvestedVal, setTotalInvestedVal] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addPanNumber, setAddPanNumber] = useState('');
  const [addUsername, setAddUsername] = useState('');
  const [addFundname, setAddFundname] = useState('');
  const [addFundtype, setAddFundtype] = useState('');
  const [addInvestedAmount, setAddInvestedAmount] = useState('');
  const [addNote, setAddNote] = useState('');
  const [addObject, setAddObject] = useState({
    body: {
      user_name: '',
      pan_number: '',
      fund_name: '',
      investment_type: '',
      current_value: 0,
      invested_date: '',
      invested_amount: 0,
      note: '',
    },
  });

  useEffect(() => {
    if (input.length !== 10) {
      // setShowButton(true);
      setErrMsg(pageConfig.noPan);
      setPanNumber();
    }
  }, [input]);

  const {
    data: data,
    isError,
    error,
    isSuccess,
  } = useGetInvestmentsQuery({panNumber: panNumber}, {skip: !panNumber});
  useEffect(() => {
    if (isError) {
      // setShowErrorModal(true);
      setErrMsg(error?.data?.error ? error.data.error : pageConfig.errorMsg);
    }
  }, [isError, error]);

  const [
    updateValue,
    {isSuccess: updateSuccess, isError: updateError, error: updateErrorMsg},
  ] = useAddInvestmentsMutation();

  useEffect(() => {
    if (updateSuccess) {
      setAddObject({
        body: {
          user_name: '',
          pan_number: '',
          fund_name: '',
          investment_type: '',
          current_value: 0,
          invested_date: '',
          invested_amount: 0,
          note: '',
        },
      });
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateError && updateErrorMsg) {
      // setShowErrorModal(true);
      setErrMsg(
        updateErrorMsg?.data?.error
          ? updateErrorMsg.data.error
          : pageConfig.apiErrorMsg,
      );
    }
  }, [updateError, updateErrorMsg]);

  useEffect(() => {
    let current = 0;
    let invest = 0;
    if (data) {
      for (let i = 0; i < data?.length; i++) {
        current += parseFloat(data[i].current_value);
        invest += parseFloat(data[i].invested_amount);
      }
      setTotalCurrentVal(current.toFixed(2));
      setTotalInvestedVal(invest.toFixed(2));
    }
  }, [data]);

  useEffect(() => {
    if (addObject.body.invested_amount) {
      let randomPercentages = [5, 10, 15, 20];
      let randomReturn = ['gain', 'loss'];
      let percentage =
        randomPercentages[Math.floor(Math.random() * randomPercentages.length)];
      let returnVal =
        randomReturn[Math.floor(Math.random() * randomReturn.length)];
      let date = new Date();
      let current_date =
        date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
      let obj = addObject;
      if (parseInt(obj.body.invested_amount) !== 0 && !isModalVisible) {
        obj.body['invested_date'] = current_date;
        let val = (obj.body.invested_amount * percentage) / 100;
        if (returnVal === 'gain') {
          obj.body.current_value = parseFloat(
            (parseFloat(obj.body.invested_amount) + val).toFixed(2),
          );
        } else if (returnVal === 'loss') {
          obj.body.current_value = parseFloat(
            (parseFloat(obj.body.invested_amount) - val).toFixed(2),
          );
        }
      }
      updateValue(obj);
      setAddFundname('');
      setAddFundtype('');
      setAddInvestedAmount('');
      setAddNote('');
      setAddPanNumber('');
      setAddUsername('');
    }
  }, [addObject, isModalVisible]);

  const inputsArray = [
    {
      label: 'PAN Number',
      key: 'pan_number',
      desc: 'Example: XYZ1234567',
      value: addPanNumber,
      setValue: setAddPanNumber,
      required: true,
      type: 'input',
      placeholder: 'Enter your PAN number',
      autoCapitalize: 'characters',
    },
    {
      label: 'Username',
      key: 'user_name',
      desc: 'Example: Tony Stark',
      value: addUsername,
      setValue: setAddUsername,
      required: true,
      type: 'input',
      placeholder: 'Enter your Username',
    },
    {
      label: 'Fund name',
      key: 'fund_name',
      desc: 'Example: Global Equity Fund',
      value: addFundname,
      setValue: setAddFundname,
      required: true,
      type: 'input',
      placeholder: 'Enter your Fund name',
    },
    {
      label: 'Fund Type',
      key: 'investment_type',
      desc: 'Example: Equity',
      value: addFundtype,
      setValue: setAddFundtype,
      required: true,
      type: 'dropdown',
      optionsArray: [
        {
          label: 'Equity',
          value: 'EQUITY',
        },
        {
          label: 'Debt',
          value: 'DEBT',
        },
        {
          label: 'Mutual Fund',
          value: 'MUTUAL_FUND',
        },
        {
          label: 'Bonds',
          value: 'BONDS',
        },
      ],
      placeholder: 'Select your Fund type',
    },
    {
      label: 'Investment Amount',
      key: 'invested_amount',
      desc: 'Example: 20000.00',
      value: addInvestedAmount,
      setValue: setAddInvestedAmount,
      required: true,
      type: 'input',
      inputMode: 'decimal',
      keyboard: 'numeric',
      placeholder: 'Enter your Investment Amount',
    },
    {
      label: 'Note',
      key: 'note',
      desc: 'Example: Retirement Fund',
      value: addNote,
      setValue: setAddNote,
      optional: true,
      type: 'input',
      placeholder: 'Enter a note',
    },
  ];

  const search = () => {
    if (input.length === 10) {
      setPanNumber(input);
      setInputError(false);
      setInputErrorMsg('');
    } else {
      setErrMsg(pageConfig.noPan);
      setInputError(true);
      if (input.length > 0) {
        setErrMsg('Please enter a valid PAN Number');
        setInputErrorMsg('Please enter a valid PAN Number');
      }
      setPanNumber();
    }
  };

  const getModal = () => {
    return (
      <AddModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        updateVal={addObject}
        setUpdateVal={setAddObject}
        inputsArray={inputsArray}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={Styles.screen}>
        <ScrollView contentContainerStyle={Styles.container}>
          <View style={Styles.title}>
            <Text style={Styles.heading}>{pageConfig.title}</Text>
            <Pressable
              style={Styles.addButton}
              onPress={() => {
                setIsModalVisible(true);
                getModal();
              }}>
              <Text style={Styles.addButtonText}>ADD</Text>
            </Pressable>
          </View>
          <Input
            externalStyles={Styles.input}
            label={pageConfig.input.label}
            desc={pageConfig.input.desc}
            value={input}
            isError={inputError}
            placeholder={'Enter your PAN number'}
            setValue={setInput}
            searchIcon={true}
            errorMsg={inputErrorMsg}
            autoCapitalize={'characters'}
            clickHandler={() => search()}
          />
          <View style={Styles.scroll}>
            {(isError || input.length !== 10 || !panNumber) && (
              <View style={[Styles.emptyRes]}>
                <MySVG width={150} height={150} />
                <Text style={Styles.emptyResMsg}>{errMsg}</Text>
              </View>
            )}
            {/* {errMsg && showErrorModal && (
              <ErrorModal
                errorMsg={errMsg}
                showErrorModal={showErrorModal}
                setShowErrorModal={setShowErrorModal}
              />
            )} */}
            {panNumber && isSuccess && (
              <View>
                <DiffCard
                  currentVal={totalCurrentVal}
                  investVal={totalInvestedVal}
                  externalStyles={Styles.diffCard}
                />
                <Profile
                  username={data[0]?.user_name}
                  panNumber={data[0]?.pan_number}
                  externalStyles={Styles.profileCard}
                />
                <FundsList config={data} />
              </View>
            )}
          </View>
        </ScrollView>
        {getModal()}
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
      justifyContent: 'space-between',
    },
    container: {
      paddingHorizontal: 16,
    },
    title: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      marginTop: 32,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    heading: {
      fontFamily: `${'InriaSans-Bold'}`,
      fontWeight: 'bold',
      fontSize: 24,
      color: '#000000',
      marginRight: '30%',
    },
    addButton: {
      position: 'absolute',
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
    },
    addButtonText: {
      fontFamily: 'InriaSans-Bold',
      fontWeight: 'bold',
      fontSize: 16,
      color: '#1979BD',
    },
    input: {
      marginTop: 24,
    },
    scroll: {
      marginTop: 8,
      marginBottom: 16,
    },
    emptyRes: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 32,
    },
    emptyResMsg: {
      fontFamily: 'InriaSans-Light',
      fontWeight: '300',
      fontSize: 32,
      textAlign: 'center',
      textAlignVertical: 'center',
      marginTop: 32,
    },
    diffCard: {
      marginTop: 8,
    },
    profileCard: {
      marginTop: 8,
    },
    buttonContainer: {
      width: '100%',
      height: '20%',
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Dashboard;
