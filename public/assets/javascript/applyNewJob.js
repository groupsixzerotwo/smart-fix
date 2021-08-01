//----HANDLES THE NEW APPLICATION TO A JOB LOGIC - IN SINGLE JOB PAGE----//

//----DISPLAYS THE FORM WHEN APPLY BUTTON IS CLICKED----//
const applyJobBtnHandler = (event) => {
  document.querySelector('.applyJobBtn').style.display = "none";
  document.querySelector('#applyJobForm').style.display = "block";
}

//----RELOADS THE PAGE WHEN CANCEL BUTTON IS CLICKED ON THE FORM----//
const applyJobCancelBtnHandler = (event) => {
  event.preventDefault();
  document.location.reload();
}

//----HANDLES THE NEW APPLICATION SUBMIT BUTTON LOGIC----//
const applyJobFormHandler = async (event) => {
  event.preventDefault();
  //Get the cost input in the form
  const cost = document.querySelector('#assignmentCost').value.trim();
  //get job id
  let job_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  job_id = job_id.split('?')[0];
  //post cost to create new assignment
  if (cost && job_id) {
    const response = await fetch('/api/assignment', {
      method: 'POST',
      body: JSON.stringify({
        cost,
        job_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    //Auto updates the job status to id 2
    if (response.ok) {
      fetch(`/api/jobs/${job_id}`, {
        method: 'PUT',
        body: JSON.stringify({
          status_id: 2
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        document.location.reload();
      })
      
    } 
    else {
      //error message
      document.querySelector('.alertMessage').textContent = "Cost must be a decimal. Please try again!";
      document.querySelector('.alertMessage').style.display = "block";
      setTimeout(function() { 
        document.querySelector('.alertMessage').style.display = "none"; 
      }, 3000);
    }
  }
  else {
    //error message
    document.querySelector('.alertMessage').textContent = "Cost is required. Please try again!";
    document.querySelector('.alertMessage').style.display = "block";
    setTimeout(function() { 
      document.querySelector('.alertMessage').style.display = "none"; 
    }, 3000);
  }
}

document.querySelector('.applyJobBtn').addEventListener('click', applyJobBtnHandler);
document.querySelector('.applyJobForm').addEventListener('submit', applyJobFormHandler);
document.querySelector('.applyJobCancelBtn').addEventListener('click', applyJobCancelBtnHandler);