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

const editJobCancelBtnHandler = (event) => {
  event.preventDefault()
  document.querySelector('.editDeleteBtn').style.display = "block";
  document.querySelector('#editJobForm').style.display = "none";
};

const editJobSubmitBtnHandler = async (event) => {
  event.preventDefault()
  let job_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  job_id = job_id.split('?')[0];

  job_title = document.querySelector('#jobEditTitle').value;
  job_text = document.querySelector('#jobEditDescription').value;
  job_address = document.querySelector('#jobEditAddress').value;
  job_contact = document.querySelector('#jobEditContact').value;

  const response = await fetch(`/api/jobs/${job_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      job_title,
      job_text,
      job_address,
      job_contact
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.reload();
  }
}

document.querySelector('.jobEditBtn').addEventListener('click', editJobBtnHandler);
document.querySelector('.jobDeleteBtn').addEventListener('click', deleteJobBtnHandler);
document.querySelector('.editJobCancelBtn').addEventListener('click', editJobCancelBtnHandler);
document.querySelector('.editJobSubmitBtn').addEventListener('click', editJobSubmitBtnHandler);