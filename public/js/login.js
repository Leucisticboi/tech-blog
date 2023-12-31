// Function to handle the login form submission
const loginFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the user's email and password from the form
  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  // Log the values
  console.log('Email:', email);
  console.log('Password:', password);

  // Check if both email and password are provided
  if (email && password) {
    // Send a POST request to the server to log the user in
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the server responded with a success status
    if (response.ok) {
      const user = await response.json();
      const username = user.username;

      // Redirect to the home page after successful login
      document.location.replace(`/dashboard/${username}`);

      // Clear input fields
      document.querySelector('#login-email').value = '';
      document.querySelector('#login-password').value = '';
    } else {
      // Log and return an error message if login fails
      console.log('Failed to log in');
    }
  }
}

// Event listener for the login form submission
document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);

// Event listener to check for input events
document
  .querySelector('#login-form')
  .addEventListener('input', (event) => {
    console.log('Input Event:', event);
  });
