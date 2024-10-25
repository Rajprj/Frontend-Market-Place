document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Get the values from the input fields
    const username = document.querySelector('input[name="userName"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

    // Check if any field is empty
    if (!username || !password) {
        alert("All fields must be filled out.");
        event.preventDefault(); // Prevent the form from submitting
        return;
    }
});
