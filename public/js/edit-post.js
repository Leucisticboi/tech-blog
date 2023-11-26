const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#edit-title').value.trim();
  const body = document.querySelector('#edit-body').value.trim();

  // Check if both title and body are provided
  if (title && body) {
    // Extract the post ID from the current URL
    const postId = window.location.pathname.split('/').pop();
    console.log(postId);

    // Send a PUT request to update the blog post
    const response = await fetch(`/api/blog/edit/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, body }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the update was successful (status code 200)
    if (response.ok) {
      // Redirect to the updated blog post
      document.location.replace(`/blog/${postId}`);
    } else {
      // Log an error message if the update fails, including the server response
      console.log('Failed to update the post. Server response:', response);
      // You might want to provide more user-friendly feedback here
    }
  }
};

// Function to handle the deletion of a blog post
const deletePost = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Extract the post ID from the current URL
  const postId = window.location.pathname.split('/').pop();

  // Send a DELETE request to remove the blog post
  const response = await fetch(`/api/blog/delete/${postId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  // Check if the deletion was successful (status code 200)
  if (response.ok) {
    // Retrieve the username from the server response
    const { username } = await response.json();
    // Redirect to the dashboard of the user who deleted the post
    document.location.replace(`/dashboard/${username}`);
  } else {
    // Log an error message if the deletion fails
    console.log('Failed to delete the post');
    // You might want to provide more user-friendly feedback here
  }
}

document.querySelector('#post-edit-form').addEventListener('submit', editFormHandler);

document.querySelector('#delete-post').addEventListener('click', deletePost);