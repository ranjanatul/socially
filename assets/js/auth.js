const login = document.getElementById('login');
const signup = document.getElementById('signup');
const login_div = document.querySelector('.login');
const signup_div = document.querySelector('.signup');

const signup_submit = document.getElementById('signup');

login.addEventListener('click', function () {
  login.disable = true;
  login_div.style.display = 'block';
  signup.disable = false;
  signup_div.style.display = 'none';
  return;
});

signup.addEventListener('click', function () {
  login.disable = false;
  login_div.style.display = 'none';
  signup.disable = true;
  signup_div.style.display = 'block';
  return;
});

// function submitSignup(prop) {
//   e.preventDefault();
//   const inp = prop.getElementsByTagName('input');
//   const request = {
//     name: inp[0].value,
//     email: inp[1].value,
//     password: inp[2].value,
//     password2: inp[3].value,
//   };

//   fetch('/user/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(request),
//   });
// }

// function submitLogin(prop) {
//   e.preventDefault();
//   const inp = prop.getElementsByTagName('input');
//   const request = {
//     email: inp[0].value,
//     password: inp[1].value,
//   };

//   fetch('/user/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(request),
//   });
// }
