import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Button from './Button';

type DialogProps = {
  children: React.ReactNode;
  visible: boolean;
  onHide: ()=>void;
  onSubmit: ()=>void;
};

const Dialog = ({children, visible, onHide, onSubmit}:DialogProps) => {

    return (  
      <Modal
          transparent={true}
          visible={visible}
          onRequestClose={onHide}
        >
          <View style={styles.modal}>
            <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onHide} activeOpacity={1}/>
            <View style={styles.itemEditorContainer}>
              {children||null}
              <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <Button title='Cancel' onPress={onHide}/>
                <Button title='Save' onPress={onSubmit}/>
              </View>
            </View>
          </View>
        </Modal>
    
    );
  };

const styles = StyleSheet.create({
modal:{
    flex:1,
    backgroundColor:'#0009',
    paddingTop:60
},
itemEditorContainer:{
    backgroundColor:'#fff',
    borderRadius:10,
    margin:10,
    paddingHorizontal:20,
    paddingVertical:10,
    // zIndex:1
},
});

export default Dialog
