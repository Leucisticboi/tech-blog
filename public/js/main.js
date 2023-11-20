// Function to handle the logout process
const logout = async () => {
  try {
    // Send a POST request to the server to log the user out
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    // Check if the server responded with a success status
    if (response.ok) {
      // Redirect to the home page after successful logout
      document.location.replace('/');
    } else {
      // Display an alert if the server response indicates failure
      alert('Failed to log out.');
    }
  } catch (err) {
    // Log and display an alert for any errors that occur during the logout process
    console.error(err);
    alert('Failed to log out. Please try again.');
  }
}

// Event listener for the logout button
document.querySelector('#logout-btn').addEventListener('click', logout);
