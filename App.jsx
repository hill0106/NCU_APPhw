import React from 'react';
import {
  StyleSheet, Text, Button, View,
} from 'react-native';
import firebase from 'firebase';
import TimeController from './Time';
import { useState, useEffect } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyCr3GvcAX07vCEDbCt4RE-yHrOodBkF9co",
  authDomain: "test-1c5d1.firebaseapp.com",
  projectId: "test-1c5d1",
  storageBucket: "test-1c5d1.appspot.com",
  messagingSenderId: "1070317256003",
  appId: "1:1070317256003:web:e4d8160a3efa4d86ef83f6",
  measurementId: "G-VT6LCSP7BK"
};

export default function App() {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
 
  return (
    <View style={styles.container}>
      <Button onPress={TimeController.getLastestTime} title="get lastest time" color="#FFBF00" />
      <Text>{'\n'}</Text>
      <Button onPress={TimeController.getAllTimes} title="get all time" color="#007FFF" />
      <Text>{'\n'}</Text>
      <Button onPress={TimeController.addCurrentTime} title="add current time" color="#00FF00" />
      <Text>{'\n'}</Text>
      <Button onPress={TimeController.deleteEarliestTime} title="delete earliest time" color="#FF0000" />
    </View>
  );
}