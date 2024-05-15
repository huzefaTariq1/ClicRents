import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Menuicon} from '../../components/Icons';
import AppText from '../../components/AppText';
import {FileIcon} from '../../components/Icons';
import {FileIcon2} from '../../components/Icons';
import colors from '../../constants/colors';
import Card from '../../components/Card';
import GenericTable from '../../components/GenericTable';
import {ROUTES} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosInstance from '../../../axiosInstance';
import {API_URL,LOGIN_BASE_URL} from "@env"
import { getTranslation } from '../../helpers/TranslationUtils';

const columns = [
  {
    id: 'date',
    label: getTranslation("Date","Date","Date"),
    format: 'date',
  },
  {
    id: 'name',
    label: getTranslation("Name","Name","Name"),
  },

  {
    id: 'buildingName',
    label:getTranslation("Building","Building","Building"),
  },
  {
    id: 'amount',
    label: getTranslation("Due","Due","Due"),
  },
];

const AllDuesScreen = () => {
  const [selectedButton, setSelectedButton] = useState(1);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPage] = useState('');

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sortDirection, setSortDirection] = useState(1); 
  const [sort,setSort]=useState(columns[0].id);
  const [handleSearchString,setHandleSerachString]=useState('')

  const {token, userData} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const {firstName, lastName} = userData;
  const firstLetterOfFirstName = firstName ? firstName.charAt(0) : '';
  const firstLetterOfLastName = lastName ? lastName.charAt(0) : '';

  let url = `${API_URL}/Due/GetAllDuesWithPagination`;
  let url1 = `${API_URL}/Due/GetAllConfirmedDuesWithPagination`;

  const fetchData = async (url, handleSearchString, pageNumber, pageSize,sortDirection,sort) => {
    try {
      setLoading(true);
      console.log("dues",API_URL)
      const response = await axiosInstance.get(url, {
        params: {
          searchString: handleSearchString,
          pageNumber: pageNumber,
          pageSize: pageSize,
          sort:sort,
          sortDirection: sortDirection,
        },
      });
      setLoading(false);
      setTotalPage(response.data.totalPages);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let urlToFetch;
    if (selectedButton === 1) {
      urlToFetch =
        `${API_URL}/Due/GetAllDuesWithPagination`;
    } else if (selectedButton === 2) {
      urlToFetch =
        `${API_URL}/Due/GetAllConfirmedDuesWithPagination`;
    }
    fetchData(urlToFetch, handleSearchString, pageNumber, pageSize,sortDirection,sort);
  }, [selectedButton, handleSearchString, pageNumber,sortDirection]);

  const handlePreviousPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber - 1);
  };

  const handleNextPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  const handleButtonPress = buttonNumber => {
    setSelectedButton(buttonNumber);
  };

  const handlePress = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      setDropdownVisible(false);
      await AsyncStorage.removeItem('accessToken');
      dispatch({type: 'setToken', payload: ''});
      // navigation.navigate("LoginForm")
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <SafeAreaView>

    <ScrollView>
      <View style={{backgroundColor: '#F4F6F8'}}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Menuicon />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 1 && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress(1)}>
            <FileIcon />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 2 && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress(2)}>
            <FileIcon2 />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button1} onPress={handlePress}>
            <Text
              style={
                styles.buttonText
              }>{`${firstLetterOfFirstName} ${firstLetterOfLastName}`}</Text>
          </TouchableOpacity>
        </View>

        <View style={{paddingHorizontal: 10}}>
          <View style={styles.card}>
            <Text style={styles.text}>{`${getTranslation("Home","Home","Home")} / ${getTranslation("Dues","Dues","Dues")}`}</Text>
          </View>
        </View>

        {dropdownVisible && (
          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={handleLogout}>
            <View style={styles.dropdown}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {selectedButton === 1 && (
        <Card>
          <AppText style={styles.headingText}>{getTranslation("Dues","Dues","Dues")}</AppText>

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
           // onClick={ROUTES.TENANT_DETAILS}
            Loading={loading}
            totalPages={totalPages}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            sort={sort}
            setSort={setSort}
            handleSearchString={handleSearchString}
            setHandleSerachString={setHandleSerachString}
          />
        </Card>
      )}

      {selectedButton === 2 && (
        <Card>
          <AppText style={styles.headingText}>{getTranslation("Previous Dues","Previous Dues","Previous Dues")}</AppText>

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
           // onClick={ROUTES.TENANT_DETAILS}
            Loading={loading}
            totalPages={totalPages}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            sort={sort}
            setSort={setSort}
            handleSearchString={handleSearchString}
            setHandleSerachString={setHandleSerachString}
          />
        </Card>
      )}
    </ScrollView>
    </SafeAreaView>
  );
};

export default AllDuesScreen;

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#233044',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
  },
  card: {
    backgroundColor: '#1E293A',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  bigCard: {
    backgroundColor: '#1E293A',
    paddingVertical: 55,
    borderRadius: 10,
    marginVertical: 10,
  },
  headingText: {color: 'black', fontSize: 17, fontWeight: '600'},
  text: {
    color: '#FFFFFF',
    paddingLeft: 10,
    fontSize: 17,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    padding: 10,
    elevation: 4,
  },
  mainCard: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 7,
  },

  button: {
    backgroundColor: 'transparent',
    padding: 7,
    borderRadius: 5,
  },

  buttonText: {
    fontSize: 13,
    color: 'white',
  },

  button1: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1E293A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: colors.grayLight,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 60,
    right: 10,
    zIndex: 2,
    height: 100,
    width: 100,
  },
  dropdown: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  logoutButtonText: {
    fontSize: 16,
  },
});
