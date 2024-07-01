// admin-dashboard.js
const addTeacherForm = document.getElementById('addTeacherForm');
const teacherEmailInput = document.getElementById('teacherEmail');
const teacherList = document.getElementById('teacherList');
const userTableBody = document.getElementById('userTableBody');

// Function to add teacher email
addTeacherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const teacherEmail = teacherEmailInput.value;

    // Perform fetch request to add teacher email to the database
    // Replace the URL with your backend endpoint to add teacher email
    fetch('/add-teacher-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: teacherEmail }),
    })
    .then(response => {
        if (response.ok) {
            // Add the email to the list or display a success message
            alert('Teacher email added successfully!'); // Basic alert message
        } else {
            // Handle error response
            alert('Error adding Teacher email!');
        }
    })
    .catch(error => console.error('Error adding teacher email:', error));

    // Clear input field
    teacherEmailInput.value = '';
});

// // Function to fetch and display user details in the table
function displayUserDetails() {
    // Perform fetch request to get all user details from the database
    // Replace the URL with your backend endpoint to fetch user details
    fetch('/get-all-users')
        .then(response => response.json())
        .then(data => {
            userTableBody.innerHTML = ''; // Clear existing table data
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                `;
                userTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching user details:', error));
}


// // Call the function to display user details when the page loads
displayUserDetails();

const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', () => {
        window.location.href = '/login';
    });
