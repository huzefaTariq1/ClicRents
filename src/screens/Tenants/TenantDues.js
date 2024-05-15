// import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import AppText from '../../components/AppText';
// import {useNavigation, useIsFocused} from '@react-navigation/native';
// import TopBar from '../../components/TopBar';
// import axiosInstance from '../../../axiosInstance';
// import Card from '../../components/Card';
// import GenericTable from '../../components/GenericTable';

// const columns = [
//   {
//     id: 'date',
//     label: 'CR-Date',
//     format:'date'
//   },
//   {
//       id:"activity",
//       label:'CR Activity'
//   },
//   {
//    id:'amountDeposit',
//    label:'CR Bank'
//   },
// ];

// const TenantDues = ({route}) => {
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();
//   const data1 = route.params;
//   const [data, setData] = useState([]);
//   const [searchString, setSearchString] = useState('');
//   const [pageNumber, setPageNumber] = useState(0);
//   const pageSize = 10;

//   console.log('inside dues', data);
//   const fetchData = async () => {
//     if (isFocused) {
//       try {
//         const response = await axiosInstance.get(
//           // `http://clicrentapi.mpact-soft.com/Tenant/GetAllTenantsWithPagination?pageNumber=${pageNumber}&pageSize=${pageSize}&status=${status}&sortDirection=0&sort=name&&searchString=${searchString}`
//        //   `http://clicrentapi.mpact-soft.com/Tenant/GetFundActivitiesWithPagination`,
//           // {
//           //   params: {
//           //     tenantId: 3,
//           //     searchString: searchString,
//           //     pageNumber: pageNumber,
//           //     pageSize: pageSize,
//           //   },
//           // },
//           `http://clicrentapi.mpact-soft.com/Tenant/GetFundActivitiesWithPagination?searchString=&pageNumber=0&sort=date&sortDirection=1&tenantId=3`
//         );
//         console.log('insgide lodinag');
//         setData(response.data.data);
//         console.log('dues data', response.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const handlePreviousPage = () => {
//     setPageNumber(prevPageNumber => prevPageNumber - 1);
//   };

//   const handleNextPage = () => {
//     setPageNumber(prevPageNumber => prevPageNumber + 1);
//   };

//   useEffect(() => {
//     fetchData(searchString, pageNumber, pageSize);
//   }, [isFocused, searchString, pageNumber]);
//   return (
//     <View>
//       <TopBar route="Home / Tenants /dues" />
//       <Text>TenantDues</Text>

//       <Card>
//       <GenericTable
//         columns={columns}
//         fetchData={fetchData}
//         data={data}
//         setData={setData}
//         searchString={searchString}
//         setSearchString={setSearchString}
//         pageNumber={pageNumber}
//         pageSize={pageSize}
//         handlePreviousPage={handlePreviousPage}
//         handleNextPage={handleNextPage}
//         onClick={"abc"}
//       />
//       </Card>

//       <TouchableOpacity onPress={() => navigation.navigate('abcde')}>
//         <AppText>go</AppText>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default TenantDues;

// const styles = StyleSheet.create({});

// working one
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
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../../../axiosInstance';
import { getTranslation } from '../../helpers/TranslationUtils';
import {API_URL,LOGIN_BASE_URL} from "@env"

const columns = [
  {
    id: 'date',
    label: 'CR Date',
    format: 'date',
  },
  {
    id: 'activity',
    label: 'CR-Activity',
  },

  {
    id: 'amountDeposit',
    label: 'CR-Bank',
  },
  {
    id: 'dueGenerated',
    label: 'CR-Due',
  },
];

const TenantDues = ({route}) => {
  const navigation = useNavigation();

  const data1 = route.params;
  console.log(data1);

  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPage] = useState('');

  const fetchData = async (searchString, pageNumber, pageSize) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${API_URL}/Tenant/GetFundActivitiesWithPagination`,
        {
          params: {
            tenantId: data1.id,
            searchString: searchString,
            pageNumber: pageNumber,
            pageSize: pageSize,
          },
        },
      );
      setLoading(false);
      setTotalPage(response.data.totalPages);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(searchString, pageNumber, pageSize);
  }, [searchString, pageNumber]);

  const handlePreviousPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber - 1);
  };

  const handleNextPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  const handleClick = () => {
    navigation.navigate(ROUTES.TENANT_DETAILS, data);
  };

  return (
      <SafeAreaView>

      <TopBar route={`${getTranslation("Home","Home","Home")} / ${getTranslation("Tenants","Tenants","Tenants")} / ${data1.name} / ${getTranslation("Dues","Dues","Dues")}`} />
      <ScrollView>
      <Card>
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
          Loading={loading}
          totalPages={totalPages}
        />
      </Card>
    </ScrollView>
      </SafeAreaView>
  );
};

export default TenantDues;

const styles = StyleSheet.create({
  rightBtn: {
    borderLeftColor: 'grey',
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
