import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import ToDoList from './components/ToDoList';
import AddButton from './components/AddButton';
import ToDoForm from './components/ToDoForm';
import { Colors } from './Theme';
import {AppContextProvider} from './context/AppContext'

function App(): JSX.Element {
  
  return (
    <SafeAreaView style={styles.container}>
      <AppContextProvider>
        <Text style={styles.title}>What to do?</Text>
        <ToDoList/>
        <ToDoForm/>
        <AddButton/>
      </AppContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    flex:1,
    backgroundColor:Colors.greyLight,
  },
  title:{
    marginLeft:10,
    marginVertical:20,
    fontSize:24,
    fontWeight:'bold',
  },
});

export default App;
