# Usrah Management System

A web-based system for managing usrah (study circle) groups, designed to simplify member, attendance, and session management for community and educational organizations.

## Features

- **User Authentication**: Secure login and session management for authorized access.
- **Dashboard**: Overview of total members and session statistics, with visualization of recent attendance records.
- **Member Management**: Add, delete, and view details of group members. Real-time updates and simple UI for handling member data.
- **Attendance Tracking**: Mark members present or absent for each session, review historic attendance, and export data for reporting.
- **Data Export**: Download attendance and member data in Excel format for offline analysis and record-keeping.
- **Responsive Layout**: Clean interface designed with modern CSS and Font Awesome icons.

## Screenshots
*(Add interface screenshots here if available)*

## Tech Stack

- **Frontend**: React (with hooks and router)
- **Styling**: Custom CSS, Font Awesome icons
- **Backend**: Connects to server endpoints (`/api/members`, `/api/dashboard`, etc.); you must configure the backend separately.
- **Export Functionality**: Uses [SheetJS/xlsx](https://sheetjs.com/) for exporting Excel spreadsheets.

## Quick Start

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```
2. **Set backend URL**:
   - Add your backend endpoint to `.env` (e.g. `VITE_BACKEND_URL=http://localhost:8000`)
3. **Run the frontend**:
   ```bash
   npm start
   ```
4. **Access the system**: Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx
│   ├── page/
│   │   ├── Login/
│   │   └── MainPage/
│   └── util/
├── public/
├── index.html
└── eslint.config.js
```
- Main pages and components under `src/page/MainPage/components/`
- Utility and export logic in `src/util/exportExcel.js`

## Usage Notes

- Make sure the backend is running and accessible at the URL provided in your environment configuration.
- Login credentials are required before accessing main features.
- Attendance and member actions interact live with the backend and update the dashboard accordingly.
- Exported Excel files are saved client-side for your convenience.

## Credits

Created by [Kaiden-A](https://github.com/kaiden-A).  
&copy; 2025 Kaiden-A.

---

*For issues, feature requests, or contributions, please open an issue or pull request on GitHub!*
