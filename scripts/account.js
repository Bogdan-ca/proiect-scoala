const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});



const loginForm = document.querySelector('.sign-in form');
const signupForm = document.querySelector('.sign-up form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username-input-login').value;
    const password = document.getElementById('password-input-login').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username);
    
    if (!user) {
        errorlogin(['User not found']);
        return;
    }
    
    if (user.password !== password) {
        errorlogin(['Invalid password']);
        return;
    }
    
    console.log('Login successful');
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'home.html';
});

function errorlogin(error){
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-messages';
    errorDiv.innerHTML = `<p class="error">${error}</p>`;
    const existingErrors = document.querySelector('.error-messages');
    if (existingErrors) existingErrors.remove();
    loginForm.insertBefore(errorDiv, loginForm.firstChild);
} 
function checkLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    if (!isLoggedIn || !currentUser) {
        window.location.href = 'sitelak.html';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'account.html';
}

// Add this to protected pages (home.html, etc)
document.addEventListener('DOMContentLoaded', checkLoginState);
let errors = [];

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errors = [];
    
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    const repeatPassword = document.getElementById('repeat-password-input').value;
    
    if (!username) errors.push('Username is required');
    if (!password) errors.push('Password is required');
    if (password !== repeatPassword) errors.push('Passwords do not match');
    if (password.length < 6) errors.push('Password must be at least 6 characters');
    
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.find(user => user.username === username)) {
            errors.push('Username already exists');
        }
        
        if (errors.length > 0) {
            displayErrors(errors);
            return;
        }
        
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        errors.push('Account created successfully');
        displayErrors(errors);
        container.classList.remove("active");
        
    } catch (error) {
        errors.push('Signup failed. Please try again.');
        displayErrors(errors);
    }
});

function displayErrors(errors) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-messages';
    errorDiv.innerHTML = errors.map(error => `<p class="error">${error}</p>`).join('');
    
   
    const existingErrors = document.querySelector('.error-messages');
    if (existingErrors) existingErrors.remove();
    
    signupForm.insertBefore(errorDiv, signupForm.firstChild);
}