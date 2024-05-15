import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Card from '../../components/Card';
import AppForm from '../../components/AppForm';
import AppFormField from '../../components/AppFormField';
import SubmitButton from '../../components/SubmitButton';
import * as Yup from 'yup';
import AppText from '../../components/AppText';
import axiosInstance from '../../../axiosInstance';
import GenericTable from '../../components/GenericTable';
import TopBar from '../../components/TopBar';
import AppButton from '../../components/AppButton';
import { getTranslation } from '../../helpers/TranslationUtils';
import {API_URL,LOGIN_BASE_URL} from "@env"

const columns = [
  {
    id: 'name',
    label: getTranslation("Name","Name","Name"),
  },
  {
    id: 'totalApartments',
    label: getTranslation("Apartments","Apartments","Apartments"),
  },
  {
    id: 'rentPaid',
    label: getTranslation("Rent Paid","Rent Paid","Rent Paid"),
  },
];

const validationSchema = Yup.object().shape({
  subject: Yup.string().required().label('Subject'),
  address: Yup.string().required().min(15).label('Address'),
  town: Yup.string().required().label('Town'),
  zipCode: Yup.string().required().label('Zipcode'),
});

const AddBuilding = () => {
  const [crStatus, setCrStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleSwitch = () => setCrStatus(previousState => !previousState);

  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPage] = useState('');
  const [hasNext, setHasNext] = useState(true);
  const [sortDirection, setSortDirection] = useState(1); 
  const [sort,setSort]=useState(columns[0].id);
  const [handleSearchString,setHandleSerachString]=useState('')


  const fetchData = async (handleSearchString, pageNumber, pageSize,sortDirection,sort) => {
    try {
      console.log("Add Buildingss",API_URL)
      console.log("isisde api call",sortDirection)
      setLoading(true);
      const response = await axiosInstance.get(
        `${API_URL}/Building/GetAllBuildingsWithPagination?status=all&pageNumber=${pageNumber}&sort=${sort}&pageSize=${pageSize}&searchString=${handleSearchString}&sortDirection=${sortDirection}`,
      );
      setLoading(false);
      setTotalPage(response.data.totalPages);
      setHasNext(response.data.hasNext);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(handleSearchString, pageNumber, pageSize,sortDirection,sort);
  }, [handleSearchString, pageNumber,sortDirection]);

  const handlePreviousPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber - 1);
  };

  const handleNextPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  return (
      <SafeAreaView>

      <TopBar route={getTranslation("Home","Home","Home") + " / "+ getTranslation("Buildings","Buildings","Buildings") }/>
      <ScrollView>
      <Modal
        animationType="slide"
        onBackdropPress={() => setModalVisible(!modalVisible)}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AppForm
              initialValues={{subject: '', address: '', town: '', zipCode: ''}}
              onSubmit={values => console.log(values)}
              validationSchema={validationSchema}>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                name="subject"
                placeholder="Subject"
              />
              <AppFormField
                maxLength={255}
                multiline
                name="address"
                placeholder="Address"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                name="town"
                placeholder="Town"
              />

              <AppFormField
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                name="zipCode"
                placeholder="Zipcode"
              />

              <View style={{flexDirection: 'row'}}>
                <AppText style={{marginLeft: 10}}>Status</AppText>
                <Switch
                  trackColor={{false: '#767577', true: '#1BE009'}}
                  thumbColor={crStatus ? '#C4C4C4' : '#f4f3f4'}
                  onValueChange={toggleSwitch}
                  value={crStatus}
                />
              </View>

              <SubmitButton title="Cr-Add" />
            </AppForm>

            <AppButton title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <AppButton title="Add Building" onPress={() => setModalVisible(true)} />
       
      

      <Card>
      <AppText style={{paddingTop:10}}>{getTranslation("Buildings","Buildings","Buildings")}</AppText>
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
          onClick={'DetailBuilding'}
          Loading={loading}
          totalPages={totalPages}
          hasNext={hasNext}
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

export default AddBuilding;

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginHorizontal: 11,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});

