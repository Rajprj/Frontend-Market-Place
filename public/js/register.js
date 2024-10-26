document.getElementById('registrationForm').addEventListener('submit', function (event) {
    // Get the values from the input fields
    const username = document.querySelector('input[name="userName"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const fullName = document.querySelector('input[name="fullName"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Username validation: must start with a letter and end with a number
    const usernamePattern = /^[a-zA-Z]+\d+$/;
    if (!usernamePattern.test(username)) {
        alert("Username must start with a letter and end with a number.");
        event.preventDefault(); // Prevent the form from submitting
        return;
    }

    // Email validation: basic email format validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        event.preventDefault(); // Prevent the form from submitting
        return;
    }

    // Full Name validation: must only contain letters and spaces
    const fullNamePattern = /^[a-zA-Z\s]+$/;
    if (!fullNamePattern.test(fullName)) {
        alert("Full name can only contain letters and spaces.");
        event.preventDefault(); // Prevent the form from submitting
        return;
    }

    // Password validation: must be at least 6 characters long, contain at least one lowercase letter and one number
    const passwordPattern = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;
    if (!passwordPattern.test(password)) {
        alert("Password must be at least 6 characters long and contain a lowercase letter and a number.");
        event.preventDefault(); // Prevent the form from submitting
        return;
    }
    
    
});
