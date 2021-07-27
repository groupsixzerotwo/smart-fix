async function postForm(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value.trim();
  const post_text = document
    .querySelector('input[name="post_text"]')
    .value.trim();

  if (title) {
    const response = await fetch("api/posts", {
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
      document.location.replace("/api/posts");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector(".post-form").addEventListener("submit", postForm);
