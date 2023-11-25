// Function to handle sending new post information to the server
const newPostHandler = async (event) => {
  try {
    event.preventDefault();
    
    // Get the post title and body from the form
    const postTitle = document.querySelector('#new-title').value.trim();
    const postBody = document.querySelector('#new-body').value.trim();

    // If both fields have content, send a POST request to the server
    if (postTitle && postBody) {

      const response = await fetch('/api/blog/new', {
        method: 'POST',
        body: JSON.stringify({ postTitle, postBody }),
        headers: { 'Content-Type': 'application/json' },
      });

      // If the response is ok, redirect to the dashboard page using the username from the response
      if (response.ok) {
        const username = await response.json();

        document.location.replace(`/dashboard/${username}`);
      } else {
        return alert('Failed to create new post.');
      }
    }
  } catch (err) {
    return console.log('Error creating new post:', err);
  }
}

// Event listener for the new post form submit button
document.querySelector('#new-post-form').addEventListener('submit', newPostHandler);