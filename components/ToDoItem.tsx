import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from './Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../Theme';

type ToDoItemProps = {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  onEdit:()=> void;
  onDelete:()=> void;
  onToggleDone:()=> void;
};

const ToDoItem = ({title, description, isDone, onEdit, onDelete, onToggleDone }: ToDoItemProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <View style={styles.container}>
      <Pressable style={{flexDirection:'row', justifyContent:'space-between'}} onPress={()=>{setExpanded((expanded)=>!expanded)}}>
        <Text style={styles.title}>{title}</Text>
        <Icon name={isDone?'check-box':'check-box-outline-blank'} size={30} color={Colors.buttonBlue} onPress={onToggleDone} />
      </Pressable>
      {expanded && (<>
        <Text style={styles.description}>{description}</Text>
        <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:5}}>
          <Button title='Edit' onPress={onEdit}/>
          <Button title='Delete' onPress={onDelete}/>
        </View>
      </>)}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor:Colors.white,
    width:'100%',
    marginVertical:5,
    borderRadius:10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  description: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});


export default ToDoItem;