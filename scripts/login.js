function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.replace('login.html');
}


document.addEventListener('DOMContentLoaded', () => {
    

    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    if (container){
        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });
        
        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });
        
    const checkBox = document.querySelector('#check');

        if (checkBox) {
            checkBox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    container.classList.add("hidden");
                } else {
                    container.classList.remove("hidden");
                }
            });
        }
        
        
        
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
            window.location.replace('account.html');
        });
        
        function errorlogin(error){
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-messages';
            errorDiv.innerHTML = `<p class="error">${error}</p>`;
            const existingErrors = document.querySelector('.error-messages');
            if (existingErrors) existingErrors.remove();
            loginForm.insertBefore(errorDiv, loginForm.firstChild);
        } 
        
        
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
    }
    else {
        const playerSelect = document.getElementById('player-select');
        playerSelect.innerHTML = '<option value="">Choose a player</option>';
    
    
        roster.forEach(player => {
            const option = document.createElement('option');
            option.value = player.id;
            option.textContent = `${player.number} - ${player.name} (${player.position})`;
            playerSelect.appendChild(option);
        });
    }

});
function savePlayer() {

        const playerSelect = document.getElementById('player-select');
        const selectedPlayer = playerSelect.value;
        
        if (!selectedPlayer) {
            alert('Please select a player');
            return;
        }
        
      
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
       
        currentUser.favoritePlayer = selectedPlayer;
        const userIndex = users.findIndex(u => u.username === currentUser.username);
        users[userIndex] = currentUser;
        
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('users', JSON.stringify(users));
        
        alert(`Favorite player ${selectedPlayer} saved!`);
        
}
function randomizePlayer() {
        const playerSelect = document.getElementById('player-select');
        const options = Array.from(playerSelect.options).slice(1);
        
        if (options.length === 0) {
            alert('No players available');
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * options.length);
        const randomPlayer = options[randomIndex];
        playerSelect.value = randomPlayer.value;
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        currentUser.favoritePlayer = randomPlayer.value;
        const userIndex = users.findIndex(u => u.username === currentUser.username);
        users[userIndex] = currentUser;
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('users', JSON.stringify(users));
        
        updatePlayerDisplay(randomPlayer.value);        
    
}
document.addEventListener('DOMContentLoaded', () => {
    
    checkLoginState();
    
    function checkLoginState() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const currentUser = localStorage.getItem('currentUser');
        
        if (isLoggedIn && currentUser) {
            if (window.location.pathname.includes('account.html'))
            {    const usernameSpan = document.getElementById('username');
                    if (usernameSpan) {
                        user = JSON.parse(currentUser);
                        usernameSpan.textContent = user.username;
                        console.log('User logged in:', user.username);
                    }
                    return
            }
            else
                window.location.href = 'account.html'; 

        }
        
        
        const usernameSpan = document.getElementById('username');
        if (usernameSpan) {
            const user = JSON.parse(currentUser);
            usernameSpan.textContent = user.username;
        }
    }

});
function updatePlayerDisplay(playerId) {
    const selectedPlayer = roster.find(p => p.id === parseInt(playerId));
    
    if (selectedPlayer) {
        document.querySelector('.player-info h4').textContent = selectedPlayer.name;
        document.getElementById('player-number').textContent = `#${selectedPlayer.number}`;
        document.getElementById('player-position').textContent = selectedPlayer.position;
        
        document.getElementById('player-points').textContent = selectedPlayer.stats.points;
        document.getElementById('player-assists').textContent = selectedPlayer.stats.assists;
        document.getElementById('player-rebounds').textContent = selectedPlayer.stats.rebounds;
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        currentUser.favoritePlayer = selectedPlayer.id;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

document.getElementById('player-select').addEventListener('change', (e) => {
    updatePlayerDisplay(e.target.value);
});

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser?.favoritePlayer) {
        updatePlayerDisplay(currentUser.favoritePlayer);
    }
});