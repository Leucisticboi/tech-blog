const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#edit-title').value.trim();
  const body = document.querySelector('#edit-body').value.trim();

  if (title && body) {
    const postId = window.location.pathname.split('/').pop();
    console.log(postId);
    
    const response = await fetch(`/api/blog/edit/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, body }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/blog/${postId}`);
    } else {
      console.log('Failed to update the post. Server response:', response);
    }
  }
};

const deletePost = async (event) => {
  event.preventDefault();

  const postId = window.location.pathname.split('/').pop();

  const response = await fetch(`/api/blog/delete/${postId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    const username = response.json();
    document.location.replace(`/dashboard/${username}`);
  } else {
    console.log('Failed to delete the post');
  }
}

document.querySelector('#post-edit-form').addEventListener('submit', editFormHandler);

document.querySelector('#delete-post').addEventListener('click', deletePost);