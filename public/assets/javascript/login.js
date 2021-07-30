async function signupFormHandler(event) {
  event.preventDefault();

  document.location.replace('/signup')
}

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('.email-login').value.trim();
  const password = document.querySelector('.password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {'Content-Type' : 'application/json'}
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      response.text().then(function (text) {
        document.querySelector('.loginAlert').textContent = text.split('"')[3];
        document.querySelector('.loginAlert').style.display = "block";
        setTimeout(function() { 
          document.querySelector('.loginAlert').style.display = "none"; 
        }, 3000);
      });
    }
  }
  else {
    document.querySelector('.loginAlert').textContent = "Please enter both email and password!";
    document.querySelector('.loginAlert').style.display = "block";
    setTimeout(function() { 
      document.querySelector('.loginAlert').style.display = "none"; 
    }, 3000);
  }
}

document.querySelector('.signup-btn').addEventListener('click', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);