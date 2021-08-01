//----SUGNUP LOGIC____//
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('.username-signup').value.trim();
  const email = document.querySelector('.email-signup').value.trim();
  const password = document.querySelector('.password-signup').value.trim();
  //check if service
  const sp = document.querySelector("input[name=serviceYesNo]:checked").value;
  //capture service id - default null
  let service_id = null ;
  if (sp === "Yes") {
    service_id = document.querySelector("input[name=service-list]:checked").value;
  };
  //Check all inputs are selected
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
      document.location.replace('/')
    } 
    else {
      //error message
      response.text().then(text => {
        document.querySelector('.loginAlert').textContent = text.split('"')[3];
        document.querySelector('.loginAlert').style.display = "block";
        setTimeout(function() { 
          document.querySelector('.loginAlert').style.display = "none"; 
        }, 3000);
      });
    }
  }
  else {
    //error message
    document.querySelector('.loginAlert').textContent = "All fields are required. Please try again!!";
    document.querySelector('.loginAlert').style.display = "block";
    setTimeout(function() { 
      document.querySelector('.loginAlert').style.display = "none"; 
    }, 3000);
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