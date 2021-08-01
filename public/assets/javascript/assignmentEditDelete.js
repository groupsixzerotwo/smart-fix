//----GET ASSIGNMENT DATA WITH ORDER NUMBER----//
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

//----ASSIGNMENT DELETE BUTTON FOR SERVICE PROVIDERS----//
const deleteAssignBtnHandler = async () => {
  const order_number = document.querySelector('.AssignOrderNumber').innerHTML;
  if (order_number) {
    //Get assignment data with order number
    getAssignData(order_number)
      .then(async (assignmentData) => {
        //If assignment is approved, change the status of the job to two before deleting
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
    //Delete the assignment with order number
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
      console.log("Assignment deleted")
    } else {
      console.log(response.statusText);
    }
  }
  //reload once done
  document.location.reload();
};

//LOGIC FOR EDIT BUTTON WHEN CLICKED BY SERVICE PROVIDER
const editAssignBtnHandler = async (event) => {
  event.preventDefault();
  //Get order number
  const order_number = document.querySelector('.AssignOrderNumber').innerHTML;

  getAssignData(order_number)
    .then(data => {
      //Display form
      document.querySelector('.editDeleteBtn').style.display = "none";
      document.querySelector('#editAssignForm').style.display = "block";
      //Fill form with data
      document.querySelector('#assignEditCost').value = data.cost;
      if (data.start_date || data.complete_date) {
        document.querySelector('#assignEditStartDate').value = data.start_date;
        document.querySelector('#assignEditCompleteDate').value = data.complete_date;
      }  
    });
};

document.querySelector('.editAssignBtn').addEventListener('click', editAssignBtnHandler);
document.querySelector('.deleteAssignBtn').addEventListener('click', deleteAssignBtnHandler);