## Teknologi yang Digunakan

* **Frontend**: Next.js + TailwindCSS + shadcn/ui
* **Backend**: Golang + Fiber
* **Database**: PostgreSQL
* **Auth**: JWT (JSON Web Token)
* **Containerization**: Docker & docker-compose

---

## Setup Project Secara Lokal (Tanpa Docker)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/notes_app.git
cd notes_app
```

---

### 2️⃣ Setup Backend (Golang)

Masuk ke folder backend:

```bash
cd backend
```

Buat file `.env`:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=notes_app
DB_PORT=5432

PORT=8080
JWT_SECRET=secret123
```

Install dependency & jalankan server:

```bash
go mod tidy
```

Jalankan server:
```bash
go run main.go
```

Backend berjalan di:

```
http://localhost:8080
```

---

### 3️⃣ Setup Frontend (Next.js)

Masuk ke folder frontend:

```bash
cd frontend
```

Install dependency:

```bash
npm install
```

Jalankan frontend:

```bash
npm run dev
```

Frontend berjalan di:

```
http://localhost:3000
```

---

## Setup Menggunakan Docker & docker-compose (Recommended)

### 1️⃣ Pastikan Docker & Docker Compose Terinstall

* Docker
* Docker Compose v2+

---

### 2️⃣ Jalankan Semua Service

Dari root project:

```bash
docker-compose up --build
```

Service yang dijalankan:

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend → [http://localhost:8080](http://localhost:8080)
* PostgreSQL → port 5432
* Adminer → [http://localhost:8081](http://localhost:8081)

---

### 3️⃣ Stop Container

```bash
docker-compose down
```

---

## Contoh File `.env`

### Backend `.env`

```env
DB_HOST=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=notes_app
DB_PORT=5432

PORT=8080
JWT_SECRET=secret123
```

### Frontend (docker-compose env)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## Screenshot Aplikasi

### Halaman Register

![Login Page](screenshots/register.jpg)

### Halaman Login
![Login Page](screenshots/login.jpg)

### Dashboard Notes

![Dashboard](screenshots/dashboard.jpg)

### Detail Note

![Note Detail](screenshots/detail.jpg)

---

## Contoh Log yang Dihasilkan (Opsional)

Contoh data log yang tersimpan di tabel `logs`:

```json
{
    "data": [
        {
            "id": "eace98ce-4f82-4d8c-9a41-a9073116f629",
            "date_time": "2025-12-13T18:04:59.047477Z",
            "method": "POST",
            "endpoint": "/auth/login",
            "request_headers": "{\"Accept\":\"*/*\",\"Accept-Encoding\":\"gzip, deflate, br\",\"Connection\":\"keep-alive\",\"Content-Length\":\"64\",\"Content-Type\":\"application/json\",\"Host\":\"localhost:8080\",\"Postman-Token\":\"d207ff01-a3e9-4087-8dcb-ce91afd60f4d\",\"User-Agent\":\"PostmanRuntime/7.49.1\"}",
            "payload": "{\r\n\n  \"email\": \"alsam@gmail.com\",\r\n  \"password\": \"alsam12345\"\r\n}",
            "response_body": "{\"message\":\"Login success\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjU3MzU0OTksInVzZXJfaWQiOiIxZDhlMTk0Yy05MjA5LTRlNDYtOThjZC0wZjdlNGExZTYxZjQifQ.-V9IcznwErjd1Rs8B-nbCkPYUAucJlzN1FbecrmBo8s\",\"user\":{\"email\":\"alsam@gmail.com\",\"id\":\"1d8e194c-9209-4e46-98cd-0f7e4a1e61f4\",\"name\":\"user\"}}",
            "status_code": 200,
            "created_at": "2025-12-13T18:04:59.103866Z",
            "updated_at": "2025-12-13T18:04:59.103866Z"
        },
        {
            "id": "992fd0a5-7688-42b0-a5c1-6cdc578fdc05",
            "date_time": "2025-12-13T18:04:55.145086Z",
            "method": "POST",
            "endpoint": "/auth/register",
            "request_headers": "{\"Accept\":\"*/*\",\"Accept-Encoding\":\"gzip, deflate, br\",\"Connection\":\"keep-alive\",\"Content-Length\":\"82\",\"Content-Type\":\"application/json\",\"Host\":\"localhost:8080\",\"Postman-Token\":\"de15f311-869c-4d63-a0c2-2ef6e5d59373\",\"User-Agent\":\"PostmanRuntime/7.49.1\"}",
            "payload": "{\r\n  \"name\": \"user\",\r\n  \"email\": \"alsam@gmail.com\",\r\n  \"password\": \"alsam12345\"\r\n}",
            "response_body": "{\"message\":\"Registration successful\"}",
            "status_code": 200,
            "created_at": "2025-12-13T18:04:55.210364Z",
            "updated_at": "2025-12-13T18:04:55.210364Z"
        }
    ],
    "message": "Logs retrieved successfully",
    "total": 2
}
```

---

---


  
