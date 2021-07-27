async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const sp = document.querySelector("input[name=serviceYesNo]:checked").value;
  let service_id = null;
  if (sp === "Yes") {
    const service = document.querySelector("input[name=service-list]:checked");
    service_id = service.value;//options[service.selectedIndex].value
  };

  console.log(username, email, password, sp, service_id)

  if (username && email && password && sp) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password,
        service_id
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // check the response status
    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      alert(response.statusText);
    }
  }
}

function serviceShow() {
  document.querySelector(".service-type").style.display = "block";
}

function serviceHide() {
  document.querySelector(".service-type").style.display = "none";
}

document.querySelector('#service-yes').addEventListener('click', serviceShow);
document.querySelector('#service-no').addEventListener('click', serviceHide);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);