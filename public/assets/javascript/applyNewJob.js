const applyJobBtnHandler = (event) => {
  document.querySelector('.applyJobBtn').style.display = "none";
  document.querySelector('#applyJobForm').style.display = "block";
}

const applyJobCancelBtnHandler = (event) => {
  event.preventDefault();
  document.querySelector('#applyJobForm').style.display = "none";
  document.querySelector('.applyJobBtn').style.display = "block";
}

const applyJobFormHandler = async (event) => {
  event.preventDefault();
  const cost = document.querySelector('#assignmentCost').value.trim();
  const order_number = document.querySelector('#assignmentOrderNo').value.trim();
  let job_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  job_id = job_id.split('?')[0];
  if (cost && order_number && job_id) {
    const response = await fetch('/api/assignment', {
      method: 'POST',
      body: JSON.stringify({
        cost,
        order_number,
        job_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

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
      document.querySelector('.alertMessage').textContent = "Please try again!";
      document.querySelector('.alertMessage').style.display = "block";
      setTimeout(function() { 
        document.querySelector('.alertMessage').style.display = "none"; 
      }, 3000);
    }
  }
  else {
    document.querySelector('.alertMessage').textContent = "Cost and order number is required. Please try again!";
    document.querySelector('.alertMessage').style.display = "block";
    setTimeout(function() { 
      document.querySelector('.alertMessage').style.display = "none"; 
    }, 3000);
  }
}

document.querySelector('.applyJobBtn').addEventListener('click', applyJobBtnHandler);
document.querySelector('.applyJobForm').addEventListener('submit', applyJobFormHandler);
document.querySelector('.applyJobCancelBtn').addEventListener('click', applyJobCancelBtnHandler);