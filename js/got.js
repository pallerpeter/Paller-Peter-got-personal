function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  namesandportraits(userDatas);
  // getBioToRightPanel(userDatas);
  getSearchFieldToRightPanel();
  searchingCharacter(userDatas);
  inputOnEnter(userDatas);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
function namesandportraits(userDatas) {
  var arrayOfCharacters = '';
  for (var i = 0; i < userDatas.length; i += 1) {
    arrayOfCharacters += `<div class='profiles'> <img src=/${userDatas[i].portrait}>
  <div><p class='profileName'>${userDatas[i].name}</p>
 </div></div> `;
  }
  document.querySelector('.container').innerHTML = arrayOfCharacters;
}

var div2 = document.createElement('div');
var divOfCharacter = document.createElement('div');
var divOfSearch = document.createElement('div');


function makeRightSidePanel() {
  div2.className = 'rightSidePanel';
  var main = document.querySelector('main');
  main.appendChild(div2);
  div2.appendChild(divOfCharacter);
  divOfCharacter.innerHTML = 'Valar Morghulis';
  divOfCharacter.className = 'divOfCharacterClass';

  div2.appendChild(divOfSearch);
  divOfSearch.className = 'divOfSearchClass';
  // div2.innerHTML = 'content of rightSidePanel';
}
makeRightSidePanel();

/*
function getProfilToRightPanel() {
  currentProfile = document.querySelector('div');
  console.log(currentProfile);
}
getProfilToRightPanel();
*/

function getSearchFieldToRightPanel() {
  var searchField = document.createElement('input');
  divOfSearch.appendChild(searchField);

  searchField.type = 'text';
  searchField.className = 'searchFieldClass';
  searchField.placeholder = 'keresés';
  searchField.value = '';
  console.log(document.querySelector('.searchFieldClass'));
}

function inputOnEnter(userDatas) {
  document.querySelector('.searchFieldClass').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      searchingCharacter(userDatas);
    }
  });
}

function searchingCharacter(userDatas) {
  console.log(document.querySelector('.searchFieldClass'));
  if (document.querySelector('.searchFieldClass').value !== null) {
    var keresett = document.querySelector('.searchFieldClass').value;
    for (var i = 0; i < userDatas.length; i++) {
      if (userDatas[i].name === keresett) {
        divOfCharacter.innerHTML = userDatas[i].bio;
        return;
      }
      // console.log(searchField.value);
    }
  }
}

/*
function getBioToRightPanel(userDatas) {
var keresett = 'Jon Snow';
for (let i = 0; i < userDatas.length; i++) { if (userDatas[i].name===keresett) { console.log(userDatas[i].bio);
  document.querySelector('.rightSidePanel').innerHTML=userDatas[i].bio; } } } */
