# Student Result Management - Mini Project


## Requirements
- Node.js & npm
- json-server (install globally or use npx)


## Run
1. Install json-server if you don't have it:
```bash
npm install -g json-server


From the project folder run:
json-server --watch db.json --port 3000
(or npx json-server --watch db.json --port 3000)

Open index.html in your browser (double click or serve with a simple static server).

Notes

The frontend expects the JSON Server at http://localhost:3000/students.

Supports Create (POST), Read (GET), Update (PUT) and Delete (DELETE).

You can extend data fields, validation, or move to PATCH instead of PUT for partial updates.

## Brief explanation of how this meets the project requirements
- **Classes**: `Student` and `Result` classes included (Section is modeled as a string property).
- **UI**: Clean HTML + CSS form and table to show students.
- **Async CRUD**: All network ops (fetch) are `async/await` and use proper error handling.
- **HTTP handling**: Shows alerts on errors and checks response.ok.
- **Storage**: Uses JSON Server (`db.json`) as REST backend.


---


If you want, I can:
- Convert forms to modal dialogs, add validation messages, or use PATCH for updates.
- Add sorting, pagination, or charts for performance.
- Convert to a single-page module pattern or ES modules.