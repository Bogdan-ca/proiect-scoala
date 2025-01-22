function logout() {
    try {
        // Check if user is logged in
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            console.log('No user logged in');
            return;
        }

        // Clear all storage
        localStorage.clear();
        
        // Force redirect and prevent caching
        window.location.replace('login.html');
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Add event listener when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('button[onclick="logout()"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});