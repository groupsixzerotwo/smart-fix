//----LOGIC FOR CUSTOMER TO APPROVE AN ASSIGNMENT----//
const approveAssignmentHandler = async (event) => {
  event.preventDefault();
  //If approve button clicked
  if (event.target.matches(".approveAssignmentBtn")) {
    //Find the closest orderNumber class in the table row
    const order_number = event.target.closest('tr').querySelector('.orderNumber').innerText
    //Fetch assignment data with order number
    const assignData = await fetch(`/api/assignment/orderNum`, {
      method: 'POST',
      body: JSON.stringify({
        order_number
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (assignData.ok) {
      assignData.json()
        .then(async (data) => {
          //Update assignment status to approve
          const assignmentUpdate = await fetch(`/api/assignment/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              approved_status: true
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          //Update job status id to 3
          const jobUpdate = await fetch(`/api/jobs/${data.job_id}`, {
            method: 'PUT',
            body: JSON.stringify({
              status_id: 3
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          Promise.all([assignmentUpdate, jobUpdate])
            .then(([assignData, jData]) => {
              document.location.reload();
            })
        })
    }
    else {
      //error message
      document.querySelector('.alertMessage').textContent = "Internal server error. Please try again later!";
      document.querySelector('.alertMessage').style.display = "block";
      setTimeout(function() { 
        document.querySelector('.alertMessage').style.display = "none"; 
      }, 3000);
    }
  }
}

document.querySelector('.allApplicationList').addEventListener('click', approveAssignmentHandler);