import React, {useCallback, useContext, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
} from 'react-native';

import ToDoItem from './ToDoItem';
import { AppContext } from '../context/AppContext';
import {deleteToDoItem, upsertToDoItem, getToDoList} from '../api';

type ToDoListProps = {
};


const ToDoList = ({ }: ToDoListProps) => {
  const {toDoList, setToDoList, showToDoForm, deleteItem, setItemIsDone} = useContext(AppContext);

  const onDelete = useCallback((id:string, index:number)=>{
    deleteToDoItem(id);
    deleteItem(index);
  },[]);

  const onEdit = useCallback((id:string, index:number)=>{
    showToDoForm(toDoList[index].id, toDoList[index].title, toDoList[index].description, toDoList[index].isDone, index);
  },[toDoList]);

  const onToggleDone = useCallback((id:string, index:number)=>{
      const newValue = !toDoList[index].isDone;
      upsertToDoItem(false,{...toDoList[index], isDone:newValue});
      setItemIsDone(index,newValue)
  },[toDoList]);

  useEffect(()=>{
    const getList =async () => {
      const data = await getToDoList();      
      setToDoList(data);
    }
    getList();
  },[]);

  return (
    <FlatList 
      data={toDoList}
      keyExtractor={({id})=>id.toString()}
      renderItem={({item, index})=><ToDoItem {...item} onDelete={()=>onDelete(item.id, index)} onEdit={()=>onEdit(item.id, index)} onToggleDone={()=>onToggleDone(item.id, index)} />}
      style={{paddingHorizontal:10,}}
      contentContainerStyle={{paddingBottom:80}}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    
  },
});


export default ToDoList;