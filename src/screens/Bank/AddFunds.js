// //  working one
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppText from '../../components/AppText';
import {CloseIcon} from '../../components/Icons';
import {useIsFocused} from '@react-navigation/native';
import axiosInstance from '../../../axiosInstance';
import MYDropDown from '../../components/MyDropDown';
import AppButton from '../../components/AppButton';
import {Dropdown} from 'react-native-material-dropdown';
import CustumDropDown from '../../components/CustumDropDown';
import {API_URL, LOGIN_BASE_URL} from '@env';
import {getTranslation} from '../../helpers/TranslationUtils';

let catagery = [
  {
    id: 0,
    name: 'CR-Rent',
  },
  {
    id: 1,
    name: 'CR-Warrenty',
  },
  {
    id: 2,
    name: 'CR-Cost',
  },
  {
    id: 3,
    name: 'CR-Repair and Maintenance',
  },
];

const AddFunds = ({navigation, route}) => {
  useEffect(() => {
    setInputAmount(totalAmount.toString());
    setSelectedCategory(Catagery[0]);
  }, [totalAmount, Catagery]);

  const detail = route.params;
  

  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState();
  const [selectedCategory, setSelectedCategory] = useState({});
  const [totalAmount, setTotalAmount] = useState(route.params.amount);
  //console.log('totall',totalAmount)
  const [inputAmount, setInputAmount] = useState('');
  const [amounts, setAmounts] = useState([]);
  const [showAddButton, setShowAddButton] = useState(false);
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  const isFocused = useIsFocused();
  const [Catagery, SetCatgery] = useState(catagery);
  const [inputData, setInputData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(false);

  const [amountError, setamountError] = useState(false);
  const [catageryError, setCatageryError] = useState(false);

  const [supplier, setSupplier] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [supplierId, setSupplierId] = useState();

  const [catSupplier, setCatSupplier] = useState([]);
  const [selectedCatSupplier, setSelectedCatSupplier] = useState();

  const [buildings, setBuilding] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const [supError, setSupError] = useState(false);
  const [buildingError, setbuildingError] = useState(false);
  const [catError, setcatError] = useState(false);

  const [myselectedValue, setSeletedValue] = useState(null);

  const [successFund, setSuccessFund] = useState(false);
  const [suceessSupplier, setSuccessSupplier] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [inputCount, setInputCount] = useState(0);
  const [inputCount, setInputCount] = useState(0);
  const [wrongError, setWrongError] = useState(false);

  // const [inputCount, setInputCount] = useState(0);
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  const handleSelectBuilding = item => {
    setbuildingError(false);
    setSelectedBuilding(item);
  };

  const handleSelectCatSupplier = item => {
    setcatError(false);
    setSelectedCatSupplier(item);
  };

 

 
  const fetchData = async () => {
    if (isFocused) {
      try {
        const response = await axiosInstance.get(
          `${API_URL}/Tenant/GetAllTenants`,
        );
        const response1 = await axiosInstance.get(
          `${API_URL}/Supplier/GetAllSuppliers`,
        );
        const response2 = await axiosInstance.get(
          `${API_URL}/Building/GetAllBuildings`,
        );

        setTenants(response.data);
        setSupplier(response1.data);
        setBuilding(response2.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    supply();
  }, [supplierId]);

  const supply = async () => {
    try {
      console.log('Supply', API_URL);
      const response3 = await axiosInstance.get(
        `${API_URL}/Supplier/GetAttachedSupplierCategories?supplierId=${supplierId}`,
      );
      setCatSupplier(response3.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectSupplier = item => {
    setSupError(false);
    setSupplierId(item.id);
    supply();
    setSelectedSupplier(item);
  };

  const handleConfirmSupplier = async () => {
    if (!selectedSupplier) {
      console.log('sup error');
      return setSupError(true);
    }

    if (!selectedBuilding) {
      console.log('building error');
      return setbuildingError(true);
    }

    if (!selectedCatSupplier) {
      console.log('cat error');
      return setcatError(true);
    }

    const payload = {
      BankTransactionId: detail.id,
      building: selectedBuilding,
      buildingId: selectedBuilding.id,
      supplier: selectedCatSupplier,
      supplierCategoryId: selectedCatSupplier.id,
      supplierId: selectedCatSupplier.id,
    };

    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${API_URL}/Bank/AddFundToSupplier`,
        payload,
      );

      setSuccessSupplier(true);
      setLoading(false);

      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error('error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const handleSelectedItemChange = item => {
    setError(false);
    setSelectedTenant(item);
  };

  const handleConfirm = async () => {
    if (!selectedTenant) {
      setError(true);
    }

    if (Object.keys(selectedCategory).length === 0) {
      console.log('catagery missign');
      setcatError(true);
      return;
    }

    console.log(selectedTenant);
    console.log(inputData);
    const payload = {
      bankTransactionId: detail.id,
      tenantId: selectedTenant.id,
      duesCategories: inputData,
    };
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${API_URL}/Bank/AddFundToTenant`,
        payload,
      );

      setSuccessFund(true);
      setLoading(false);
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error('error:', error);
    }
    console.log(payload);
  };

  const handleCategorySelection = item => {
    //  console.log("counting", inputCount)
    setInputCount(prevCount => prevCount + 1);
    setcatError(false);
    setSelectedCategory(item);
    setSelectedCategories(prevSelectedCategories => [
      ...prevSelectedCategories,
      item.id,
    ]);

    //setInputAmount(totalAmount.toString());
  };

  const handleAddAmount = () => {
    if (inputAmount.trim() === '') {
      console.log('amount missing');
      setamountError(true);
      return;
    }

    if (Object.keys(selectedCategory).length === 0) {
      console.log('catagery missing');
      setcatError(true);
      return;
    }

    setamountError(false);
    setcatError(false);

    const updatedAvailableCategories = Catagery.filter(
      category => category.id !== selectedCategory.id,
    );

    const amount = parseFloat(inputAmount);
    if (!isNaN(amount) && amount >= 0 && amount <= totalAmount) {
      const remainingAmount = totalAmount - amount;
      const newInputData = [
        ...inputData,
        {duesCategory: selectedCategory.id, amount},
      ];
      setInputData(newInputData);
      setAmounts(prevAmounts => [...prevAmounts, {amount}]);
      setTotalAmount(remainingAmount);
      setInputAmount(remainingAmount.toString());
      setShowAddButton(false);
      SetCatgery(updatedAvailableCategories);

      // Reset selected category and error states
      setSelectedCategory({});
      setcatError(false);
    }
  };

  console.log(inputData);

  const handleInputChange = text => {
    setInputAmount(text);

    const amount = parseInt(text);
    setShowAddButton(amount > 0 && amount <= totalAmount);
  };

  const handleAdditionalField = () => {
    setShowAdditionalField(true);
  };

  return (
    <SafeAreaView>
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.header}>
          <AppText style={styles.headerText}>
            {detail.amount > 0
              ? getTranslation(
                  'Add Funds To Tenants',
                  'Add Funds To Tenants',
                  'Add Funds To Tenants',
                )
              : getTranslation('Add Funds To Supplier')}
          </AppText>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CloseIcon />
          </TouchableOpacity>
        </View>

        {detail.amount > 0 ? (
          <>
            <ScrollView style={{paddingHorizontal: 10}}>
              <View style={{paddingTop: 16}}>
                <CustumDropDown
                  title="CR-Tenants"
                  label="name"
                  values="id"
                  data={tenants}
                  handleSelect={handleSelectedItemChange}
                />
              </View>
              {error && (
                <AppText style={{color: 'red'}}>
                  {getTranslation(
                    'Tenant not Selected',
                    'Tenant not Selected',
                    'Tenant not Selected',
                  )}
                </AppText>
              )}
              <View style={styles.inputContainer}>
                <View style={{paddingBottom: 10}}>
                  <CustumDropDown
                    // title="CR-Catagery"
                    label="name"
                    values="id"
                    value={Catagery[0]}
                    data={Catagery}
                    handleSelect={handleCategorySelection}
                  />
                </View>
                {catError && (
                  <AppText style={{color: 'red'}}>
                    {getTranslation(
                      'Catagery not Selected',
                      'Catagery not Selected',
                      'Catagery not Selected',
                    )}
                  </AppText>
                )}

                <View style={styles.amountContainer}>
                  <Text style={styles.amountLabel}>
                    {inputData.length > 0
                      ? 'Reamining Amount :'
                      : 'Total Amount :'}
                  </Text>
                  <Text style={styles.amountValue}>{totalAmount}</Text>
                </View>

                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter Amount"
                  value={inputAmount}
                  onChangeText={handleInputChange}
                />

                {amountError && (
                  <AppText style={{color: 'red'}}>Amount not selected</AppText>
                )}

                {showAddButton && (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddAmount}>
                    <Text style={styles.addButtonLabel}>Add</Text>
                  </TouchableOpacity>
                )}

                {!Catagery[0]?.name && (
                  <AppText style={{color: 'red'}}>
                    Can't Proceed with Reaming Amount Kindly filled Amount
                    Correctly
                  </AppText>
                )}

                <View style={{elevation: 5, paddingHorizontal: 18}}>
                  {inputData.map((item, index) => (
                    <View key={index} style={styles.additionalFieldContainer}>
                      <View style={styles.amountContainer}>
                        <Text style={styles.amountLabel}>
                          Selected Catagery:
                        </Text>
                        <Text style={styles.amountValue}>
                          {
                            catagery.find(
                              category => category.id === item.duesCategory,
                            )?.name
                          }
                        </Text>
                      </View>
                      <View style={styles.amountContainer}>
                        <Text style={styles.amountLabel}>Entered Amount:</Text>
                        <Text style={styles.amountValue}>{item.amount}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {loading && <ActivityIndicator size="large" />}

                {/* {totalAmount !== 0 &&  (
                <AppButton
                  title="Confirm"
                  onPress={() => console.log('enter')}
                />
              )} */}

                <AppButton
                  title={getTranslation('Confirm', 'Confirm', 'Confirm')}
                  onPress={() => handleConfirm()}
                />

                {successFund && (
                  <AppText
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: 'green',
                    }}>
                    {getTranslation(
                      'Successfully Funds Transfer to Tenants',
                      'Successfully Funds Transfer to Tenants',
                      'Successfully Funds Transfer to Tenants',
                    )}
                  </AppText>
                )}

                <AppText style={styles.headingText}>
                  {getTranslation('Amount', 'Amount', 'Amount')}
                </AppText>
                <AppText>{detail?.amount}</AppText>

                <AppText style={styles.headingText}>
                  {getTranslation(
                    'Couner Part Name',
                    'Couner Part Name',
                    'Couner Part Name',
                  )}
                </AppText>
                <AppText>{detail?.counterpartName}</AppText>

                <AppText style={styles.headingText}>
                  {getTranslation(
                    'Remittance Information',
                    'Remittance Information',
                    'Remittance Information',
                  )}
                </AppText>
                <AppText>{detail?.remittanceInformation}</AppText>
              </View>
            </ScrollView>
          </>
        ) : (
          <View style={{paddingHorizontal: 15}}>
            <View style={{paddingTop: 16}}>
              <CustumDropDown
                title="CR-Select Supplier"
                label="company"
                values="id"
                data={supplier}
                handleSelect={handleSelectSupplier}
              />
            </View>

            {supError && (
              <AppText style={{color: 'red', marginLeft: 10}}>
                {getTranslation(
                  'Supplier Field is Required',
                  'Supplier Field is Required',
                  'Supplier Field is Required',
                )}
              </AppText>
            )}

            <View style={{paddingVertical: 10}}>
              <CustumDropDown
                title="My DropDown"
                label="name"
                values="id"
                data={buildings}
                handleSelect={handleSelectBuilding}
              />
            </View>
            {buildingError && (
              <AppText style={{color: 'red', marginLeft: 10}}>
                {getTranslation(
                  'Building Field is required',
                  'Building Field is required',
                  'Building Field is required',
                )}
              </AppText>
            )}

            <View style={{paddingBottom: 10}}>
              <CustumDropDown
                title="CR-Select Supplier"
                label="name"
                values="id"
                disable
                data={catSupplier}
                handleSelect={handleSelectCatSupplier}
              />
            </View>

            {catError && (
              <AppText style={{color: 'red', marginLeft: 10}}>
                {getTranslation(
                  'Catagery Field is Required',
                  'Catagery Field is Required',
                  'Catagery Field is Required',
                )}
              </AppText>
            )}

            <AppText style={styles.headingText}>
              {getTranslation('Amount', 'Amount', 'Amount')}
            </AppText>
            <AppText>{detail?.amount}</AppText>

            <AppText style={styles.headingText}>
              {getTranslation(
                'Counter Part Name',
                'Counter Part Name',
                'Counter Part Name',
              )}
            </AppText>
            <AppText>{detail?.counterpartName}</AppText>

            <AppText style={styles.headingText}>
              {getTranslation(
                'Remittance Information',
                'Remittance Information',
                'Remittance Information',
              )}
            </AppText>
            <AppText>{detail?.remittanceInformation}</AppText>

            {loading && <ActivityIndicator size="large" />}
            <AppButton
              title={getTranslation('Confirm', 'Confirm', 'Confirm')}
              onPress={() => handleConfirmSupplier()}
            />

            {suceessSupplier && (
              <AppText
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'green',
                }}>
                {getTranslation(
                  'Successfully Funds Transfer to Supplier',
                  'Successfully Funds Transfer to Supplier',
                  'Successfully Funds Transfer to Supplier',
                )}
              </AppText>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddFunds;

const styles = StyleSheet.create({
  headingText: {color: '#777777', fontWeight: '700'},
  header: {
    backgroundColor: '#1E293A',
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'white',
  },
  inputContainer: {
    marginTop: 20,
    //paddingHorizontal: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amountLabel: {
    marginRight: 10,
  },
  amountValue: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'white',
  },
  additionalFieldContainer: {
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'white',
  },
});
