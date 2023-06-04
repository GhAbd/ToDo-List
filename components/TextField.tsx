import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {Colors} from '../Theme';

type TextFieldProps = {
  label: string;
  value: string;
  onChange:(value:string)=> void;
  multiline?: boolean;
};

const TextField = ({label, value, multiline=false, onChange}: TextFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.textInput} value={value} placeholder={label} onChangeText={onChange} multiline={multiline} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10
  },
  label: {
    fontSize: 16,
  },
  textInput: {
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: Colors.inputGray,
    color: Colors.black,
    marginTop:5,
    paddingVertical:5,
    paddingHorizontal:10,
  },
});


export default TextField;