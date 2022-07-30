// const navbar_list = document.getElementById('navbar');
const flashMsgWrapper = document.querySelector('.flash-msg-wrapper');
const flashMsg = document.querySelector('.flash-msg-text');
const timeout = 4000;

window.addEventListener('load', function (e) {
  const path = window.location.pathname;
  if (path == '/') {
    document.getElementById('home').className = 'active';
  } else if (path == '/user/auth') {
    document.getElementById('user').className = 'active';
  } else if (path == '/user/profile') {
    document.getElementById('profile').className = 'active';
  } else if (path == '/about') {
    document.getElementById('about').className = 'active';
  } else if (path == '/help') {
    document.getElementById('help').className = 'active';
  }
  showFlashMsg();
  setTimeout(removeFlashMsg, timeout);
});

function removeFlashMsg() {
  flashMsgWrapper.style.display = 'none';
  flashMsgWrapper.style.marginLeft = '-300px';
}

function keepFlashMsg() {
  
}

function showFlashMsg() {
  if (flashMsg.textContent != '') {
    flashMsgWrapper.style.display = 'flex';
    flashMsgWrapper.style.marginLeft = '30px';
  }
}

/*
navbar_list.addEventListener('click', function (e) {
  const { id } = e.target;
  navbar_list.childNodes.forEach((item) => {
    if (typeof item.value !== 'undefined') {
      const ele = item.querySelector('a');
      if (ele.id == id) {
        ele.className = 'active';
      } else {
        ele.className = '';
      }
    }
  });
});
*/
