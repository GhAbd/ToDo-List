import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Colors} from '../Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

type IconButtonProps = {
  name: string;
  onPress:()=> void;
  style:{},
};

const IconButton = ({name, onPress, style}: IconButtonProps) => {

  return (
    <TouchableOpacity style={[styles.container,style]} onPress={onPress} activeOpacity={0.5}>
      <Icon name={name} size={30} color={Colors.white} />
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:Colors.buttonBlue,
    marginHorizontal:5,
    width:60,
    height:60,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30,
  }
});


export default IconButton;