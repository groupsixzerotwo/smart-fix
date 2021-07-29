const deleteAssignBtnHandler = async () => {
  const order_number = document.querySelector('.AssignOrderNumber').innerHTML;
  if (order_number) {
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
      document.location.replace('/orders');
    }
  }
};

const editAssignCancelBtnHandler = (event) => {
  event.preventDefault()
  document.querySelector('.editDeleteBtn').style.display = "block";
  document.querySelector('#editAssignForm').style.display = "none";
};

const editAssignBtnHandler = async (event) => {
  const order_number = document.querySelector('.AssignOrderNumber').innerHTML;

  const assignData = await fetch(`/api/assignment/approve`, {
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
        const assignmentData = await fetch(`/api/assignment/${data.id}`);

        if (assignmentData.ok) {
          document.querySelector('.editDeleteBtn').style.display = "none";
          document.querySelector('#editAssignForm').style.display = "block";
          assignmentData.json()
            .then(data => {
              console.log(data)
              document.querySelector('#assignEditCost').value = data.cost;
              document.querySelector('#assignEditOrderNumber').value = data.order_number;
              document.querySelector('#assignEditStartDate').value = data.start_date;
              document.querySelector('#assignEditCompleteDate').value = data.complete_date;
            });
        }
      });
  }
};

document.querySelector('.editAssignBtn').addEventListener('click', editAssignBtnHandler);
document.querySelector('.deleteAssignBtn').addEventListener('click', deleteAssignBtnHandler);
document.querySelector('.editAssignCancelBtn').addEventListener('click', editAssignCancelBtnHandler);
//document.querySelector('.editAssignSubmitBtn').addEventListener('click', editAssignSubmitBtnHandler);