# All My Vault 🏦

*A full-stack, self-hostable personal media vault — store, organize, and access what matters, on infrastructure you control.*

<img width="480" height="268" alt="QXeJfE" src="https://github.com/user-attachments/assets/eb66607a-965c-4c90-bf3a-b1dcb4ef7f2a" />


---

## About

All My Vault is a full-stack personal media library built with a React frontend, a Java/Spring Boot REST API, and MySQL. Users authenticate via Spring Security JWT and get a private, user-scoped vault where media files are uploaded, stored, and served from the database, with full CRUD over a RESTful API.

What sets All My Vault apart is a simple conviction: your media should belong to you. The app is built local-first and self-hostable, which means your collection can live on infrastructure you own and control rather than being locked inside someone else's cloud. A managed hosting option is planned for convenience, but ownership is the default, not the exception.

All My Vault is for people who care about privacy, long-term stewardship of their archive, and the freedom to access their media without depending on a subscription or a company's continued existence.

---

## Features

- JWT-based authentication- register, login, logout, token blacklisting
- Private, user-scoped vault- every item is owned by and visible only to the authenticated user
- Full CRUD over a RESTful API- upload, view, rename, retag, and delete media items
- Real file storage- files stored as BLOBs in MySQL, served with dynamic content-type headers
- Automatic file type detection and thumbnail generation on upload
- Cinematic vault door unlock animation on login (CSS transitions + React state)
- Media lightbox with carousel navigation- click through all items with arrow buttons, keyboard, and dot indicators
- Video playback in lightbox
- PDF viewer- opens in browser tab
- Live search across titles and tags
- Filter by media type (image, audio, video, PDF)
- Password visibility toggle on login and registration
- Delete confirmation modal
- Upload success notification with auto-dismiss
- Vault Stats inventory toggle
- About manifest overlay accessible from both pages
- Fully responsive across desktop, tablet, and mobile
- Custom brand identity- original logo, palette, and vault imagery
- Self-hostable architecture- runs locally with your own MySQL instance, no cloud required

---

## Tech Stack

**Frontend**
- React 18 with Vite
- React Router
- Context API for global state and API integration
- CSS- Grid, Flexbox, custom properties, media queries, animations
- Google Fonts- Abril Fatface + Lato

**Backend**
- Java 26 / Spring Boot 4
- Spring Security with JWT (JJWT 0.9.1)
- Spring Data JPA / Hibernate
- MySQL
- ModelMapper
- Maven

---

## Architecture

All My Vault is built local-first. The backend runs against a MySQL instance you control — on your own machine, a home server, or a VPS. Cloud hosting is planned as a convenience layer in a future update, but self-hosting is the intended default for users who prioritize ownership and privacy.

All-My-Vault-Full-Stack/
├── Front-End/ ← React + Vite (runs on localhost:5173)
└── Back-End/demo/ ← Spring Boot REST API (runs on localhost:8080) 

---

## ERD

<img width="522" height="685" alt="Screenshot 2026-09-24 071213" src="https://github.com/user-attachments/assets/ccf2f68f-8102-41fb-85e7-2277c45a3719" />


*Two tables: `users` and `media_item` with a one-to-many relationship. Each media item is owned by one user via `user_id` foreign key.*

---

## Wireframes


<img width="1118" height="630" alt="amv login user" src="https://github.com/user-attachments/assets/1e7dbffe-213b-4219-9330-0e0633de734c" />
<img width="1117" height="632" alt="amv signup new" src="https://github.com/user-attachments/assets/ab8c6972-3ea2-43f0-850b-a89d633dce02" />
<img width="1120" height="632" alt="login about" src="https://github.com/user-attachments/assets/a5e962da-4f71-45ef-9387-90f5e8857317" />
<img width="1117" height="628" alt="dashboard" src="https://github.com/user-attachments/assets/bf8024eb-92d8-4b06-ad29-314ebd338290" />
<img width="1119" height="629" alt="dashboard about" src="https://github.com/user-attachments/assets/e1e91567-dcfb-4d1a-a6c6-a9f358328c6a" />
<img width="1117" height="627" alt="dashboard filter" src="https://github.com/user-attachments/assets/c8064a05-005b-4933-87bf-2629524b3459" />
<img width="1118" height="632" alt="dashboard search" src="https://github.com/user-attachments/assets/3ac5664f-e0a6-4a8a-a60c-51afc8bd1a31" />
<img width="1117" height="628" alt="amv enlarge on click" src="https://github.com/user-attachments/assets/5e1ae248-0f53-4e87-b507-5762d7c2dc93" />

<img width="1120" height="631" alt="dashboard vault stats" src="https://github.com/user-attachments/assets/3c5e49ed-daf7-4424-bbb8-d260fb3a9aef" />


	 	   	        	                        

---

## Getting Started

### Prerequisites
- Node.js 18+
- Java 21+
- MySQL 8+
- Maven

### 1 — Clone the repo

```bash
git clone https://github.com/sovereignuniversity20-art/All-My-Vault-Full-Stack.git
cd All-My-Vault-Full-Stack
```

### 2 — Set up the database

Create a MySQL database:

```sql
CREATE DATABASE all_my_vault;
```

### 3 — Configure backend credentials

Create `Back-End/demo/src/main/resources/application-local.properties` — this file is gitignored and never committed:

spring.datasource.url=jdbc:mysql://localhost:3306/all_my_vault
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=yourSecretKeyHere 


### 4 — Run the backend

```bash
cd Back-End/demo
./mvnw spring-boot:run
```

Spring starts on `http://localhost:8080`. Tables are created automatically on first run via `ddl-auto=update`.

### 5 — Run the frontend

In a separate terminal:

```bash
cd Front-End
npm install
npm run dev
```

Vite starts on `http://localhost:5173`.

---

## Using the Vault

**Register** with your first and last name, a valid email, and a password containing at least:
- 8 characters
- one uppercase letter
- one lowercase letter
- one number
- one special character (! @ # $ %)

**Log in** with your email and password. The vault door animation plays on successful authentication.

Your media is private — no other user can see or access your items. Files are stored in your database and served directly from the API.

Supported media types: images, video (MP4 recommended, 50MB max), PDF, audio, and documents.

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Login, returns JWT | Public |
| POST | `/auth/logout` | Blacklist token | Public |
| POST | `/auth/validate-token` | Validate JWT | Public |
| GET | `/media-items` | Get all user's items | Required |
| GET | `/media-items/{id}` | Get one item | Required |
| GET | `/media-items/{id}/file` | Serve raw file bytes | Required |
| POST | `/media-items/upload` | Upload new item | Required |
| PUT | `/media-items/{id}` | Update item | Required |
| DELETE | `/media-items/{id}` | Delete item | Required |

---

## Roadmap

- Folders and collections for organizing media
- User profile page
- Tags as a proper database table (many-to-many)
- File sharing between users
- AI/API-assisted connection mapping across media
- S3 file storage for cloud hosting option
- Desktop application (Tauri) for true local-first experience with no server required

---

## Author

Shawn "Hero" Harrell -
LaunchCode Full-Time Software Development, 2026 - 
Founder, Sovereign University

---

## Project Context

Unit 2: Full-Stack Java/Spring Boot + React Application
LaunchCode FT-2026

