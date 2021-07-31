const editAssignCancelBtnHandler = (event) => {
  event.preventDefault();
  document.querySelector('.editDeleteBtn').style.display = "block";
  document.querySelector('#editAssignForm').style.display = "none";
};

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

const editAssignSubmitBtnHandler = async (event) => {
  event.preventDefault();
  const cost = document.querySelector('#assignEditCost').value;
  const order_number = document.querySelector('.AssignOrderNumber').innerHTML;
  const start_date = document.querySelector('#assignEditStartDate').value;
  const complete_date = document.querySelector('#assignEditCompleteDate').value;
  let assignObject = {}

  if (!start_date && !complete_date) {
    assignObject = {cost, order_number};
  } else if (start_date && !complete_date) {
    assignObject = {cost, order_number, start_date};
  } else if (start_date && complete_date) {
    assignObject = {cost, order_number, start_date, complete_date};
  } else {
    document.querySelector('.loginAlert').textContent = "Please enter both email and password!";
    document.querySelector('.loginAlert').style.display = "block";
    setTimeout(function() { 
      document.querySelector('.loginAlert').style.display = "none"; 
    }, 3000);
    return;
  }


  let job_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  job_id = job_id.split('?')[0];

  getAssignmentId(order_number)
    .then(async (data) => {
      const response = await fetch(`/api/assignment/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(assignObject),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let promiseArray =[response];
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

      Promise.all(promiseArray).
        then(dataArray => {
          document.location.reload();
        });
    });
  
};

document.querySelector('.editAssignCancelBtn').addEventListener('click', editAssignCancelBtnHandler);
document.querySelector('.editAssignSubmitBtn').addEventListener('click', editAssignSubmitBtnHandler);