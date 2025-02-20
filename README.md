# Referral API

This project is a **Referral API** built with **Node.js**, **Express.js**, **Prisma ORM**, and a **PostgreSQL** database. It allows users to submit referral details (name, email, phone, referredBy), which are stored in the PostgreSQL database, and sends email notifications using Gmail.

## Technologies

- **Node.js**: JavaScript runtime for server-side code.
- **Express.js**: Framework for building the REST API.
- **Prisma ORM**: Database toolkit for interacting with PostgreSQL.
- **PostgreSQL**: Database for storing referrals.
- **Nodemailer**: Library for sending email notifications using Gmail.

---

## Setup

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/referral-api.git
cd referral-api
```

### 2. Install dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Set up the database

- Make sure you have **PostgreSQL** installed locally.
- Create a new database in PostgreSQL (if you haven’t already):

```sql
CREATE DATABASE referral_db;
```

- Update your **`.env`** file with the correct database credentials. Example:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/referral_db"
GMAIL_USER="your-email@gmail.com"
GMAIL_PASS="your-app-password"
```

### 4. Generate Prisma Client

Generate the Prisma client by running the following command:

```bash
npx prisma generate
```

### 5. Run Migrations

Ensure the necessary database tables are created by running:

```bash
npx prisma migrate dev --name init
```

This will apply the migrations and create the `Referral` table.

---

## Usage

### 1. Start the server

To start the API server, run:

```bash
npm start
```

The server will start on port `5000` by default. You can now make requests to the API.

---

## API Endpoints

### 1. **POST /api/referrals**

Submit a new referral.

**Request body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "referredBy": "Alice"
}
```

**Response**:

- Success (201): Referral is created.
  ```json
  {
    "id": "some-uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "referredBy": "Alice",
    "createdAt": "2025-02-20T00:00:00.000Z"
  }
  ```
- Error (400): Referral with the same email or phone number exists.
  ```json
  {
    "error": "A referral with this email or phone number already exists."
  }
  ```

### 2. **GET /api/referrals**

Fetch all referrals.

**Response**:

- Success (200): List of referrals.
  ```json
  [
    {
      "id": "some-uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "referredBy": "Alice",
      "createdAt": "2025-02-20T00:00:00.000Z"
    }
  ]
  ```

---

## Error Handling

The API returns appropriate error messages and status codes for common errors:

- **400**: Invalid input or existing email/phone.
- **500**: Internal server errors (e.g., database or email failures).

Example error response:

```json
{
  "error": "Internal server error"
}
```

---

## Email Setup

This API sends email notifications using **Nodemailer** with Gmail. To set this up:

1. Create a **Google App Password**:
   - Enable **2-Step Verification** on your Google account.
   - Go to [App Passwords](https://myaccount.google.com/apppasswords) and generate a 16-character app password.
2. Update the **.env** file with your Gmail address and the generated app password:
   ```env
   GMAIL_USER="your-email@gmail.com"
   GMAIL_PASS="your-generated-app-password"
   ```
