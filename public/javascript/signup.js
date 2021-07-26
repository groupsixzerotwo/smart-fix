async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const sp = document.querySelector("input[name=service]:checked").value;
  let service_id = null;
  if (sp === "Yes") {
    const service = document.querySelector("select[name=service-type]");//.value.trim();
    service_id = service.options[service.selectedIndex].value
  }

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

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);