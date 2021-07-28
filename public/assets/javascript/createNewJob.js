const createJobBtnHandler = (event) => {
  event.preventDefault();
  document.querySelector('.createJobBtn').style.display = "none";
  document.querySelector('#addNewJobForm').style.display = "block";
}

const createobCancelBtnHandler = (event) => {
  event.preventDefault();
  document.querySelector('#addNewJobForm').style.display = "none";
  document.querySelector('.createJobBtn').style.display = "block";
}

const createJobFormHandler = async (event) => {
  event.preventDefault();
  const job_title = document.querySelector('#jobTitle').value.trim();
  const job_text = document.querySelector('#jobText').value.trim();
  const job_address = document.querySelector('#jobAddress').value.trim();
  const job_contact = document.querySelector('#jobContact').value.trim();

  if (job_title && job_text && job_address && job_contact) {
    const response = await fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify({
        job_title,
        job_text,
        job_address,
        job_contact,
        status_id: 1,  
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
    }
    else {
      document.querySelector('.alertMessage').textContent = "Please try again!";
      document.querySelector('.alertMessage').style.display = "block";
      setTimeout(function() { 
        document.querySelector('.alertMessage').style.display = "none"; 
      }, 3000);
    }
  }
  else {
    document.querySelector('.alertMessage').textContent = "All fields are required. Please try again!";
    document.querySelector('.alertMessage').style.display = "block";
    setTimeout(function() { 
      document.querySelector('.alertMessage').style.display = "none"; 
    }, 3000);
  }
}

document.querySelector('.createJobBtn').addEventListener('click', createJobBtnHandler);
document.querySelector('.addNewJobForm').addEventListener('submit', createJobFormHandler);
document.querySelector('.createJobCancelBtn').addEventListener('click', createobCancelBtnHandler);