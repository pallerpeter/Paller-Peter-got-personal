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

function makeRightSidePanel() {
  var div2 = document.createElement('div');
  div2.className = 'rightSidePanel';
  div2.innerHTML = 'content of rightSidePanel';
  var main = document.querySelector('main');
  main.appendChild(div2);
}
makeRightSidePanel();

/*
function getProfilToRightPanel(userDatas) {
  var photos = document.querySelectorAll('img');
  photos.addEventListener('click', function () {
    console.log(photos);
  });
}
*/
