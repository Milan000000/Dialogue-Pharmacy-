
# Dialogue Pharmacy - MVP Staff Portal & Public Website

A modern, maintainable, and responsive pharmacy website with a built-in secure staff dashboard. Built with vanilla HTML, CSS, and JS (via Tailwind CSS).

## 🚀 Key Features
- **Public Website:** Home, About, Services, and Contact pages.
- **Dynamic Content:** Products and Notices added via the Staff Portal appear automatically on the public site.
- **Staff Dashboard:** Securely manage inventory and announcements.
- **Data Persistence:** Uses Browser LocalStorage (no backend required).
- **Mobile First:** Fully responsive design using Tailwind utility classes.

## 🛠️ Tech Stack
- **HTML5 / CSS3 / ES6+ JavaScript**
- **Styling:** Tailwind CSS (CDN)
- **Icons:** FontAwesome
- **Storage:** Web LocalStorage API

## 🔑 Staff Login Instructions
1. Navigate to the **Staff Login** link in the navigation menu or go directly to `staff-login.html`.
2. Enter the secure password: `birnintudu`
3. Upon successful login, you will be redirected to the `staff.html` dashboard.
4. From here, you can:
   - Add/Edit/Delete Pharmacy Products.
   - Post/Delete Public Announcements.

## 💻 Running Locally
1. Download or clone this repository.
2. Open `index.html` in any modern web browser.
3. *Note: Since this is a static site, no server environment is needed.*

## 🌍 Deployment

### GitHub Pages
1. Push this project to a new GitHub repository.
2. Go to **Settings > Pages**.
3. Select the `main` branch and `/ (root)` folder.
4. Save and your site will be live at `https://[username].github.io/[repo-name]/`.

### Vercel
1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect the static files.
3. Click **Deploy**.

## 📁 File Structure
- `index.html`: Home page (Public).
- `about.html`: Company mission and team.
- `services.html`: Service list and featured products.
- `contact.html`: Validated contact form.
- `staff-login.html`: Secure gateway.
- `staff.html`: Protected management dashboard.
- `js/main.js`: Handles public data rendering and site-wide interactivity.
- `js/staff-auth.js`: Handles session logic and password verification.
- `js/staff-dashboard.js`: Handles Product/Notice CRUD operations.

---
**Disclaimer:** This is a client-side MVP. Security is implemented via client-side JavaScript for demonstration/private-use purposes. For high-security environments, a real backend with JWT/OAuth is recommended.
