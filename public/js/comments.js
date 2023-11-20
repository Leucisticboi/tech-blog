// Function to handle the submission of a new comment
const newCommentHandler = async (req, res) => {
  try {
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

// Attach the newCommentHandler function to the form submission event
document.querySelector('#comment-form').addEventListener('submit', newCommentHandler);