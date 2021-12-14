import firebase  from 'firebase';


function toDateString(time) {
  const date = new Date(time.seconds * 1000);
  const dateString = `${date.getFullYear().toString()}/${
    (date.getMonth() + 1).toString().padStart(2, '0')}/${
    date.getDate().toString().padStart(2, '0')}  ${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}:${
    date.getSeconds().toString().padStart(2, '0')}`;

  return dateString;
}

async function getLastestTime() {
  const db = firebase.firestore();
  const timeRef = db.collection('time').orderBy('time');
  const loop = await timeRef.get();
  var old = -2880000;
  var id;
  loop.forEach((doc) =>{
    if(doc.data().time > old){
      id = doc.id;
      old = doc.data().time;
    }
  });
  const latesttime = db.collection('time').doc(id);
  const doc = await latesttime.get();
  
  if(loop.size == 0)
    console.log("Time queue is empty.");
    //return ("Time queue is empty.");
  else
    console.log(toDateString(doc.data().time));
    //return toDateString(doc.data().time);
}

async function getAllTimes() {
  const db = firebase.firestore();
  const timeRef = db.collection('time');
  const loop = await timeRef.get();
  var array = [];
   loop.forEach((doc) => {
      array.push(toDateString(doc.data().time));
   });
   console.log(array);
   return array;
}

function addCurrentTime() {
  const db = firebase.firestore();
  const timeRef = db.collection('time');
  const currtentTime = {
    time: new Date()
  };
  timeRef.add(currtentTime);
}

async function deleteEarliestTime() {
  const db = firebase.firestore();
  const timeRef = db.collection('time');
  const loop = await timeRef.get();
  var now = new Date();
  var id;
  loop.forEach((doc) =>{
    if(doc.data().time < now){
      id = doc.id;
      now = doc.data().time;
    }
  });
  const deletetime = db.collection('time').doc(id);
  deletetime.delete();

  if(loop.size == 0)
    console.log("Time queue is empty.");
    //return ("Time queue is empty.");

}

export default {
  toDateString,
  getLastestTime,
  getAllTimes,
  addCurrentTime,
  deleteEarliestTime,
}
