import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopBar from '../../components/TopBar';
import AppText from '../../components/AppText';
import Card from '../../components/Card';
import GenericTable from '../../components/GenericTable';
import axiosInstance from '../../../axiosInstance';
import { getTranslation } from '../../helpers/TranslationUtils';
import {API_URL,LOGIN_BASE_URL} from "@env"

const columns = [
  {
    id: 'apartmentNo',
    label: getTranslation("Appartment No","Appartment No","Appartment No"),
  },
  {
    id: 'amount',
    label: getTranslation("Rent","Rent","Rent"),
  },
];

const columns1 = [
  {
    id: 'Cr-Date',
    label: getTranslation("Date","Date","Date"),
  },
  {
    id: 'CR-Supplier',
    label: getTranslation("Supplier","Supplier","Supplier"),
  },
  {
    id: 'CR-Expense',
    label: getTranslation("Expenses","Expenses","Expenses"),
  },
];

const DetailBuilding = ({route}) => {
  const detail = route.params;
  const {id} = detail;
  console.log('alo lelele', id);

  useEffect(() => {
    fetchData();
  }, []);

  const [searchString, setSearchString] = useState('');

  const [apartmentData, setApartmentData] = useState([]);
  const [summry, setSummry] = useState();
  const [sortDirection, setSortDirection] = useState(1); 
  const [sort,setSort]=useState(columns[0].id);
  const [handleSearchString,setHandleSerachString]=useState('')

  const abcd = [];

  const fetchData = async () => {
    try {
     console.log("detail",API_URL)
      const response = await axiosInstance.get(
        `${API_URL}/Apartment/GetAllAppartmentsWithPagination?buildingId=${id}&searchString=&pageNumber=0&pageSize=10`,
      );
      setApartmentData(response.data.data);
      const response1 = await axiosInstance.get(
        `${API_URL}/Building/GetBuldingSummary?buildingId=${id}`,
      );
      setSummry(response1.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedButton, setSelectedButton] = useState('Apartment');

  console.log('atartment data', apartmentData);

  const handleButtonPress = button => {
    setSelectedButton(button);
  };

  return (
     <SafeAreaView >

      <TopBar route={getTranslation("Home","Home","Home") + " / "+ getTranslation("Buildings","Buildings","Buildings") + " / " + getTranslation("Apartments","Apartments","Apartments")}/>
      <ScrollView>
      <Card>
        <AppText style={styles.headingText}>{getTranslation("Building Information","Building Information","Building Information")}</AppText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <View style={{width: '30%'}}>
            <AppText style={styles.greyText}>{getTranslation("Name","Name","Name")}</AppText>
          </View>
          <View style={{width: '40%'}}>
            <AppText style={styles.greyText}>{getTranslation("Address","Address","Address")}</AppText>
          </View>
          <View style={{width: '30%'}}>
            <AppText style={styles.greyText}>{getTranslation("Town","Town","Town")}</AppText>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
          }}>
          <View style={{width: '30%'}}>
            <AppText style={{textAlign: 'center'}}>{detail?.name}</AppText>
          </View>

          <View style={{width: '40%'}}>
            <AppText style={{textAlign: 'center'}}>{detail?.address}</AppText>
          </View>

          <View style={{width: '30%'}}>
            <AppText style={{textAlign: 'center'}}>{detail?.town}</AppText>
          </View>
        </View>
      </Card>

      <Card>
        <AppText style={styles.headingText}>{getTranslation("Summary","Summary","Summary")}</AppText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText style={styles.greyText}>{getTranslation("Rent Generated","Rent Generated","Rent Generated")}</AppText>
          <AppText style={styles.greyText}>{getTranslation("Rent Paid","Rent Paid","Rent Paid")}</AppText>
          <AppText style={styles.greyText}>{getTranslation("Unpaid","Unpaid","Unpaid")}</AppText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <AppText>{summry?.rentGenerated.toFixed(2)}</AppText>
          <AppText>{summry?.rentPaid}</AppText>
          <AppText>{summry?.unpaid.toFixed(2)}</AppText>
        </View>
      </Card>

      <Card>
        <AppText style={styles.headingText}>{getTranslation("Appartments","Appartments","Appartments")}</AppText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <TouchableOpacity
            style={[
              styles.leftBtn,
              selectedButton === 'Apartment' && styles.selectedBtn,
            ]}
            onPress={() => handleButtonPress('Apartment')}>
            <AppText
              style={selectedButton === 'Apartment' && styles.selectedText}>
              {getTranslation("Apartment","Apartment","Apartment")}
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.rightBtn,
              selectedButton === 'Cost' && styles.selectedBtn,
            ]}
            onPress={() => handleButtonPress('Cost')}>
            <AppText style={selectedButton === 'Cost' && styles.selectedText}>
            {getTranslation("Cost","Cost","Cost")}
            </AppText>
          </TouchableOpacity>
        </View>

        {selectedButton === 'Apartment' ? (
          <GenericTable
            columns={columns}
            fetchData={fetchData}
            data={apartmentData}
            setData={setApartmentData}
            searchString={searchString}
            setSearchString={setSearchString}
          />
        ) : (
          <GenericTable
            columns={columns1}
            fetchData={fetchData}
            data={abcd}
            setData={setApartmentData}
            searchString={searchString}
            setSearchString={setSearchString}
          />
        )}
      </Card>
    </ScrollView>
     </SafeAreaView>
  );
};

export default DetailBuilding;

const styles = StyleSheet.create({
  headingText: {color: 'black', fontSize: 17, fontWeight: '600'},
  greyText: {
    color: "#5A5A5A",
    textAlign: 'center',
    fontWeight:"700",
    fontSize:"13"
    
  },
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
