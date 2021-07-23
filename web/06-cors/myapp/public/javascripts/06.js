'use strict';
const apiEndpoint = 'https://396bca642f2f.ngrok.io'
const $ = (id) => document.getElementById(id);
const uxhr = new XMLHttpRequest();
const dxhr = new XMLHttpRequest();

function deleteHistory(obj) {
  dxhr.open('DELETE', apiEndpoint + '/history/' + obj.id);
  dxhr.send();
  document.getElementById(obj.id).remove();
};

function updateProfile() {
  const fd = new FormData($('edit-form'));
  uxhr.open('POST', apiEndpoint + '/update');
  uxhr.send(fd);
  removeForm();
};

function updateProfilePic() {
  const fd = new FormData();
  fd.append('profilePic', this.files[0])
  uxhr.open('POST', apiEndpoint + '/update');
  uxhr.send(fd);
  removeForm();
};

function fetchHistory() {
  dxhr.open('GET', apiEndpoint + '/history');
  dxhr.send();
};

function removeForm() {
  let e = document.getElementById('edit-area');
  while(e.firstChild) {
    e.removeChild(e.firstChild);
  }
};

function updateBackgroundImage(id, url) {
  let target = document.getElementById(id);
  target.style.backgroundImage = 'url(' + url + ')';
};

uxhr.onreadystatechange = function() {
      switch ( uxhr.readyState ) {
          case 0:
              // 未初期化状態.
              console.log( 'uninitialized!' );
              break;
          case 1: // データ送信中.
              console.log( 'loading...' );
              break;
          case 2: // 応答待ち.
              console.log( 'loaded.' );
              break;
          case 3: // データ受信中.
              console.log( 'interactive... '+uxhr.responseText.length+' bytes.' );
              break;
          case 4: // データ受信完了.
              if( uxhr.status == 200 || uxhr.status == 304 ) {
                  if (uxhr.responseText){
                    let data = JSON.parse(uxhr.responseText);
                    console.log( 'COMPLETE! :'+data);
                    refreshProfile(data);
                    fetchHistory();
                  }
              } else {
                  console.log( 'Failed. HttpStatus: '+uxhr.statusText );
                  console.log(data);
              }
              break;
      }
  };

dxhr.onreadystatechange = function() {
    switch ( dxhr.readyState ) {
        case 0:
            // 未初期化状態.
            console.log( 'uninitialized!' );
            break;
        case 1: // データ送信中.
            console.log( 'loading...' );
            break;
        case 2: // 応答待ち.
            console.log( 'loaded.' );
            break;
        case 3: // データ受信中.
            console.log( 'interactive... '+dxhr.responseText.length+' bytes.' );
            break;
        case 4: // データ受信完了.
            if( dxhr.status == 200 || dxhr.status == 304 ) {
                if (dxhr.responseText){
                    let data = JSON.parse(dxhr.responseText);
                    console.log( 'COMPLETE!'+data.history);
                    refreshHistory(data);
                }
            } if( dxhr.status == 204) {
                if (dxhr.responseText){
                    let data = JSON.parse(dxhr.responseText);
                    console.log( 'COMPLETE!'+data.history);
                }
            } else {
                console.log( 'Failed. HttpStatus: '+dxhr.statusText );
            }
            break;
    }
};

function refreshProfile(data){
  if (data.imagePath){
    let imageUrl = apiEndpoint + '/' + data.imagePath;
    updateBackgroundImage('profile-circle', imageUrl)
  }
  if (data.name) {
    document.getElementById('profile-name').textContent = data.name
  }
  if (data.email) {
    document.getElementById('profile-email').textContent = data.email
  }
}

function refreshHistory(data) {
    let historyArea = document.getElementById('history-area');
    while(historyArea.firstChild) {
        historyArea.removeChild(historyArea.firstChild);
    }
    let e = "";
    if (data){
        data.forEach(function(v) {
            console.log(v);

            e += `
            <div id='${v[0]}' onclick='deleteHistory(this)'>${v[1].date}: ${v[1].result}</div>
            `
        })
        historyArea.innerHTML += e;
    }
}
function editName(){
    removeForm();
    let editArea = document.getElementById('edit-area');
    let name = document.getElementById('profile-name').textContent;
    const f =
    `
      <form id='edit-form'>
        <label class='visually-hidden'>name</label>
          <input class='form-control darken p1 rounded-big' type='text' id='inputName' name='name' value='${ name }')</input>
      </form>
      <div>
        <button class='btn btn-lg btn-primary' type='button' onclick='updateProfile()'> Save </button>
      </div>
    `
    editArea.innerHTML += f;
};

function editEmail(){
    removeForm();
    let editArea = document.getElementById('edit-area');
    let email = document.getElementById('profile-email').textContent;
    const f =
    `
    <form id='edit-form'>
        <label class='visually-hidden'> mail address</label>
          <input class='form-control darken p1 rounded-big' type='email' id='inputEmail' name='email' value='${ email }'></input>
      </form>
      <div>
        <button class='btn btn-lg btn-primary' type='button' onclick='updateProfile()'> Save </button>
      </div>
    `
    editArea.innerHTML += f;
};

window.addEventListener('load', () => {
  $('profile-name').addEventListener('click', editName, false);
  $('profile-email').addEventListener('click', editEmail, false);
  $('profile-pic').addEventListener('change', updateProfilePic, false);
  fetchHistory();
});