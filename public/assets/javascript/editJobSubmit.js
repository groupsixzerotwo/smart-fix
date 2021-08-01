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

document.querySelector('.editJobCancelBtn').addEventListener('click', editJobCancelBtnHandler);
document.querySelector('.editJobSubmitBtn').addEventListener('click', editJobSubmitBtnHandler);
