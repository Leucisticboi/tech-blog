// Function to handle the signup form submission
const signupFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  try {
    // Get user details from the signup form
    const username = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    const confirmPassword = document.querySelector('#signup-confirm-pass').value.trim();

    // Check if all required fields are provided
    if (username && email && password && confirmPassword) {

      // Console log passwords to make sure they are both defined
      console.log('Password: ', password);
      console.log('ConfirmPassword: ', confirmPassword);

      // Check if the password and confirm password match on the client side
      if (password !== confirmPassword) {
        return alert('Passwords do not match.');
      }

      // Send a POST request to the server to create a new user
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the server responded with a success status
      if (response.ok) {
        // Redirect to the home page after successful signup
        document.location.replace('/');
      } else {
        // Display an alert if signup fails
        return alert('Failed to sign up.');
      }
    }
  } catch (err) {
    // Log and return an error message if an error occurs during signup
    return console.log('Error signing up:', err);
  }
}

// Event listener for the signup form submission
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
});