document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.querySelector('.form-container');
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    const signupLink = document.querySelector('.signup-link');
    const loginLink = document.querySelector('.login-link');
    
    signupLink.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    });
    
    loginLink.addEventListener('click', () => {
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    });
        // Handle login form submission
// Handle login form submission
const loginFormElement = document.getElementById('loginForm');
const errorLogin = document.createElement('p');
errorLogin.classList.add('error-message');
loginFormElement.appendChild(errorLogin);

loginFormElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginFormElement);
    const data = Object.fromEntries(formData);

    if (!data.username || !data.password) {
        errorLogin.textContent = 'Invalid username or password. Please provide both fields.';
        return;
    }

    try {
        const response = await fetch('/login-admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log('Login successful');
            errorLogin.textContent = ''; // Clear any previous error message
            setTimeout(() => {
                window.location.href = '/dashboard-admin'; // Redirect to the dashboard after 2 seconds
            }, 2000);
        } else {
            console.error('Login failed');
            errorLogin.textContent = responseData.error || 'An error occurred. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        errorLogin.textContent = 'An error occurred. Please try again.';
    }
});

// Handle sign-up form submission
const signupFormElement = document.getElementById('signupForm');
const errorSignup = document.createElement('p');
errorSignup.classList.add('error-message');
signupFormElement.appendChild(errorSignup);

const successMessage = document.createElement('p');
successMessage.classList.add('success-message');
signupFormElement.appendChild(successMessage);

signupFormElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(signupFormElement);
    const data = Object.fromEntries(formData);

    if (!data.username || !data.email || !data.password) {
        errorSignup.textContent = 'Invalid username, email, or password. Please provide all required fields.';
        return;
    }

    try {
        const response = await fetch('/signup-admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log('Sign-up successful');
            errorSignup.textContent = ''; // Clear any previous error message
            successMessage.textContent = 'Sign-up successful. Redirecting to login page...';
            setTimeout(() => {
                window.location.href = '/login-admin'; // Redirect to the login page after 2 seconds
            }, 2000);
        } else {
            console.error('Sign-up failed');
            errorSignup.textContent = responseData.error || 'An error occurred. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        errorSignup.textContent = 'An error occurred. Please try again.';
    }
});
const backButton = document.getElementById('backButton');

    backButton.addEventListener('click', () => {
        window.location.href = '/login';
    });
});
