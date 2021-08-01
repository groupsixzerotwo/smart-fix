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
};

const editJobBtnHandler = async (event) => {
  event.preventDefault()
  let job_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  job_id = job_id.split('?')[0];

  document.querySelector('.editDeleteBtn').style.display = "none";
  document.querySelector('#editJobForm').style.display = "block";

  const response = await fetch(`/api/jobs/${job_id}`);

  if(response.ok) {
    response.json()
      .then(jobData => {
        document.querySelector('#jobEditTitle').value = jobData.job_title;
        document.querySelector('#jobEditDescription').value = jobData.job_text;
        document.querySelector('#jobEditAddress').value = jobData.job_address;
        document.querySelector('#jobEditContact').value = jobData.job_contact;
      })
  }
};

document.querySelector('.jobEditBtn').addEventListener('click', editJobBtnHandler);
document.querySelector('.jobDeleteBtn').addEventListener('click', deleteJobBtnHandler);