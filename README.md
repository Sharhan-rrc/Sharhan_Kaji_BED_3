# Events Management API

## Project Overview
This API helps manage events for an events platform. It lets you create, view, update, and delete event records, and stores data in Firebase Firestore.

The main problem it solves is keeping event data organized in one place with proper validation (for example, date rules, capacity limits, and registration count checks). This makes it easier to build a frontend app or admin panel on top of a reliable backend.

This project is for students, beginner backend developers, and anyone who wants a simple REST API example built with Node.js, Express, TypeScript, and Firebase.

## Installation Instructions

### Prerequisites
- Node.js 18+ (recommended)
- npm 9+
- A Firebase project with Firestore enabled

### 1) Clone the repository
```bash
git clone https://github.com/Sharhan-rrc/Sharhan_Kaji_BED_3.git
cd Sharhan_Kaji_BED_3
```

### 2) Install dependencies
```bash
npm install
```

### 3) Set up environment variables
This project includes a `.env.example` file. Create a `.env` file from it:

For macOS/Linux:
```bash
cp .env.example .env
```

For Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

Then fill in your `.env` values:
- `NODE_ENV`
- `PORT`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `SWAGGER_SERVER_URL`
- `ALLOWED_ORIGINS`

### 4) Start the server
Run in development mode:
```bash
npm run dev
```

The API will run at:
`http://localhost:3000`

## API Request Examples
Base URL:
`http://localhost:3000/api/v1`

### 1) Create Event

**Request:**
```bash
curl -X POST http://localhost:3000/api/v1/events \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Tech Conference 2027",
		"date": "2027-08-20T10:00:00.000Z",
		"capacity": 250,
		"registrationCount": 10,
		"status": "active",
		"category": "conference"
	}'
```

**Response (201 Created):**
```json
{
	"message": "Event created",
	"data": {
		"id": "abc123",
		"name": "Tech Conference 2027",
		"date": "2027-08-20T10:00:00.000Z",
		"capacity": 250,
		"registrationCount": 10,
		"status": "active",
		"category": "conference"
	}
}
```

### 2) Get All Events

**Request:**
```bash
curl -X GET http://localhost:3000/api/v1/events \
	-H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
	"message": "Events retrieved",
	"data": [
		{
			"id": "abc123",
			"name": "Tech Conference 2027",
			"date": "2027-08-20T10:00:00.000Z",
			"capacity": 250,
			"registrationCount": 10,
			"status": "active",
			"category": "conference"
		}
	]
}
```

### 3) Update Event

**Request:**
```bash
curl -X PUT http://localhost:3000/api/v1/events/abc123 \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Tech Conference 2027 - Updated",
		"capacity": 300,
		"registrationCount": 20,
		"status": "active",
		"category": "conference"
	}'
```

**Response (200 OK):**
```json
{
	"message": "Event updated",
	"data": {
		"id": "abc123",
		"name": "Tech Conference 2027 - Updated",
		"date": "2027-08-20T10:00:00.000Z",
		"capacity": 300,
		"registrationCount": 20,
		"status": "active",
		"category": "conference"
	}
}
```

## Link to Public Documentation
Full API documentation is available at:

`https://sharhan-rrc.github.io/Sharhan_Kaji_BED_3/`

## Local Documentation Access
When running locally, access Swagger UI at:

`http://localhost:3000/api-docs`

