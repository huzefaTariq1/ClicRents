/* eslint-disable prettier/prettier */
import axiosInstance from '../../axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL,LOGIN_BASE_URL} from "@env"

// Constants for API URLs
const Get_LanguageDictionary_URL = `${LOGIN_BASE_URL}/Language/GetLanguageDictionary`;
const Post_AddNewText_URL = `${LOGIN_BASE_URL}/Language/AddNewText`;

let dictionary = null;
let selectedLanguage='fr';
export  function getTranslation(text, defaultFrench, defaultGerman) {
  text = "CR-" + text;

  if (dictionary === null) {
    return text;
  }

  try {
    if (!dictionary[text]) {
      dictionary[text] = {
        en: text,
        fr: defaultFrench,
        gr: defaultGerman,
      };

      try {
        addLanguage({
          text: text,
          english: text,
          french: defaultFrench,
          german: defaultGerman,
        });
      } catch (error) {
        console.log("error",error)
      }
    } else if (!dictionary[text][selectedLanguage]) {
      return text;
    }

    return dictionary[text][selectedLanguage];
  } catch (error) {
    return text;
  }
}

export async function getLanguage() {
  try {
    const response = await axiosInstance.get(Get_LanguageDictionary_URL);
    
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function addUpdatedTranslation(translation){
  dictionary = translation;

}
export async function changeLanguage(lang)
  {
    selectedLanguage=lang
  }

export async function addLanguage(model) {
  try {
    const response = await axiosInstance.post(Post_AddNewText_URL, model);
    return response.data;
  } catch (error) {
    throw error;
  }
}