/* eslint-disable prettier/prettier */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL, LOGIN_BASE_URL} from "@env"


const instance = axios.create();

instance.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken1 = await AsyncStorage.getItem('refreshToken');
    const customerId = await AsyncStorage.getItem('customerId');

    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const tokenExpiration = dayjs(decodedToken.exp * 1000);

      if (dayjs().isAfter(tokenExpiration)) {
        try {
          const refreshResponse = await axios.post(
            `${LOGIN_BASE_URL}/Auth/RefreshToken`,
            {
              refreshToken: refreshToken1,
              customerId: customerId,
            },
          );

          const { accessToken, refreshToken, refreshTokenExpire } =
            refreshResponse.data;

          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('refreshToken', refreshToken);
          await AsyncStorage.setItem('refreshTokenExpire', refreshTokenExpire);

          config.headers.Authorization = `Bearer ${accessToken}`;
          config.headers.Customerid = customerId;
        } catch (error) {
          console.error('Token refresh error:', error);
        }
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers.Customerid = customerId;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const uploadFormData = async (formData, onUploadProgress) => {
  try {
    const response = await instance.post(
      `${API_URL}/FileManager/Upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress, // Pass the onUploadProgress callback to axios
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Multipart form data upload error:', error);
    throw error;
  }
};

export default instance;
export { uploadFormData };