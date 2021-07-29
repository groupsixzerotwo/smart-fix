const approveAssignmentHandler = async (event) => {
  event.preventDefault();

  let job_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const order_number = document.querySelector('.orderNumber').innerHTML;

  console.log(job_id, order_number)

  const assignData = await fetch(`/api/assignment/approve`, {
    method: 'POST',
    body: JSON.stringify({
      job_id,
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
            document.location.replace('/orders');
          })
      })
  }
  else {
    console.log("error", assignData)
  }
}

document.querySelector('.approveAssignmentBtn').addEventListener('click', approveAssignmentHandler);