import React,{useCallback, useContext} from 'react';
import {
  StyleSheet,
} from 'react-native';
import Dialog from './Dialog';
import TextField from './TextField';
import { AppContext } from '../context/AppContext';
import {upsertToDoItem} from '../api';

const ToDoForm = () => {
  const {showForm, formItem, hideToDoForm, upsertItem, setFormTitle, setFormDescription} = useContext(AppContext);

  const onSubmit = useCallback(async()=>{
    const isNew = formItem.index===-1;
    upsertToDoItem(isNew,{
      id:formItem.id,
      title:formItem.title,
      description:formItem.description,
      isDone:formItem.isDone,
    });
    upsertItem();
    hideToDoForm();
  },[]);
  
  return (
    <Dialog visible={showForm} onHide={hideToDoForm} onSubmit={onSubmit}>
      <TextField label="Title" value={formItem.title} onChange={setFormTitle} />
      <TextField label="Description" value={formItem.description} onChange={setFormDescription} multiline />
    </Dialog>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    right: 10,
  },

});


export default ToDoForm;