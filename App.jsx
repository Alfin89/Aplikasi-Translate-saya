import React, { useState } from 'react';
import {
  View,

  Text, TouchableOpacity, StyleSheet
} from 'react-native';

import { Input } from 'react-native-elements';

import ModalDropdown from 'react-native-modal-dropdown';

const languages = {
  "en-GB": "English",
  "es-ES": "Spanish",
  "fr-FR": "French",
  "de-DE": "German",
  "ja-JP": "Japanese",
  "ko-KR": "Korean",
  "id-ID": "Indonesian",
};


export default function LanguageTranslator() {

  const [fromText, setFromText] = useState('');

  const [toText, setToText] = useState('');

  const [fromLanguage, setFromLanguage] =

    useState('en-GB');

  const [toLanguage, setToLanguage] =

    useState('id-ID');


  const translate = () => {

    if (!fromText) {

      setToText('');

      return;

    }


    setToText('Translating...');


    const apiUrl =

      `https://api.mymemory.translated.net/get?q=

    ${fromText}&langpair=${fromLanguage}|${toLanguage}`;


    fetch(apiUrl)

      .then((res) => res.json())

      .then((data) => {

        setToText(data.responseData.translatedText);

        data.matches.forEach((data) => {

          if (data.id === 0) {

            setToText(data.translation);

          }

        });

      });

  };


  const exchangeLanguages = () => {

    const tempText = fromText;

    const tempLang = fromLanguage;


    setFromText(toText);

    setToText(tempText);

    setFromLanguage(toLanguage);

    setToLanguage(tempLang);

  };


  return (

    <View style={styles.container}>

      <View style={styles.wrapper}>

        <Input
          placeholder="Enter text"
          value={fromText}
          onChangeText={(text) =>
            setFromText(text)}
          inputContainerStyle=
          {styles.textInputContainer}
          multiline={true}
          numberOfLines={4}

        />

        <View style={styles.controls}>

          <ModalDropdown

            options={Object.values(languages)}

            defaultValue={languages[fromLanguage]}

            onSelect={(index, value) => {

              setFromLanguage(Object.keys(languages).find(key =>

                languages[key] === value));

            }}

            style={styles.picker}

          />

          <TouchableOpacity style={styles.exchangeButton}

            onPress={exchangeLanguages}>

            <Text style={styles.exchangeButtonText}>↔</Text>

          </TouchableOpacity>

          <ModalDropdown

            options={Object.values(languages)}

            defaultValue={languages[toLanguage]}

            onSelect={(index, value) => {

              setToLanguage(Object.keys(languages)

                .find(key => languages[key] === value));

            }}

            style={styles.picker}

          />

        </View>

        <Input
          placeholder="Terjemahkan"
          value={toText}
          inputContainerStyle=
          {styles.translationTextContainer}
          disabled
          multiline={true}
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={translate}>

          <Text style={styles.buttonText}>Terjemah dong</Text>

        </TouchableOpacity>

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#f0f0f0',

  },

  wrapper: {

    width: '90%',

    padding: 20,

    backgroundColor: 'white',

    borderRadius: 16,

    shadowColor: '#000',

    shadowOffset: { width: 0, height: 2 },

    shadowOpacity: 0.2,

    shadowRadius: 4,

    elevation: 5,

  },

  controls: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 10,

  },

  picker: {

    height: 40,

    backgroundColor: '#f9f9f9',

    padding: 10,

    flex: 1,

    borderRadius: 8,

  },

  exchangeButton: {

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#0984e3',

    width: 40,

    height: 40,

    borderRadius: 20,

  },

  exchangeButtonText: {

    color: 'white',

    fontSize: 20,

  },

  button: {

    backgroundColor: '#0984e3',

    borderRadius: 8,

    height: 40,

    alignItems: 'center',

    justifyContent: 'center',

  },

  buttonText: {

    fontSize: 18,

    color: 'white',

  },

});