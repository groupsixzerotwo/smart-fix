async function postForm(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value.trim();
  const post_text = document
    .querySelector('input[name="post_text"]')
    .value.trim();

  const response = await fetch("/posts", {
    method: "post",
    body: JSON.stringify({
      title,
      post_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/work-orders");
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".post-form").addEventListener("submit", postForm);
