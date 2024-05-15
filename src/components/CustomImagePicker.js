import { StyleSheet, Text, View,TouchableOpacity,Alert,Image } from 'react-native'
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import React,{useState} from 'react'
import colors from '../constants/colors';
import { PlusIcon } from './Icons';
import AppText from './AppText';
import { getTranslation } from '../helpers/TranslationUtils';

const CustomImagePicker = ({imageUrl, onChangeImage,title}) => {
   
   // const [imageUrl, setImageUrl] = useState('');
    const handlePress=()=>{
        if (!imageUrl) {
            Alert.alert('Upload Image', 'Upload your image from?', [
              { text: 'gallery', onPress: () => takephoto() },
              { text: 'Camera', onPress: () => cameraPhoto() },
              { text: 'cancel' },
            ]);
            console.log('tapped');
          } else
            Alert.alert('Delete', 'Are you sure you want to delete this image?', [
              { text: 'Yes', onPress: () => deleteImage() },
              { text: 'No' },
            ]);
    }

    const takephoto=async()=>{
        console.log("workihhh")
    const galleryPermission = await checkGalleryPermission();

    if (galleryPermission === RESULTS.GRANTED || galleryPermission === RESULTS.LIMITED) {
      openImagePicker();
    } else if (galleryPermission === RESULTS.DENIED) {
      showPermissionAlert();
    } else {
      requestGalleryPermission();
    }
    }

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
            { text: 'Cancel' },
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
    


    const cameraPhoto=()=>{
        console.log("camera")
    }




    const deleteImage=()=>{
       // setImageUrl("")
       onChangeImage(null)
    }





    // const handlefront = async image => {
    //     try {
    //       console.log('image in handle', image);
    //       const formData = new FormData();
    //       // formData.append("name","asghar")
    //       formData.append('formFile', {
    //         uri: image.path,
    //         type: image.mime,
    //         name: 'filename.jpg',
    //       });
    //       setLoading2(true)
    //       // console.log("formdataaa",formData.get("formFile"));
    //       const response = await uploadFormData(formData, onUploadProgress);
    //       setImageUrl(image.path);
    //       updatedData = { ...updatedData, frontIdCardSide: response };
    
    //       console.log('resposne datataaa in front', response);
    //       console.log('updated data in front side', updatedData);
    //       const appLoginResponse = await axiosInstance.post(
    //         `${API_URL}/Tenant/UpdateTenant`,
    //         updatedData,
    //       );
    //       setData(updatedData);
    //       setLoading2(false)
    //       //handleUpdateTenant()
    //       // console.log(' after updated data',updatedData)
    //     } catch (error) {
    //       console.log('image error', error);
    //       setLoading2(false)
    //       Alert.alert(
    //         'Error',
    //         'Something went wrong. Please try again.',
    //         [
    //           {
    //             text: 'OK',
    //           },
    //         ],
    //         { cancelable: false }
    //       );
    //     }
    //   };


    const handlefront=(image)=>{
        //setImageUrl(image.path);
        onChangeImage(image.path)
    }

    
  return (
   <>
              <TouchableOpacity onPress={handlePress}>
              {/* {loading2 && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#1E293A" />
                  <Text>{`Upload Progress: ${uploadProgress}%`}</Text>
                </View>
              )} */}
              <View style={styles.container1}>
                {!imageUrl && <PlusIcon />}
                {!imageUrl && (
                  <View>
                    <AppText>{getTranslation("Upload", "Upload", "Upload")}</AppText>
                    <AppText>{getTranslation(title, title, title)}</AppText>
                  </View>
                )}
                {imageUrl && (
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                )}
              </View>
            </TouchableOpacity>
   </>
  )
}

export default CustomImagePicker

const styles = StyleSheet.create({
    box: {
        borderWidth: 2,
        borderColor: 'grey',
        paddingVertical: 10,
        paddingLeft: 6,
        borderRadius: 7,
      },
      label: { paddingLeft: 6, color: 'grey' },
      containerBox: { marginVertical: 5 },
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
})