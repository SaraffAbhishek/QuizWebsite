document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.dashboard-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.toLowerCase();
            window.location.href = `/${buttonText}`;
        });
    });
    const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', () => {
        window.location.href = '/login';
    });
});