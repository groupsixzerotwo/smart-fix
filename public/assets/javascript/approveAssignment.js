const approveAssignmentHandler = async (event) => {
  event.preventDefault();

  let job_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const order_number = document.querySelector('.orderNumber').innerHTML;

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
        const assignmentUpdate = await fetch(`/api/assignment/${data.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            approved_status: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

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
    console.log("error", assignData)
  }
}

document.querySelector('.approveAssignmentBtn').addEventListener('click', approveAssignmentHandler);