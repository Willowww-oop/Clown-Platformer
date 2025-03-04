


import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
//import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js'

// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js';
//import{getDatabase} from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js';
import{getDatabase, ref, onValue, set, child, get, update, push} from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDVA8eRlNOaZIsMEaJlypv-XVW8noEVVM",
  authDomain: "clowning-around-40bd5.firebaseapp.com",
  projectId: "clowning-around-40bd5",
  storageBucket: "clowning-around-40bd5.firebasestorage.app",
  messagingSenderId: "803045719396",
  appId: "1:803045719396:web:5b5a4272c282a559810e71",

  databaseURL: "https://clowning-around-40bd5-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const db = getDatabase();
console.log(database);

//Setting Up References
const fullRef = ref(database, 'server/saving-data');
const playersRef = child( fullRef, 'players');
const npcsRef = child(fullRef, 'npcs');

//const refT2 = ref(database, 'server/saving-data/players')

//const usersRef = refT1.child('users');
//const usersRef = ref(database, 'server/saving-data/players','players');


//console.log(playersRef);
//ref(db, 'server/saving-data/players','players').set({
//set(ref(database, 'server/saving-data/players','players'), {

//  //set(playersRef, {
//  update(playersRef, {
//
//  player1: {
//    name: "Test01"
//  },
//  player2: {
//    name: "Example02"
//  }
//})



//get(fullRef)
//.then((snapshot) => {
//    if (snapshot.exists()) {
//        const data = snapshot.val();
//        console.log(data);
//    } else {
//        console.log('No data available');
//    }
//})
//.catch((error) => {
//    console.error('Error reading data:', error);
//});






//const playersRef = child( refT1, 'players');

////REMEMBER TO AWAIT ANY FUNCTION RETURNING DATA FROM DATABASE AT **ALL** LEVELS
document.addEventListener('DOMContentLoaded',async function() {
  //pushNewPlayer("playerName05", "120")
  
    //
    //setData(playersRef);
    //updateData(playersRef);
    ////console.log(getData(playersRef));
    let x = await getData(playersRef);
    console.log(x.player1.name);
});

//we shouldn't really directly SET data, so . . .  don't use this without good reason.
//function setPlayerData(playerName, playerHighScore, playerLevel)
//{
//
//    console.log(arg);
//
//    set(playersRef, {
//            player1: {
//              name: "Test01"
//            },
//            player2: {
//              name: "Example02"
//            }
//          })
//}

function pushNewPlayer(playerName, playerHighScore = 0, playerLevel = 1)
{
  //playersRef.push().set({
  push(playersRef, {
    name: playerName,
    highscore: playerHighScore,
    level: playerLevel
  });
}

function createTestPlayersBranch()
{
  pushNewPlayer('Test01');
  pushNewPlayer('Example02', 206, 4);
  pushNewPlayer('Attempt03', 0, 2);
  pushNewPlayer('Try04', 30);
}

function createTestNpcBranch()
{
  pushNewNpc('TestNPC', 'Test Dialogue One', 'Dialogue Option Two', 'Hello World');
  pushNewNpc('SecondNPC', 'This is the Second NPC', 'This should not have any lines that TestNPC does', '>:P');
  pushNewNpc('TestOneDefault', 'This NPC tests if the option 3 default value works', 'If it does, then option three will be an empty string');
  pushNewNpc('TestBothDefaultValues', 'This NPC tests if the 2nd and third option defaults work');
}


//update will not work. We'll have to use push
function pushNewNpc(NPCname, option01, option02 = '', option03 = '')
{
  push(npcsRef, {
    npcname: NPCname,
    dialogue: {
      dialogue01: option01,
      dialogue02: option02,
      dialogue03: option03
    }  
  });
}

function updatePlayerScore(playerName, newScore)
{

}




//function setPlayerData(arg)
//{
//
//    console.log(arg);
//
//    set(arg, {
//            player1: {
//              name: "Test01"
//            },
//            player2: {
//              name: "Example02"
//            }
//          })
//}



function updateData(arg)
{

    console.log(arg);

    update(arg, {
            player3: {
              name: "Try03"
            },
            player4: {
              name: "Attempt04"
            }
          })
}

function getData(arg)
{
    console.log(arg);
    let returnVal;
    return get(arg).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();            //alert(JSON.stringify(data));
            //console.log(data);
            return data;                       //alert(JSON.stringify(returnVal));
        } else {
            console.log('No data available');
        }
    }).catch((error) => {
        console.error('Error reading data:', error);
    });
}

