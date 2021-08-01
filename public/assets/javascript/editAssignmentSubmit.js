//----CANCEL EDIT ASSIGNMENT BUTTON LOGIC----//

const editAssignCancelBtnHandler = (event) => {
  event.preventDefault();
  document.querySelector('.editDeleteBtn').style.display = "block";
  document.querySelector('#editAssignForm').style.display = "none";
};

//----GET ASSIGNMENT ID WITH ORDER NUMBER----//
const getAssignmentId = async (order_number) => {
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
  }
}

//----EDIT ASSIGNMENT SUBMIT BUTTON----//
const editAssignSubmitBtnHandler = async (event) => {
  event.preventDefault();
  const cost = document.querySelector('#assignEditCost').value;
  const order_number = document.querySelector('.AssignOrderNumber').innerHTML;
  const start_date = document.querySelector('#assignEditStartDate').value;
  const complete_date = document.querySelector('#assignEditCompleteDate').value;
  let assignObject = {}
  if (!cost) {
    document.querySelector('.alertMessage').textContent = "Cost cannot be empty. Please try again!";
    document.querySelector('.alertMessage').style.display = "block";
    setTimeout(function() { 
      document.querySelector('.alertMessage').style.display = "none"; 
    }, 3000);
    return;
  }
  if (!start_date && !complete_date) {
    assignObject = {cost, order_number};
  } else if (start_date && !complete_date) {
    assignObject = {cost, order_number, start_date};
  } else {
    assignObject = {cost, order_number, start_date, complete_date};
  }

  let job_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  job_id = job_id.split('?')[0];

  getAssignmentId(order_number)
    .then(async (data) => {
      //Edit assignment data
      const response = await fetch(`/api/assignment/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(assignObject),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let promiseArray =[response];
      //Check if job status needs to be updated
      //if complete date is filled, change job status to 5
      if (complete_date) {
        const jobEditData = await fetch(`/api/jobs/${job_id}`, {
          method: 'PUT',
          body: JSON.stringify({
            status_id: 5
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        promiseArray.push(jobEditData);
        //if start date date is filled, change job status to 4
      } else if (start_date && !complete_date) {
        const jobEditData = await fetch(`/api/jobs/${job_id}`, {
          method: 'PUT',
          body: JSON.stringify({
            status_id: 4
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        promiseArray.push(jobEditData);
      }

      //Call all promises
      const allPromise = Promise.all(promiseArray);
        let promiseOk = true;
        //pk check for each promise
        (await allPromise).forEach(promise => {
          if (!promise.ok) {
            promiseOk = false;
          }
        });
        //Error message for promises
        if (promiseOk) {
          document.location.reload()
        } else {
          document.querySelector('.alertMessage').textContent = "Cost should be a decimal or number!";
          document.querySelector('.alertMessage').style.display = "block";
          setTimeout(function() { 
            document.querySelector('.alertMessage').style.display = "none"; 
          }, 3000);console.log(allPromise)
        }

    });
  
};

document.querySelector('.editAssignCancelBtn').addEventListener('click', editAssignCancelBtnHandler);
document.querySelector('.editAssignSubmitBtn').addEventListener('click', editAssignSubmitBtnHandler);