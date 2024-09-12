// Simulate login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form from submitting

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic form validation (you can add more logic as needed)
    if (username && password) {
        alert(`Welcome, ${username}!`);
    } else {
        alert('Please enter both username and password.');
    }

    // Here you would handle the actual authentication logic.
});
