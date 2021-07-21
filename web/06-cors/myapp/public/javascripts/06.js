'use strict';
const apiEndpoint = 'https://396bca642f2f.ngrok.io'
const $ = (id) => document.getElementById(id);
const xhr = new XMLHttpRequest();

function updateProfile() {
  const fd = new FormData($('edit-form'));
  xhr.open('POST', apiEndpoint + '/update');
  xhr.send(fd);
  removeForm();
};

function updateProfilePic() {
  const fd = new FormData();
  fd.append('profilePic', this.files[0])
  xhr.open('POST', apiEndpoint + '/update');
  xhr.send(fd);
  removeForm();
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

xhr.onreadystatechange = function() {
      switch ( xhr.readyState ) {
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
              console.log( 'interactive... '+xhr.responseText.length+' bytes.' );
              break;
          case 4: // データ受信完了.
              if( xhr.status == 200 || xhr.status == 304 ) {
                  let profileCircle = document.getElementById('profile-circle');
                  let data = JSON.parse(xhr.responseText);
                  //- console.log( 'COMPLETE! :'+data.path );
                  refreshProfile(data);
              } else {
                  console.log( 'Failed. HttpStatus: '+xhr.statusText );
                  console.log(data);
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
});