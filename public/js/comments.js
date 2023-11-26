// Function to handle the submission of a new comment
const newCommentHandler = async (event) => {
  try {
    event.preventDefault();
    // Retrieve the comment text from the input field and remove leading/trailing whitespaces
    const commentText = document.querySelector('#new-comment').value.trim();

    // Extract the post ID from the current URL
    const postId = document.location.pathname.split('/').pop();

    // Check if the comment text is not empty
    if (commentText) {
      // Send a POST request to the server to create a new comment
      const response = await fetch('/api/comment/new', {
        method: 'POST',
        body: JSON.stringify({ commentText, postId }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the server responded with a success status
      if (response.ok) {
        // Reload the page to display the updated comments
        document.location.reload();
      } else {
        // Log an error message if the server response indicates failure
        return console.log('Failed to post new comment');
      }
    }
  } catch (err) {
    // Log and respond with an error if an issue occurs during comment submission
    console.error(err);
    res.status(500).json(err);
  }
}

// Create a request to login to comment
const loginToComment = async (event) => {
  try {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Fetch login status from the server
    const response = await fetch('/login', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the response is successful (status code 200)
    if (response.ok) {
      // Log a success message if login is successful
      console.log('Login successful!');
      // You might want to redirect the user or perform other actions upon successful login
    } else {
      // Log an error message if login fails
      console.log('Failed to login');
    }
  } catch (err) {
    // Log any unexpected errors during the login process
    console.error(err);
    // Respond with a 500 status and send the error as JSON
    res.status(500).json(err);
}

document.addEventListener('DOMContentLoaded', (event) => {
  event.preventDefault();
  // Attach the newCommentHandler function to the form submission event
  document.querySelector('#comment-form').addEventListener('submit', newCommentHandler);

  // Attach the loginToComment function to the login button click event
  document.querySelector('#login-to-comment').addEventListener('click', loginToComment);
});