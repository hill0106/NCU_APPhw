import React from 'react';
import {
  StyleSheet, Text, Button, View, RefreshControl
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
  alltime:{
    marginRight: 10,
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

  const [item, setItem] = useState([]);
  const [alltime, setAlltime] = useState([]);
  const [check, setChek] = useState(false);
  const [check1, setChek1] = useState(false);
    useEffect(() => {
        TimeController.getLastestTime().then(res => setItem(res));
        TimeController.getAllTimes().then(res => setAlltime(res));
    },[]);

  const clickHandler = () => {
    setChek(!check);
  }
  const clickHandler1 = () => {
    setChek1(!check1);
  }
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    TimeController.getAllTimes().then((res) => {
      setRefreshing(false);
    });
  }
 
  return (
    <View style={styles.container}>
      <Button onPress={() =>{TimeController.getLastestTime().then(clickHandler) }} title="get lastest time" color="#FFBF00" />
      {check && <Text>{item}{'\n'}</Text> }
      <Text>{'\n'}</Text>
      
      <Button onPress={() => {TimeController.getAllTimes().then(clickHandler1)}} title="get all time" color="#007FFF" />
      {check1 && <Text 
        style={styles.alltime} 
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}>{alltime}</Text>}
      <Text>{'\n'}</Text>
      <Button onPress={TimeController.addCurrentTime} title="add current time" color="#00FF00" />
      <Text>{'\n'}</Text>
      <Button onPress={TimeController.deleteEarliestTime} title="delete earliest time" color="#FF0000" />
    </View>
  );
}