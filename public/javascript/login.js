async function signupFormHandler(event) {
  event.preventDefault();

  document.location.replace('/signup')
}

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {'Content-Type' : 'application/json'}
    });
    console.log(response)
    if (response.ok) {
      console.log('Success')
      document.location.replace('/dashboard');
    } else {
      //document.querySelector('.loginAlert').style.display = "block";
      //setTimeout(function() { 
      //  document.querySelector('.loginAlert').style.display = "none"; 
      //}, 3000);
      console.log('Failed')
    }
  }
}

document.querySelector('.signup-btn').addEventListener('click', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);