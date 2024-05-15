/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import TopBar from '../../components/TopBar';
import Card from '../../components/Card';
import AppText from '../../components/AppText';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axiosInstance from '../../../axiosInstance';
import GenericTable from '../../components/GenericTable';
import { Up } from '../../components/Icons';
import { Down } from '../../components/Icons';
import MYDropDown from '../../components/MyDropDown';
import CustumDropDown from '../../components/CustumDropDown';
import {API_URL,LOGIN_BASE_URL} from "@env"
import { getTranslation } from '../../helpers/TranslationUtils';
import CustumDropDownWithImage from '../../components/CustomDropDownWithImage';

const columns = [
  {
    id: 'executionDate',
    label: getTranslation("Date","Date","Date"),
    format: 'date',
  },
  {
    id: 'counterpartName',
    label: getTranslation("Counter Part Name","Counter Part Name","Counter Part Name"),
  },
  {
    id: 'amount',
    label: getTranslation("Amount","Amount","Amount"),
  },
  // {
  //   id:'bankAction',
  //   label:"Action"
  // }
];

const catagery = [
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
    name: 'CR-Repair and Maintaince',
  },
];

const BankInfo = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [status, setStatus] = useState(0);
  const [selectedButtonStatus, setSelectedButtonStatus] = useState(0);

  const [banks, setBanks] = useState([]);
  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPage] = useState('');
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const pageSize = 10;
  const [cash, setCash] = useState(false);

  const [clicked, setClicked] = useState(false);
  const [tenat, setTenant] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedBank, setSelectedBank] = useState(-1);
  const [allTenants, setAllTenats] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('All');

  const [transferDirection, setTransferDirection] = useState(0);
  const [selectedButtonTranferDirection, setSelectedButtonTransferDirection] =
    useState(0);
    const [sortDirection, setSortDirection] = useState(1); 
    const [sort,setSort]=useState(columns[0].id);
    const [handleSearchString,setHandleSerachString]=useState('')

  const fetchData = async (handleSearchString, pageNumber, pageSize,sortDirection,sort) => {
    if (isFocused) {
      try {
        console.log("banking info",API_URL)
        setLoading(true)
        const response1 = await axiosInstance.get(
          `${API_URL}/Bank/GetAllBanks`,
        );
        const allBankOption = { id: -1, shortDescription: 'All', iban: 'All' };
        const modifiedBanks = [allBankOption, ...response1.data];
        const response = await axiosInstance.get(
          `${API_URL}/Bank/GetAllBankTransactionsWithPagination`,
          {
            params: {
              transferDirection: transferDirection,
              status: status,
              bankId:selectedBank?.id,
              searchString: handleSearchString,
              pageNumber: pageNumber,
              pageSize: pageSize,
              sort:sort,
              sortDirection: sortDirection,
            },
          },
        );

        const response3 = await axiosInstance.get(
          `${API_URL}/Tenant/GetAllTenants`,
        );

        setLoading(false)

        setTotalPage(response.data.totalPages);
        setHasNext(response.data.hasNext);
        setHasPrevious(response.data.hasPrevious);
        setBanks(modifiedBanks);
        setData(response.data.data);
        setAllTenats(response3.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
  };

  useEffect(() => {
    fetchData(handleSearchString, pageNumber, pageSize,sortDirection,sort);
  }, [isFocused, status, transferDirection, handleSearchString, pageNumber,selectedBank]);

  const handleSelectedItemChange = item => {
    setTenant(item);
  };

  const handleCategorySelection = item => {
    setSelectedCategory(item);
  };

  const handleBankSelection = item => {
    setSelectedBank(item);
  };

  console.log(selectedBank);

  const handleButtonClick = statusValue => {
    setStatus(statusValue);
    setSelectedButtonStatus(statusValue);
  };

  const handlePreviousPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber - 1);
  };

  const handleNextPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  const handleButtonClick1 = statusValue => {
    setTransferDirection(statusValue);
    setSelectedButtonTransferDirection(statusValue);
  };

  const handleCash = iban => {
    setCash(true);
    setSelectedCountry(iban);
  };

  const banksWithImages = banks.map((bank) => ({
    ...bank,
    image: require("../../../assets/done.png"),
  }));

  return (
    <SafeAreaView>

      <TopBar route={`${getTranslation("Home","Home","Home")} / ${getTranslation("Banks","Banks","Banks")}`} />
      <ScrollView style={{height:600}}>
        {loading ? (
                      <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#fb5e39" />
        ):(
          <Card>
          <AppText>{getTranslation("Select Bank","Select Bank","Select Bank")}</AppText>

          <View style={{ paddingVertical: 10 }}>
            {/* <CustumDropDown
              // title="CR-Filter"
              label="iban"
              values="id"
              value={selectedBank}
              data={banks}
              handleSelect={handleBankSelection}
            /> */}
              {/* <CustumDropDown
    label="iban"
    values="id"
    value={selectedBank}
    data={banksWithImages} // Use the modified data with images
    handleSelect={handleBankSelection}
  /> */}
  <CustumDropDownWithImage
  label="iban"
  values="id"
  value={selectedBank}
  data={banksWithImages} // Use the modified data with images
  handleSelect={handleBankSelection}
  />
          </View>

          <AppText style={styles.headingText}>{getTranslation("Bank Information","Bank Information","Bank Information")}</AppText>
          {/* {banks?.map((obj, index) => {
          return ( */}
          <View style={{ padding: 10, elevation: 2 }}>
            <AppText>{getTranslation("Bank","Bank","Bank")}:{selectedBank?.shortDescription}</AppText>
            <AppText>{getTranslation("IBAN","IBAN","IBAN")}:{selectedBank?.iban}</AppText>
          </View>
          {/* );
        })} */}

          {selectedBank && (
            <View style={{ padding: 10, elevation: 2 }}>
              <AppText style={styles.headingText}>{getTranslation("Bank Balance","Bank Balance","Bank Balance")}</AppText>
              <AppText>{selectedBank.accountBalance} €</AppText>
            </View>
          )}
        </Card>

        )}
        
        {cash && (
          <Card>
            <AppText style={styles.headingText}>{getTranslation("Bank Balance","Bank Balance","Bank Balance")}</AppText>
            <AppText>{banks[0].accountBalance}</AppText>
          </Card>
        )}

        <Card>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={[
                styles.leftBtn,
                selectedButtonStatus === 0 && styles.selectedBtn,
              ]}
              onPress={() => handleButtonClick(0)}>
              <AppText style={selectedButtonStatus === 0 && styles.selectedText}>
                {getTranslation("All","All","All")}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.rightBtn,
                selectedButtonStatus === 2 && styles.selectedBtn,
              ]}
              onPress={() => handleButtonClick(2)}>
              <AppText style={selectedButtonStatus === 2 && styles.selectedText}>
              {getTranslation("Not Matched","Not Matched","Not Matched")}
              </AppText>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={[
                styles.leftBtn,
                selectedButtonTranferDirection === 0 && styles.selectedBtn,
              ]}
              onPress={() => handleButtonClick1(0)}>
              <AppText
                style={
                  selectedButtonTranferDirection === 0 && styles.selectedText
                }>
                {getTranslation("All","All","All")}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.rightBtn,
                selectedButtonTranferDirection === 1 && styles.selectedBtn,
              ]}
              onPress={() => handleButtonClick1(1)}>
              <AppText
                style={
                  selectedButtonTranferDirection === 1 && styles.selectedText
                }>
               {getTranslation("Income","Income","Income")}
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.rightBtn,
                selectedButtonTranferDirection === 2 && styles.selectedBtn,
              ]}
              onPress={() => handleButtonClick1(2)}>
              <AppText
                style={
                  selectedButtonTranferDirection === 2 && styles.selectedText
                }>
                {getTranslation("Expense","Expense","Expense")}
              </AppText>
            </TouchableOpacity>
          </View>

          <AppText style={styles.headingText}>{getTranslation("Bank","Bank","Bank")}</AppText>

          <GenericTable
            columns={columns}
            fetchData={fetchData}
            data={data}
            setData={setData}
            searchString={searchString}
            setSearchString={setSearchString}
            pageNumber={pageNumber}
            pageSize={pageSize}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
            onClick={'AddFunds'}
            Loading={loading}
            totalPages={totalPages}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
          // model={true}
          // handleSelectedItemChange={handleSelectedItemChange}
          // allTenants={allTenants}
          // catagery={catagery}
          // handleCategorySelection={handleCategorySelection}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          sort={sort}
          setSort={setSort}
          handleSearchString={handleSearchString}
          setHandleSerachString={setHandleSerachString}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankInfo;

const styles = StyleSheet.create({
  headingText: { color: 'black', fontSize: 17, fontWeight: '600' },
  rightBtn: {
    borderWidth: 1,
    borderTopColor: '#C6C6C6',
    borderRightColor: '#C6C6C6',
    borderLeftColor: 'white',
    borderBottomColor: '#C6C6C6',
    padding: 10,
  },
  leftBtn: {
    borderLeftColor: 'grey',
    borderWidth: 1,
    padding: 10,
    borderColor: '#C6C6C6',
  },
  selectedBtn: {
    backgroundColor: '#D8EDFD',
  },
  selectedText: {
    color: '#51A9FE',
  },
});

// {banks.map(obj => {
//   return (
//     <TouchableOpacity
//       style={{
//         width: '85%',
//         alignSelf: 'center',
//         height: 50,
//         justifyContent: 'center',
//         borderBottomWidth: 0.5,
//         borderColor: 'black',
//       }}
//       onPress={() => {
//        // setSelectedCountry(obj.iban);
//        handleCash(obj.iban)
//         setClicked(!clicked);
//       }}>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text style={{fontWeight: '600', }}>
//           {obj.iban}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// })}

// dropdown