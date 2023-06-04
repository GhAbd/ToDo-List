import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {Colors} from '../Theme';

type ToDoItemProps = {
  title: string;
  onPress:()=> void;
};

const Button = ({title, onPress}: ToDoItemProps) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.5}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal:10,
    backgroundColor:Colors.buttonBlue,
    marginHorizontal:5,
    minWidth:60,
    alignItems:'center',
    borderRadius:10,
  },
  title: {
    fontSize: 16,
  },
});


export default Button;