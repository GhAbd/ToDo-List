import React,{useContext} from 'react';
import {
  StyleSheet,
} from 'react-native';
import IconButton from './IconButton';
import { AppContext } from '../context/AppContext';

const AddButton = () => {
  const {showToDoForm} = useContext(AppContext);
  return (
    <IconButton name='add' style={styles.container} onPress={()=>showToDoForm()}/>
  )
};

const styles = StyleSheet.create({
  container:{
    position:'absolute',
    bottom:40,
    right:10,
  }
});


export default AddButton;