import AsyncStorage from '@react-native-async-storage/async-storage';

type UpsertDataType = {
  id:string;
  title:string;
  description: string;
  isDone: boolean;
};

export const upsertToDoItem = async (isNew=false ,item:UpsertDataType) => {
  try {
    const collection:any = {};
    collection[item.id] = item;
    if (isNew) {
      // to order by creation time
      collection[item.id].createdAt = Date.now();
    }
    await AsyncStorage.mergeItem('@toDoCollection', JSON.stringify(collection));
  } catch (e) {
    console.log('upsertToDoItem error',e);
  }
}

export const deleteToDoItem = async (id:string) => {
  try {
    const collection = await getToDoCollection();
    delete collection[id];
    await AsyncStorage.setItem('@toDoCollection', JSON.stringify(collection));
  } catch (e) {
    console.log('deleteToDoItem error',e);
  }
}

const getToDoCollection = async () => {
  try {    
    const jsonValue = await AsyncStorage.getItem('@toDoCollection');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log('getToDoCollection error',e);
    return {};
  }
}

export const getToDoList = async () => {
  try {
    const collection = await getToDoCollection();
    return Object.keys(collection).map((item)=>collection[item]).sort((a,b)=>a.createdAt-b.createdAt);
  } catch(e) {
    console.log('getToDoList error',e);
    return [];
  }
}

