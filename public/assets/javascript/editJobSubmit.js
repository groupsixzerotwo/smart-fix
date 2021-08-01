//----LOGIC FOR JIB SUBMIT OR CANCEL----//

//----JOB EDIT CANCEL BUTTON----//
const editJobCancelBtnHandler = (event) => {
  event.preventDefault()
  document.querySelector('.editDeleteBtn').style.display = "block";
  document.querySelector('#editJobForm').style.display = "none";
};

const editJobSubmitBtnHandler = async (event) => {
  event.preventDefault()
  //Get job id
  let job_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  job_id = job_id.split('?')[0];
  //Get all values
  job_title = document.querySelector('#jobEditTitle').value;
  job_text = document.querySelector('#jobEditDescription').value;
  job_address = document.querySelector('#jobEditAddress').value;
  job_contact = document.querySelector('#jobEditContact').value;

  const response = await fetch(`/api/jobs/${job_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      job_title,
      job_text,
      job_address,
      job_contact
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.reload();
  } else {
    response.text().then(text => {
      //Get error message
      console.log(text)
      document.querySelector('.alertMessage').textContent = text.split('"')[3];
      document.querySelector('.alertMessage').style.display = "block";
      setTimeout(function() { 
        document.querySelector('.alertMessage').style.display = "none"; 
      }, 3000);
    });
  }
}

document.querySelector('.editJobCancelBtn').addEventListener('click', editJobCancelBtnHandler);
document.querySelector('.editJobSubmitBtn').addEventListener('click', editJobSubmitBtnHandler);
