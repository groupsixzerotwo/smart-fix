const deleteJobBtnHandler = async () => {
  let job_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  job_id = job_id.split('?')[0];
  if (job_id) {
    const response = await fetch(`/api/jobs/${job_id}`, {
      method: 'DELETE',
    });

    if(response.ok) {
      document.location.replace('/orders');
    }
  }
}

document.querySelector('.jobDeleteBtn').addEventListener('click', deleteJobBtnHandler);