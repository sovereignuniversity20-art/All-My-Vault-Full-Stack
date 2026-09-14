# All My Vault 🏦

*A personal media vault to store, organize, and access what matters.*

![All My Vault login](./screenshots/login.png)
![All My Vault dashboard](./screenshots/dashboard.png)

## About

All My Vault is a local-first React media archive that allows you to safely and securely store various types of media. This personalized approach allows you to access, organize, index and establish connections across media. Add, edit and delete media as needed in one easy to navigate, simple to use, centralized space.


## Features

- Simulated login and signup with full form validation (regex email + password strength)
- Cinematic vault door unlock animation (CSS transitions + React state)
- Add, rename, and delete media items (full CRUD via React state)
- Automatic file type detection and thumbnail generation on upload
- Live search across titles and tags
- Filter by media type (image, audio, video, PDF)
- Vault Stats inventory toggle
- About manifest overlay accessible from both pages
- Protected routing with React Router
- Fully responsive across desktop, tablet, and mobile
- Custom brand identity: original logo, palette, and vault imagery

## Tech Stack

- React 18 with Vite
- React Router
- CSS — Grid, Flexbox, custom properties, media queries, animations
- Google Fonts: Abril Fatface + Lato

## Getting Started

```bash
git clone https://github.com/sovereignuniversity20-art/all-my-vault.git
cd all-my-vault
npm install
npm run dev
```

Open the local URL Vite prints (typically http://localhost:5173).

## Using the Vault

**Sign up** with any name, a valid email format (something@something.xyz),
and a password containing at least:
- 8 characters
- one uppercase letter
- one lowercase letter
- one number
- one special character (! @ # $ %)

Accounts are simulated in session state — they reset on refresh.
Backend persistence arrives in v2.

## Roadmap

**v2 (planned):**
- Media card lightbox view
- Card layout redesign
- Positioning architecture cleanup
- Node/Express backend with real authentication and file storage

## Author

Shawn "Hero" Harrell
LaunchCode Full-Time Software Development, 2026
