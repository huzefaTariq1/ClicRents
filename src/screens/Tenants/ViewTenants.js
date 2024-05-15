import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopBar from '../../components/TopBar';
import Card from '../../components/Card';
import GenericTable from '../../components/GenericTable';

import AppText from '../../components/AppText';
import {ROUTES} from '../../constants';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import axiosInstance from '../../../axiosInstance';
import {getTranslation} from '../../helpers/TranslationUtils';
import {API_URL, LOGIN_BASE_URL} from '@env';
import AppButton from '../../components/AppButton';

const columns = [
  {
    id: 'name',
    label: getTranslation('Name', 'Name', 'Name'),
  },
  {
    id: 'apartmentNo',
    label: getTranslation('Apartment', 'Apartment', 'Apartment'),
  },
  {
    id: 'accountBalance',
    label: getTranslation('Balance', 'Balance', 'Balance'),
  },
  {
    id: 'lastPaymentDate',
    label: getTranslation('LastPayment', 'LastPayment', 'LastPayment'),
    format: 'date',
  },
  {
    id: 'bankAction',
    label: getTranslation('Action', 'Action', 'Action'),
  },
];

const ViewTenants = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;
  const [status, setStatus] = useState('active');
  const [selectedButton, setSelectedButton] = useState('active');
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPage] = useState('');
  const [sortDirection, setSortDirection] = useState(1);
  const [sort, setSort] = useState(columns[0].id);
  const [handleSearchString, setHandleSerachString] = useState('');

  const fetchData = async (
    handleSearchString,
    pageNumber,
    pageSize,
    sortDirection,
    sort,
  ) => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        //`https://clicrentapi.nativesystemsltd.com/Tenant/GetAllTenantsWithPagination?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}&sortDirection=0&sort=name&&searchString=${searchString}`,
        `${API_URL}/Tenant/GetAllTenantsWithPagination?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}&sort=${sort}&searchString=${handleSearchString}&sortDirection=${sortDirection}`,
      );
      setLoading(false);
      setTotalPage(response.data.totalPages);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(handleSearchString, pageNumber, pageSize, sortDirection, sort);
  }, [handleSearchString, pageNumber, status, isFocused, sortDirection, sort]);

  const handlePreviousPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber - 1);
  };

  const handleNextPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  const handleButtonClick = statusValue => {
    setStatus(statusValue);
    setSelectedButton(statusValue);
  };

  const handleClick = () => {
    navigation.navigate(ROUTES.TENANT_DETAILS, data);
  };

  return (
    <SafeAreaView>
      <TopBar
        route={
          getTranslation('Home', 'Home', 'Home') +
          ' / ' +
          getTranslation('Tenants', 'Tenants', 'Tenants')
        }
      />
      <ScrollView height={600}>
        <Card>
          <AppText style={styles.headingText}>
            {getTranslation('Tenants', 'Tenants', 'Tenants')}
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={[
                styles.leftBtn,
                selectedButton === 'active' && styles.selectedBtn,
              ]}
              onPress={() => handleButtonClick('active')}>
              <AppText
                style={selectedButton === 'active' && styles.selectedText}>
                {getTranslation('Active', 'Active', 'Active')}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.rightBtn,
                selectedButton === 'inactive' && styles.selectedBtn,
              ]}
              onPress={() => handleButtonClick('inactive')}>
              <AppText
                style={selectedButton === 'inactive' && styles.selectedText}>
                {getTranslation('InActive', 'InActive', 'InActive')}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.rightBtn,
                selectedButton === 'onhold' && styles.selectedBtn,
              ]}
              onPress={() => handleButtonClick('onhold')}>
              <AppText
                style={selectedButton === 'onhold' && styles.selectedText}>
                {getTranslation('Reserved', 'Reserved', 'Reserved')}
              </AppText>
            </TouchableOpacity>
          </View>

          <AppButton
            title="Add Tenant"
            onPress={() => navigation.navigate(ROUTES.ADD_TENANT)}
          />

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
            onClick={ROUTES.TENANT_DETAILS}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewTenants;

const styles = StyleSheet.create({
  headingText: {color: 'black', fontSize: 17, fontWeight: '600'},
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
