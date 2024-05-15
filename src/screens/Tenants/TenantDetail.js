/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Switch,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';

import {useNavigation, useIsFocused} from '@react-navigation/native';
import TopBar from '../../components/TopBar';
import Card from '../../components/Card';
import AppText from '../../components/AppText';
import {ROUTES} from '../../constants';
import axiosInstance from '../../../axiosInstance';
import ImagePicker from 'react-native-image-crop-picker';
import {PlusIcon} from '../../components/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {uploadFormData} from '../../../axiosInstance';
import AppButton from '../../components/AppButton';
import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';
import {FileIcon} from '../../components/Icons';
import {FileIcon2} from '../../components/Icons';
import {Menuicon} from '../../components/Icons';
import colors from '../../constants/colors';
import {User} from '../../components/Icons';
import {InfoIcon} from '../../components/Icons';
import {API_URL, LOGIN_BASE_URL} from '@env';
import {getTranslation} from '../../helpers/TranslationUtils';

const TenantDetail = ({route}) => {
  const [data, setData] = useState();
  const [selectedButton, setSelectedButton] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const {token, userData} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const {firstName, lastName} = userData;
  const firstLetterOfFirstName = firstName ? firstName.charAt(0) : '';
  const firstLetterOfLastName = lastName ? lastName.charAt(0) : '';

  console.log('ststus checking', data);

  const pro = route.params;

  let updatedData = {...data};
  let updateDataBack = {...data};

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const {customerId, backIdCard, frontIdCard} = useSelector(
    state => state.user,
  );
  console.log(
    'checinh inteneta deatil reduxe',
    customerId,
    backIdCard,
    frontIdCard,
  );

  const [imageUrl, setImageUrl] = useState('');
  const [backImage, setBackImage] = useState('');

  const cameraPhoto = async () => {
    const cameraPermission = await checkCameraPermission();

    if (
      cameraPermission === RESULTS.GRANTED ||
      cameraPermission === RESULTS.LIMITED
    ) {
      openCameraPicker();
    } else if (cameraPermission === RESULTS.DENIED) {
      showCameraPermissionAlert();
    } else {
      requestCameraPermission();
    }
  };

  const checkCameraPermission = async () => {
    const permissionType = getCameraPermissionType();

    return check(permissionType);
  };

  const openCameraPicker = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      handlefront(image);
    });
  };

  const requestCameraPermission = async () => {
    const permissionType = getCameraPermissionType();

    try {
      const result = await request(permissionType);
      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        openCameraPicker();
      } else if (result === RESULTS.DENIED) {
        showCameraPermissionDeniedAlert();
      } else if (result === RESULTS.BLOCKED) {
        showCameraPermissionBlockedAlert();
      }
    } catch (error) {
      console.log('Permission request error:', error);
    }
  };

  const showCameraPermissionAlert = () => {
    Alert.alert(
      'Permission Required',
      'Please grant camera permission to use this feature.',
      [
        {
          text: 'Open Settings',
          onPress: () => requestCameraPermission(),
        },
        {text: 'Cancel'},
      ],
    );
  };

  const showCameraPermissionDeniedAlert = () => {
    Alert.alert(
      'Permission Required',
      'Camera permission is required to use this feature.',
    );
  };

  const showCameraPermissionBlockedAlert = () => {
    Alert.alert(
      'Permission Required',
      'Camera permission is required. Please enable it from the app settings.',
    );
  };

  const getCameraPermissionType = () => {
    return Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });
  };

  const cameraPhoto1 = async () => {
    const cameraPermission = await checkCameraPermission1();

    if (
      cameraPermission === RESULTS.GRANTED ||
      cameraPermission === RESULTS.LIMITED
    ) {
      openCameraPicker1();
    } else if (cameraPermission === RESULTS.DENIED) {
      showCameraPermissionAlert1();
    } else {
      requestCameraPermission1();
    }
  };

  const checkCameraPermission1 = async () => {
    const permissionType = getCameraPermissionType1();

    return check(permissionType);
  };

  const openCameraPicker1 = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      handle(image);
    });
  };

  const requestCameraPermission1 = async () => {
    const permissionType = getCameraPermissionType1();

    try {
      const result = await request(permissionType);
      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        openCameraPicker1();
      } else if (result === RESULTS.DENIED) {
        showCameraPermissionDeniedAlert1();
      } else if (result === RESULTS.BLOCKED) {
        showCameraPermissionBlockedAlert1();
      }
    } catch (error) {
      console.log('Permission request error:', error);
    }
  };

  const showCameraPermissionAlert1 = () => {
    Alert.alert(
      'Permission Required',
      'Please grant camera permission to use this feature.',
      [
        {
          text: 'Open Settings',
          onPress: () => requestCameraPermission1(),
        },
        {text: 'Cancel'},
      ],
    );
  };

  const showCameraPermissionDeniedAlert1 = () => {
    Alert.alert(
      'Permission Required',
      'Camera permission is required to use this feature.',
    );
  };

  const showCameraPermissionBlockedAlert1 = () => {
    Alert.alert(
      'Permission Required',
      'Camera permission is required. Please enable it from the app settings.',
    );
  };

  const getCameraPermissionType1 = () => {
    return Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });
  };

  const handlePress = () => {
    if (!imageUrl) {
      Alert.alert('Upload Image', 'Upload your image from?', [
        {text: 'gallery', onPress: () => takephoto()},
        {text: 'Camera', onPress: () => cameraPhoto()},
        {text: 'cancel'},
      ]);
      console.log('tapped');
    } else
      Alert.alert('Delete', 'Are you sure you want to delete this image?', [
        {text: 'Yes', onPress: () => DeleteFrontImage()},
        {text: 'No'},
      ]);
  };

  const handlePress1 = () => {
    if (!backImage) {
      Alert.alert('Upload Image', 'Upload your image from?', [
        {text: 'gallery', onPress: () => takephoto1()},
        {text: 'Camera', onPress: () => cameraPhoto1()},
        {text: 'cancel'},
      ]);
      // takephoto1();
      // console.log('tapped');
    } else
      Alert.alert('Delete', 'Are you sure you want to delete this image?', [
        {text: 'Yes', onPress: () => DeleteBackImage()},
        {text: 'No'},
      ]);
  };

  const takephoto = async () => {
    console.log('workihhh');
    const galleryPermission = await checkGalleryPermission();

    if (
      galleryPermission === RESULTS.GRANTED ||
      galleryPermission === RESULTS.LIMITED
    ) {
      openImagePicker();
    } else if (galleryPermission === RESULTS.DENIED) {
      showPermissionAlert();
    } else {
      requestGalleryPermission();
    }
  };

  const checkGalleryPermission = async () => {
    const permissionType = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    });

    return check(permissionType);
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      handlefront(image);
    });
  };

  const requestGalleryPermission = async () => {
    const permissionType = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    });

    try {
      const result = await request(permissionType);
      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        openImagePicker();
      } else if (result === RESULTS.DENIED) {
        showPermissionDeniedAlert();
      } else if (result === RESULTS.BLOCKED) {
        showPermissionBlockedAlert();
      }
    } catch (error) {
      console.log('Permission request error:', error);
    }
  };

  const showPermissionAlert = () => {
    Alert.alert(
      'Permission Required',
      'Please grant gallery permission to access photos.',
      [
        {
          text: 'Open Settings',
          onPress: () => requestGalleryPermission(),
        },
        {text: 'Cancel'},
      ],
    );
  };

  const showPermissionDeniedAlert = () => {
    Alert.alert(
      'Permission Required',
      'Gallery permission is required to use this feature.',
    );
  };

  const showPermissionBlockedAlert = () => {
    Alert.alert(
      'Permission Required',
      'Gallery permission is required. Please enable it from the app settings.',
    );
  };

  const onUploadProgress = progressEvent => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total,
    );
    console.log(`Upload progress: ${percentCompleted}%`);
    setUploadProgress(percentCompleted);
  };

  const handlefront = async image => {
    try {
      console.log('image in handle', image);
      const formData = new FormData();
      // formData.append("name","asghar")
      formData.append('formFile', {
        uri: image.path,
        type: image.mime,
        name: 'filename.jpg',
      });
      setLoading2(true);
      // console.log("formdataaa",formData.get("formFile"));
      const response = await uploadFormData(formData, onUploadProgress);
      setImageUrl(image.path);
      updatedData = {...updatedData, frontIdCardSide: response};

      console.log('resposne datataaa in front', response);
      console.log('updated data in front side', updatedData);
      const appLoginResponse = await axiosInstance.post(
        `${API_URL}/Tenant/UpdateTenant`,
        updatedData,
      );
      setData(updatedData);
      setLoading2(false);
      //handleUpdateTenant()
      // console.log(' after updated data',updatedData)
    } catch (error) {
      console.log('image error', error);
      setLoading2(false);
      Alert.alert(
        'Error',
        'Something went wrong. Please try again.',
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
    }
  };

  const takephoto1 = async () => {
    console.log('workihhh');
    const galleryPermission = await checkGalleryPermission1();

    if (
      galleryPermission === RESULTS.GRANTED ||
      galleryPermission === RESULTS.LIMITED
    ) {
      openImagePicker1();
    } else if (galleryPermission === RESULTS.DENIED) {
      showPermissionAlert1();
    } else {
      requestGalleryPermission1();
    }
  };

  const checkGalleryPermission1 = async () => {
    const permissionType = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    });

    return check(permissionType);
  };

  const openImagePicker1 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      handle(image);
    });
  };

  const requestGalleryPermission1 = async () => {
    const permissionType = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    });

    try {
      const result = await request(permissionType);
      if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
        openImagePicker1();
      } else if (result === RESULTS.DENIED) {
        showPermissionDeniedAlert1();
      } else if (result === RESULTS.BLOCKED) {
        showPermissionBlockedAlert1();
      }
    } catch (error) {
      console.log('Permission request error:', error);
    }
  };

  const showPermissionAlert1 = () => {
    Alert.alert(
      'Permission Required',
      'Please grant gallery permission to access photos.',
      [
        {
          text: 'Open Settings',
          onPress: () => requestGalleryPermission1(),
        },
        {text: 'Cancel'},
      ],
    );
  };

  const showPermissionDeniedAlert1 = () => {
    Alert.alert(
      'Permission Required',
      'Gallery permission is required to use this feature.',
    );
  };

  const showPermissionBlockedAlert1 = () => {
    Alert.alert(
      'Permission Required',
      'Gallery permission is required. Please enable it from the app settings.',
    );
  };

  const handle = async image => {
    try {
      console.log('image in handle', image);
      const formData = new FormData();
      // formData.append("name","asghar")
      formData.append('formFile', {
        uri: image.path,
        type: image.mime,
        name: 'filename.jpg',
      });
      setLoading1(true);
      // console.log("formdataaa",formData.get("formFile"));
      const response = await uploadFormData(formData, onUploadProgress);
      setBackImage(image.path);
      updatedData = {...updatedData, backIdCardSide: response};
      console.log('updated data in back side', updatedData);

      const appLoginResponse = await axiosInstance.post(
        `${API_URL}/Tenant/UpdateTenant`,
        updatedData,
      );
      setData(updatedData);
      setLoading1(false);

      // handleUpdateTenant()
      console.log(' after updated data in gandling', updatedData);
      console.log('resposne datataaa in back ', response);
    } catch (error) {
      console.log('image error', error);
      setLoading1(false);
      Alert.alert(
        'Error',
        'Something went wrong. Please try again.',
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
    }
  };

  const handleUpdateTenant = async () => {
    try {
      console.log('updated insoide updatedddd', updatedData);
      // const appLoginResponse = await axiosInstance.post(
      //   ${API_URL}/Tenant/UpdateTenant`,
      //   updatedData,
      // );
    } catch (error) {
      console.log('updated teneat error', error);
    }
  };

  const DeleteBackImage = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_URL}/FileManager/DeleteFile`,
        {
          params: {
            fileName: backIdCard,
          },
        },
      );
      const response1 = await axiosInstance.get(
        `${API_URL}/FileManager/DeleteFileinfo`,
        {
          params: {
            id: data.id,
            type: 'backIdCardSide',
          },
        },
      );
    } catch (error) {
      console.log('image deleting error', error);
    }

    setBackImage(null);
    dispatch({type: 'setBackId', payload: ''});

    console.log('deleting image', backIdCard);
  };

  const handleClick = () => {
    console.log(Platform.OS);
  };

  const DeleteFrontImage = async () => {
    try {
      console.log('deleting one');
      const response = await axiosInstance.get(
        `${API_URL}/FileManager/DeleteFile`,
        {
          params: {
            fileName: frontIdCard,
          },
        },
      );
      const response1 = await axiosInstance.get(
        `${API_URL}/FileManager/DeleteFileinfo`,
        {
          params: {
            id: data.id,
            type: 'frontIdCardSide',
          },
        },
      );

      setImageUrl(null);
      dispatch({type: 'setFrontId', payload: ''});
    } catch (error) {
      console.log('image deleting error', error);
    }

    console.log('deleting image', backIdCard);
  };

  const imgeurl = `${API_URL}/FileManager/Get?fileName=5034af18-a8c3-4a34-3c0f-08db5dbb908a&customerId=CR_BWLTW_1276`;

  useEffect(() => {
    fetchData();
  }, [data?.frontIdCardSide, data?.backIdCardSide, isFocused]);
  const fetchData = async () => {
    try {
      const tenat = await axiosInstance.get(
        `${API_URL}/Tenant/GetTenant`,

        {
          params: {
            tenantId: pro.id,
          },
        },
      );

      setData(tenat.data);

      if (data?.frontIdCardSide) {
        const response = await axiosInstance.get(
          `${API_URL}/FileManager/GetFileInfo`,

          {
            params: {
              fileName: data.frontIdCardSide,
              customerId: customerId,
            },
          },
        );
        console.log('hellllllllooooooo wooorrrld', response.data);

        const {fileAddress} = response.data;
        dispatch({type: 'setFrontId', payload: fileAddress});

        setImageUrl(
          `${API_URL}/FileManager/Get?fileName=${fileAddress}&customerId=${customerId}`,
        );
      }

      if (data?.backIdCardSide) {
        console.log('inside backinggg');
        const response = await axiosInstance.get(
          `${API_URL}/FileManager/GetFileInfo`,

          {
            params: {
              fileName: data.backIdCardSide,
              customerId: customerId,
            },
          },
        );
        console.log('hellllllllooooooo wooorrrld', response.data);

        const {fileAddress} = response.data;
        dispatch({type: 'setBackId', payload: fileAddress});

        setBackImage(
          `${API_URL}/FileManager/Get?fileName=${fileAddress}&customerId=${customerId}`,
        );
        console.log('backimage', backImage);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };
  console.log('outside back image checking', backImage);

  const handleButtonPress = buttonNumber => {
    setSelectedButton(buttonNumber);
  };

  const handlePress11 = () => {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Menuicon />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButton === 1 && styles.selectedButton]}
          onPress={() => handleButtonPress(1)}>
          <User />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedButton === 2 && styles.selectedButton]}
          onPress={() => navigation.navigate(ROUTES.TENANT_DUES, data)}>
          <InfoIcon />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1} onPress={handlePress11}>
          <Text
            style={
              styles.buttonText
            }>{`${firstLetterOfFirstName} ${firstLetterOfLastName}`}</Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal: 10}}>
        <View style={styles.card}>
          <Text style={styles.text}>{`${getTranslation(
            'Home',
            'Home',
            'Home',
          )} \ ${getTranslation('Tenant', 'Tenant', 'Tenant')} \ ${
            data?.firstName
          } `}</Text>
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

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Card>
          <AppText style={{fontWeight: '700'}}>
            {getTranslation(
              'Tenant Basic Detail',
              'Tenant Basic Detail',
              'Tenant Basic Detail',
            )}
          </AppText>

          <View style={{marginVertical: 10}}>
            <AppText style={{paddingLeft: 6, color: 'grey'}}>
              {getTranslation('First Name', 'First Name', 'First Name')}
            </AppText>
            <AppText
              style={{
                borderWidth: 2,
                borderColor: 'grey',
                paddingVertical: 10,
                paddingLeft: 6,
                borderRadius: 7,
              }}>
              {data?.firstName}
            </AppText>
          </View>

          <View style={styles.containerBox}>
            <AppText style={styles.label}>
              {getTranslation('Last Name', 'Last Name', 'Last Name')}
            </AppText>
            <AppText style={styles.box}>{data?.lastName}</AppText>
          </View>

          <View style={styles.containerBox}>
            <AppText style={styles.label}>
              {getTranslation('Id Card', 'Id Card', 'Id Card')}
            </AppText>
            <AppText style={styles.box}>{data?.idCard}</AppText>
          </View>

          <View style={styles.containerBox}>
            <AppText style={styles.label}>
              {getTranslation('Phone', 'Phone', 'Phone')}
            </AppText>
            <AppText style={styles.box}>{data?.telephone}</AppText>
          </View>

          <View style={styles.containerBox}>
            <AppText style={styles.label}>
              {getTranslation('Email', 'Email', 'Email')}
            </AppText>
            <AppText style={styles.box}>{data?.email}</AppText>
          </View>

          <View style={styles.containerBox}>
            <AppText style={styles.label}>
              {getTranslation('Building', 'Building', 'Building')}
            </AppText>
            <AppText style={styles.box}>{data?.buildingName}</AppText>
          </View>

          <View style={styles.containerBox}>
            <AppText style={styles.label}>
              {getTranslation('Rent Due', 'Rent Due', 'Rent Due')}
            </AppText>
            <AppText style={styles.box}>{data?.rentDueDay}</AppText>
          </View>

          <View style={styles.containerBox}>
            <AppText style={styles.label}>
              {getTranslation(
                'Send Reminder By',
                'Send Reminder By',
                'Send Reminder By',
              )}
            </AppText>
            <AppText style={styles.box}>{data?.email}</AppText>
          </View>

          <View style={styles.toggleBtn}>
            <AppText>{getTranslation('Status', 'Status', 'Status')}</AppText>
            <Switch
              value={data?.contracts?.length > 0}
              disabled
              trackColor={{false: 'gray', true: '#1BE009'}}
              thumbColor={'#C4C4C4'}
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={handlePress}>
              {loading2 && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#1E293A" />
                  <Text>{`Upload Progress: ${uploadProgress}%`}</Text>
                </View>
              )}
              <View style={styles.container1}>
                {!imageUrl && <PlusIcon />}
                {!imageUrl && (
                  <View>
                    <AppText>
                      {getTranslation('Upload', 'Upload', 'Upload')}
                    </AppText>
                    <AppText>
                      {getTranslation('Front', 'Front', 'Front')}
                    </AppText>
                  </View>
                )}
                {imageUrl && (
                  <Image
                    source={{uri: imageUrl}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePress1}>
              {loading1 && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#1E293A" />
                  <Text>{`Upload Progress: ${uploadProgress}%`}</Text>
                </View>
              )}
              <View style={styles.container1}>
                {!backImage && <PlusIcon />}
                {!backImage && (
                  <View>
                    <AppText>
                      {getTranslation('Upload', 'Upload', 'Upload')}
                    </AppText>
                    <AppText>{getTranslation('Back', 'Back', 'Back')}</AppText>
                  </View>
                )}
                {backImage && (
                  <Image
                    source={{uri: backImage}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TenantDetail;

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: 'grey',
    paddingVertical: 10,
    paddingLeft: 6,
    borderRadius: 7,
  },
  label: {paddingLeft: 6, color: 'grey'},
  containerBox: {marginVertical: 5},
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 10, // Adjust as needed to provide space above the button
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    paddingVertical: 7,
  },
  toggleBtn: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  abc: {
    backgroundColor: 'black',
    padding: 7,
    borderRadius: 5,
  },
  container1: {
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 15,
    height: 110,
    justifyContent: 'space-evenly',
    marginVertical: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    width: 150,
  },
  image: {
    height: '100%',
    width: '100%',
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
  button: {
    backgroundColor: 'transparent',
    padding: 7,
    borderRadius: 5,
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
  buttonText: {
    fontSize: 13,
    color: 'white',
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

  card: {
    backgroundColor: '#1E293A',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    color: '#FFFFFF',
    paddingLeft: 10,
    fontSize: 17,
  },
});
