const getAssignData = async (order_number) => {
  const assignData = await fetch(`/api/assignment/orderNum`, {
    method: 'POST',
    body: JSON.stringify({
      order_number
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  if (assignData.ok) {
    return assignData.json();
  } else {
    console.log(assignData.err)
  }
};

const deleteAssignBtnHandler = async () => {
  const order_number = document.querySelector('.AssignOrderNumber').innerHTML;
  if (order_number) {
    getAssignData(order_number)
      .then(async (assignmentData) => {
        if (assignmentData.approved_status) {
          const statusUpdate = await fetch(`/api/jobs/${assignmentData.job_id}`, {
            method: 'PUT',
            body: JSON.stringify({
              status_id: 2
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (statusUpdate.ok) {
            console.log("Status updated");
          } else {
            console.log(response.statusText);
          }
        }
      });

    const response = await fetch(`/api/assignment/delete`, {
      method: 'POST',
      body: JSON.stringify({
        order_number
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if(response.ok) {
      console.log(order_number)
    } else {
      console.log(response.statusText);
    }
  }
  document.location.reload();
};

const editAssignBtnHandler = async (event) => {
  event.preventDefault();
  const order_number = document.querySelector('.AssignOrderNumber').innerHTML;

  getAssignData(order_number)
    .then(data => {
      document.querySelector('.editDeleteBtn').style.display = "none";
      document.querySelector('#editAssignForm').style.display = "block";
      console.log(data)
      document.querySelector('#assignEditCost').value = data.cost;
      //document.querySelector('#assignEditOrderNumber').value = data.order_number;
      document.querySelector('#assignEditStartDate').value = data.start_date;
      document.querySelector('#assignEditCompleteDate').value = data.complete_date;
    })
};

document.querySelector('.editAssignBtn').addEventListener('click', editAssignBtnHandler);
document.querySelector('.deleteAssignBtn').addEventListener('click', deleteAssignBtnHandler);