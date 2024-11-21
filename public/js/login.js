document.getElementById('loginForm').addEventListener('submit', function(event) {
  
    const username = document.querySelector('input[name="userName"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();

  
    if (!username || !password) {
        alert("All fields must be filled out.");
        event.preventDefault(); 
        return;
    }
});
