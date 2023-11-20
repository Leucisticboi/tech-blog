const loginFormHandler = async (event) => {
  event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        return console.log('Failed to log in');
      }
    }
}

const signupFormHandler = async (event) => {
  event.preventDefault();

  try {
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const confirmPassword = document.querySelector('#confirm-password').value.trim();

    if (username && email && password && confirmPassword) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, confirmPassword }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        return alert('Failed to sign up.');
      }
    }
  } catch (err) {
    return console.log('Error signing up:', err);
  }
}

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);