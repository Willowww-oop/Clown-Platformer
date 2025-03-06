


import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
//import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js'

// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js';
//import{getDatabase} from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js';
import{getDatabase, ref, onValue, set, child, get, update, push, query, orderByChild, equalTo, limitToLast} from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js';

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

var holdID;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const db = getDatabase();
console.log(database);


//Setting Up References
 const fullRef = ref(database, 'server/saving-data');
 const playersRef = child( fullRef, 'players');
 //var playersName;
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

  //playersName = 'Try04';
  //runAfterPlayerNamed();

  getTopScores();

  //pushNewPlayer("playerName05", "120")
  
  //updatePlayerScore('Try04', 120);
  //updatePlayerLevel('Test01', 2);

  //let y = await getPlayerScore('Try04');
  //console.log(y);

  //getTopScores();

  //let id = await getPlayerID('Try04');
  //console.log(id);
  //console.log(getPlayerID('Try04'));
  //getPlayerID('Try04').then(console.log(holdID));

    //let x = await getData(playersRef);
    //console.log(x.player1.name);
    //console.log(x.player1.name);

});



function pushNewPlayer(playerName, playerHighScore = 0, playerLevel = 1)
{
  //playersRef.push().set({
  push(playersRef, {
    name: playerName,
    highscore: playerHighScore,
    level: playerLevel
  });
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
  const idQuery = query(playersRef, orderByChild('name'), equalTo(playerName));
  // console.log("stuff: ", stuff.val())
  onValue(idQuery, (snapshot) => {
    const data = snapshot.val();
    let updateRef = child(playersRef, Object.keys(data)[0]);
    //let updateScoreRef = child(updateRef, 'highscore');
    update(updateRef, {
      highscore: newScore
    })
    //holdID = Object.keys(data)[0];
    //return Object.keys(data)[0];
  });
}

function updatePlayerLevel(playerName, newLevel)
{
  const idQuery = query(playersRef, orderByChild('name'), equalTo(playerName));
  onValue(idQuery, (snapshot) => {
    const data = snapshot.val();
    let updateRef = child(playersRef, Object.keys(data)[0]);
    update(updateRef, {
      level: newLevel
    })
  });
}


//function getPlayerScore(data)
//{
//  let updateRef = child(playersRef, Object.keys(data)[0]);
//  return get(updateRef).then(() => {return data.highscore;});
//}



async function getPlayerScore(playerName)
{    
    const idQuery = query(playersRef, orderByChild('name'), equalTo(playerName));
    return await onValue(idQuery, async (snapshot) => {
      const data = snapshot.val();
      let updateRef = child(playersRef, Object.keys(data)[0]);
      return await get(updateRef).then((snapshot) => {
        if (snapshot.exists()) {
            const playerData = snapshot.val();            //alert(JSON.stringify(data));
            //console.log(data.highscore);
            return playerData.highscore;                       //alert(JSON.stringify(returnVal));
        } else {
          console.log('No data available');
        }
      }).catch((error) => {
        console.error('Error reading data:', error);
      });
  });  
}


function getTopScores()
{    
  get(playersRef).then((snapshot) => {
    let data = snapshot.val();
    let propNames = Object.getOwnPropertyNames(data);
    //let allPlayerArray = [];
    let playersScores = [];
    for(const propName of propNames)
    {
      let propVal = data[propName];
      playersScores.push([propVal.name, propVal.highscore]);
    }
    playersScores.sort((a,b) => b[1] - a[1]);

    for(var i = 0; i < 10 && i < playersScores.length; i++)
    {
      displayHighScore(i + 1, playersScores[i][0], playersScores[i][1]);
    }
    for(i; i < 10; i++)
    {
      displayHighScore(false, false, false);
    }
  });
}






//displayHighScore = function(score) {
//function displayHighScore(score) {
//  //const highScoreElement = document.getElementById('high-score-display');
//  const highScoreElement = document.getElementById('1');
//
//  if(score === undefined) {
//    highScoreElement.innerHTML = '&minus;&minus;&minus;&minus;';
//  } else {
//    highScoreElement.innerHTML = score;
//  }
//}

function displayHighScore(id, name, score) {
  //const highScoreElement = document.getElementById('high-score-display');
  const highScoreElement = document.getElementById(id);

  if(score === false) {
    highScoreElement.innerHTML = '&minus;&minus;&minus;&minus;';
  } else {
    highScoreElement.innerHTML = name + ': ' + score;
  }
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


async function getPlayerID(playerName)
{
  const stuff = query(playersRef, orderByChild('name'), equalTo(playerName));
  // console.log("stuff: ", stuff.val())
  return onValue(stuff, (snapshot) => {
    const data = snapshot.val();
    //console.log(data)
    //console.log(Object.keys(data));
    //console.log(Object.keys(data)[0]);
    holdID = Object.keys(data)[0];
    return Object.keys(data)[0];
    // updateStarCount(postElement, data);
  });

  
}

function createTestPlayersBranch()
{
  console.log('Do not execute: createTestPlayersBranch');
  //pushNewPlayer('Test01');
  //pushNewPlayer('Example02', 206, 4);
  //pushNewPlayer('Attempt03', 0, 2);
  //pushNewPlayer('Try04', 30);
}

function createTestNpcBranch()
{
  console.log('Do not execute: createTestNpcsBranch');
  //pushNewNpc('TestNPC', 'Test Dialogue One', 'Dialogue Option Two', 'Hello World');
  //pushNewNpc('SecondNPC', 'This is the Second NPC', 'This should not have any lines that TestNPC does', '>:P');
  //pushNewNpc('TestOneDefault', 'This NPC tests if the option 3 default value works', 'If it does, then option three will be an empty string');
  //pushNewNpc('TestBothDefaultValues', 'This NPC tests if the 2nd and third option defaults work');
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

//function updateData(arg)
//{
//
//    console.log(arg);
//
//    update(arg, {
//            player3: {
//              name: "Try03"
//            },
//            player4: {
//              name: "Attempt04"
//            }
//          })
//}


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