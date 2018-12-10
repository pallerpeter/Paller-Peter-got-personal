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
  onlyAliveCharacters(userDatas);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

var div2 = document.createElement('div');
var divOfPicture = document.createElement('div');
var divOfName = document.createElement('div');
var divOfSymbol = document.createElement('div');
var divOfBio = document.createElement('div');
var divOfSearchButton = document.createElement('div');
var divOfSearch = document.createElement('div');
var searchButton = document.createElement('button');
searchButton.className = 'searchbutton';
searchButton.innerHTML = 'search';

function makeRightSidePanel() {
  div2.className = 'rightSidePanel';
  var main = document.querySelector('main');
  main.appendChild(div2);
  divOfSymbol.className = 'divOfSymbolClass';
  divOfBio.className = 'divOfBioClass';
  div2.appendChild(divOfPicture);
  div2.appendChild(divOfName);
  div2.appendChild(divOfSymbol);
  div2.appendChild(divOfBio);
  div2.appendChild(divOfSearchButton);
  divOfSearchButton.appendChild(searchButton);
  div2.appendChild(divOfSearch);
  divOfName.className = 'divOfNameClass';
  divOfPicture.className = 'divOfPictureClass';
  divOfSearch.className = 'divOfSearchClass';
  divOfSearchButton.className = 'buttonFieldClass';
}

function getSearchFieldToRightPanel() {
  var searchField = document.createElement('input');
  divOfSearch.appendChild(searchField);
  searchField.type = 'text';
  searchField.className = 'searchFieldClass';
  searchField.placeholder = 'keresés';
  searchField.value = '';
}

function onlyAliveCharacters(userDatas) {
  var arrayOfAliveCharacters = [];
  for (var i = 0; i < userDatas.length; i++) {
    if (userDatas[i].dead !== true) {
      arrayOfAliveCharacters.push(userDatas[i]);
    }
  }
  generateElements(arrayOfAliveCharacters);
  makeRightSidePanel();
  getSearchFieldToRightPanel();
  search(arrayOfAliveCharacters);
}

function getContainerElement() {
  var container = document.querySelector('.container');
  return container;
}

function showElementContent(index, arrayOfAliveCharacters) {
  var container = getContainerElement();
  // var paragraph = container.children;
  divOfPicture.innerHTML = `<img class='picture' src=/${arrayOfAliveCharacters[index].picture}>`;
  divOfName.innerHTML = `<p class='pTagOfName'>${arrayOfAliveCharacters[index].name}</p>`;
  if (arrayOfAliveCharacters[index].house) {
    divOfSymbol.innerHTML = `<img src=/assets/houses/${arrayOfAliveCharacters[index].house}.png class="symbol">`;
  } else {
    divOfSymbol.innerHTML = '';
  }
  divOfBio.innerHTML = `<p class='pTagOfBio'>${arrayOfAliveCharacters[index].bio}</p>`;
  // alert(paragraph[index].textContent);
}


function addCustomListenerForDiv(element, index, arrayOfAliveCharacters) {
  element.addEventListener('click', function () {
    showElementContent(index, arrayOfAliveCharacters);
  });
}

function generateElements(arrayOfAliveCharacters) {
  var container = getContainerElement();
  for (var i = 0; i < arrayOfAliveCharacters.length; i += 1) {
    if (arrayOfAliveCharacters[i].dead !== true) {
      var div = document.createElement('div');
      div.setAttribute('class', 'container_class');
      div.innerHTML = `<div class='profiles'> <img src=/${arrayOfAliveCharacters[i].portrait}>
       <div><p class='profileName'>${arrayOfAliveCharacters[i].name}</p>
      </div></div> `;
      addCustomListenerForDiv(div, i, arrayOfAliveCharacters);
      container.appendChild(div);
    }
  }
}


function search(arrayOfAliveCharacters) {
  var searchText = document.querySelector('.searchFieldClass').value.toLowerCase();
  for (var key in arrayOfAliveCharacters) {
    if (arrayOfAliveCharacters[key].toLowerCase() === searchText) {
      divOfBio.innerHTML = arrayOfAliveCharacters[key].bio;
      alert(`I found it! Index: ${key}, Data: ${arrayOfAliveCharacters[key]}`);
      return;
    }
  }
  alert('Element not found!');
}

function searchButtonEventListener(userDatas) {
  var element = document.querySelector('.searchButton');
  element.addEventListener('click', function () {
    search(userDatas);
  });
}
