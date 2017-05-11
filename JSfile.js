function album(artist, album, year) {
  this.artistName = artist;
  this.albumName = album;
  this.yearNum = year;
}

var albumArr = [];

/*
setCookie function found at https://www.w3schools.com/js/js_cookies.asp
Author: W3Schools
*/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
/*
getCookie function found at https://www.w3schools.com/js/js_cookies.asp
Author: W3Schools
*/
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function printList() {
  if(loadList() && albumArr.length > 0) {
    for(var i=0; i<albumArr.length; i++) {
      var index = i;
      var div = document.createElement("div");
      div.style.width = "611px";
      div.innerHTML= "<b>Artist: </b>" +
      albumArr[i].artistName + "<br><b>Album Title: </b>" + albumArr[i].albumName +
      "<br><b>Year: </b>" + albumArr[i].yearNum;


      var btn = document.createElement("BUTTON");
      btn.classList = "button";
      btn.innerHTML = "Delete Entry " + (i+1);
      btn.id = i;//"button" + i;
      btn.onclick = function(){deleteEntry(this.id);};

      document.getElementById("list").appendChild(div);
      document.getElementById("list").appendChild(btn);
    }
  }
  else {
    var div = document.createElement("div");
    div.style.width = "611px";
    div.innerHTML= "<b>There doesn't seem to be anything here.<b>";
    document.getElementById("list").appendChild(div);
  }
}

function deleteEntry(entryId) {
  console.log("Entry #" + entryId + " BALEETED");
  var index = Number(entryId);
  var temp = albumArr[0];
  albumArr[0] = albumArr[index];
  albumArr[index] = temp;
  albumArr.shift();
  saveList();
  location.reload();
}

function saveList() {
  setCookie("catalog", JSON.stringify(albumArr), 7);
}

function loadList() {
  var cookie = getCookie("catalog");
  if(cookie.length > 0) {
    albumArr = JSON.parse(cookie);
    return true;
  }
  else {return false;}
}

function sortList() {
  var option = document.getElementById("sortOption").value;
  loadList();

  switch(option) {
    case "byArtist":
      albumArr.sort(function(a, b){
        var artistA = a.artistName.toLowerCase();
        var artistB = b.artistName.toLowerCase();

        if (artistA < artistB) {
          return -1;
        }
        if (artistA > artistB) {
          return 1;
        }
        return 0;
      })
      break;
    case "byAlbum":
      albumArr.sort(function(a, b){
        var albumA = a.albumName.toLowerCase();
        var albumB = b.albumName.toLowerCase();

        if (albumA < albumB) {
          return -1;
        }
        if (albumA > albumB) {
          return 1;
        }
        return 0;
      })
      break;
    case "byYear":
      albumArr.sort(function(a, b){
        return a.yearNum-b.yearNum;
      });
      break;
    default:
      console.log("No sort done");
  }
  saveList();
}

function formSub() {
  var artistN = document.getElementById("artist").value;
  var albumN = document.getElementById("album").value;
  var yearN = document.getElementById("year").value;

  if(artistN.length == 0) {artistN = "N/A";}
  if(albumN.length == 0) {albumN = "N/A";}
  //if(yearN == "") {yearN = 0;}

  loadList();
  if(albumArr.length>0) {
    for(var i=0; i<albumArr.length; i++) {
      if(albumArr[i].artistName == artistN && albumArr[i].albumName == albumN &&
        albumArr[i].yearNum == yearN) {
          console.log("album already entered");
          return true;
        }
    }
    albumArr.push(new album(artistN, albumN, yearN));
    saveList();
    return false;
  }
  else {
    albumArr.push(new album(artistN, albumN, yearN));
    saveList();
    return false;
  }
}

function submitButton(option) {

  if(option==1) {
    location.href="options.html";
  }
  else if(option==2) {
    location.href="formsubmit.html";
  }
  else if(option==3) {
    location.href="list.html";
  }
  else if(option==4) {
    location.href="search.html";
  }
  else if(option==5) {
    if(formSub()) {
      document.getElementById("formError").innerHTML="That entry already exists.";
      document.getElementById("formError").classList.remove("isAllGood");
      document.getElementById("formError").classList.add("hasError");
      document.getElementById("formError").classList.remove("hiddenMessage");
      document.getElementById("formError").classList.add("shownMessage");
    }
    else {
      document.getElementById("formError").innerHTML="New entry added!";
      document.getElementById("formError").classList.remove("hasError");
      document.getElementById("formError").classList.add("isAllGood");
      document.getElementById("formError").classList.remove("hiddenMessage");
      document.getElementById("formError").classList.add("shownMessage");
    }
  }
  else if(option==6) {
    location.href="index.html";
  }
  else {
    console.log("Invalid");
  }
}
