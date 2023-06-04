import React, { useReducer, createContext } from "react";
import { actions } from "../constants/types";
import { v4 as uuidv4 } from 'uuid';

type ItemType = {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  index?: number;
  createdAt?: number;
}

interface AppContextType {
  toDoList: ItemType[];
  formItem: ItemType;
  showForm: boolean;
  setToDoList: (data:ItemType[])=> void;
  setItemIsDone: (index:number, isDone:boolean)=> void;
  deleteItem: (index:number)=> void;
  upsertItem: ()=> void;
  hideToDoForm: ()=> void;
  showToDoForm: (id?:string, title?:string, description?:string, isDone?:boolean, index?: number)=> void;
  setFormTitle: (value:string)=> void;
  setFormDescription: (value:string)=> void;
}

const emptyAppContext = {} as AppContextType;

export const AppContext = createContext<AppContextType>(emptyAppContext);

const initialState = {
  toDoList: [],
  formItem:{
    id:'',
    title:'',
    description:'',
    isDone:false,
    index:-1,
  },
  showForm:false,
};

const reducer = (state:any, action:any) => {
  let newState = { ...state };
  switch (action.type) {
    case actions.TODO_LIST_SET:
      newState.toDoList = action.data;
      break;
    case actions.ITEM_IS_DONE_SET:
      newState.toDoList[action.index].isDone = action.isDone;
      break;
    case actions.ITEM_REMOVE:
      newState.toDoList.splice(action.index,1);
      break;
    case actions.ITEM_UPSERT:
      const itemData = {
        id:newState.formItem.id,
        title:newState.formItem.title,
        description:newState.formItem.description,
        isDone:newState.formItem.isDone,
      }      
      if (newState.formItem.index===-1) {
        newState.toDoList.push(itemData);
      }else{
        newState.toDoList.splice(newState.formItem.index,1,itemData);
      }
      break;
    case actions.TODO_FORM_DIALOG_SHOW:
      newState.showForm=true;
      newState.formItem.id=action.id;
      newState.formItem.title=action.title;
      newState.formItem.description=action.description;
      newState.formItem.isDone=action.isDone;
      newState.formItem.index=action.index;
      break;
    case actions.TODO_FORM_DIALOG_HIDE:
      newState.showForm=false;
      break;
    case actions.TODO_FORM_TITLE_SET:
      newState.formItem.title=action.value;
      break;
    case actions.TODO_FORM_DESCRIPTION_SET:
      newState.formItem.description=action.value;
      break;
    default:
      throw new Error('Unknown action type!');
  }
  return newState;
};

type AppContextProviderProps = {
  children:React.ReactNode,
};

export const AppContextProvider = ({children}: AppContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    ...state,
    setToDoList: (data:any) => {
      dispatch({ type: actions.TODO_LIST_SET, data });
    },
    setItemIsDone: (index:number, isDone:boolean) => {
      dispatch({ type: actions.ITEM_IS_DONE_SET, index, isDone });
    },
    deleteItem: (index:number) => {
      dispatch({ type: actions.ITEM_REMOVE, index });
    },
    upsertItem: () => {
      dispatch({ type: actions.ITEM_UPSERT });
    },
    hideToDoForm: () => {
      dispatch({ type: actions.TODO_FORM_DIALOG_HIDE});
    },
    showToDoForm: (id=uuidv4(), title='', description='', isDone=false, index=-1) => {
      dispatch({ type: actions.TODO_FORM_DIALOG_SHOW, id, title, description, isDone, index});
    },
    setFormTitle: (value:string) => {
      dispatch({ type: actions.TODO_FORM_TITLE_SET, value});
    },
    setFormDescription: (value:string) => {
      dispatch({ type: actions.TODO_FORM_DESCRIPTION_SET, show:true, value});
    },
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};