
/**
 * staff-auth.js
 * Handles secure login using the password 'birnintudu'
 */

const SECRET_PASSWORD = 'birnintudu';
const AUTH_KEY = 'lifecare_staff_session';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const passwordInput = document.getElementById('password').value;

            if (passwordInput === SECRET_PASSWORD) {
                // Set simple session flag (timestamp based for basic security)
                localStorage.setItem(AUTH_KEY, Date.now().toString());
                
                // Redirect to dashboard
                window.location.href = 'staff.html';
            } else {
                errorDiv.classList.remove('hidden');
                // Shake effect
                loginForm.classList.add('animate-pulse');
                setTimeout(() => loginForm.classList.remove('animate-pulse'), 500);
            }
        });
    }
});

/**
 * Utility to check if user is authenticated
 */
function checkAuth() {
    const session = localStorage.getItem(AUTH_KEY);
    if (!session) {
        window.location.href = 'staff-login.html';
        return false;
    }
    return true;
}

/**
 * Global Logout
 */
function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = 'index.html';
}
