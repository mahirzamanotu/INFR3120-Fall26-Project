# CampusMarket

CampusMarket is a marketplace where students can buy and sell items with other students on campus. This is the first release of our INFR3120 Fall 2026 group project.

**Live site:** [https://campusmarket-0dab.onrender.com/]
**GitHub:** [https://github.com/mahirzamanotu/INFR3120-Fall26-Project]

## Features
- Home page with the CampusMarket name, our own logo and a navigation bar.
- A form where students can post items for sale, including the name, price, condition, description and email.
- Form validation in both the browser and server to catch incorrect or missing information.
- A listings page that displays all posted items, with the newest listings first.
- MongoDB Atlas database to store listing information.
- A simple layout that works on both computers and mobile devices.

## Technology
- Node.js and Express
- EJS templates, CSS and JavaScript
- MongoDB Atlas and Mongoose
- Render for hosting the website

## How to run it locally
1. Install Node.js (version 18 or newer).
2. Clone the GitHub repository and open the project folder.
3. Run `npm install` to install the required packages.
4. Copy `.env.example` and rename the copy to `.env`.
5. Add your MongoDB connection string after `MONGODB_URI=` in the `.env` file.
6. Run `npm start` to start the server.
7. Open [http://localhost:3000] in your browser.

## How it is deployed
- The website is hosted on Render as a Web Service.
- Build command: `npm install`
- Start command: `npm start`
- The MongoDB connection string is added through Render's Environment Variables and is not included in the GitHub repository.

## Project files
| Folder or file | What it does |
|---|---|
| `server.js` | Starts the server and sets up Express |
| `config/db.js` | Handles the connection to MongoDB |
| `models/Listing.js` | Defines how listing information is stored |
| `utils/validateListing.js` | Checks listing information on the server |
| `routes/listings.js` | Handles viewing, posting and saving listings |
| `views/` | Contains the EJS page templates |
| `public/` | Contains the CSS, logo and browser JavaScript |

## Group members
For a breakdown of each group member's contributions, see `CampusMarket_Project_Part1.docx`.

## Credits
- We used Express, EJS, Mongoose and dotenv for the project.
- The logo and page designs were created by our group.

## AI Assistance
- We used Claude (AI) for approximately 10% of the project, mainly when we ran into more difficult technical issues.
- This included troubleshooting the MongoDB connection, fixing deployment problems on Render, sorting out Windows terminal issues, correcting folder structure problems and dealing with Git collaboration.
- The rest of the project, including the main development, coding and testing, was completed by our group.