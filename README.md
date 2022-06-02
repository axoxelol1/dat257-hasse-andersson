# dat257-hasse-andersson
Project for DAT257 Agile software project management. 2022 group Hasse Andersson.

A website that aggregates and shows upcoming events happening within the student union at Chalmers University of Technology.

Features a timeline view with filtering, a calendar view, a dashboard where logged in users can manage their events and a page where the admin can manage all users.
You can also export the events to your own calendar.

The application is made using react framework NextJS along with a MongoDB database. Python is used for the facebook event parser (not scraper).
We use typescript and tailwind to make development more enjoyable.

Team members:
- Simon Engström
- Axel Larsson
- Anton Ekström
- Jacob Bengtsson
- Jens Sandgren
- Casper Lindh

## Project structure
The reflections for each week, both individual and the team's, can be found in the folder `/reflection` and other documents can be found in `/documents`.

The actual application/website can be found in `/client`.

In `/tools` a python script used for parsing events from facebook event pages can be found.

## Scrum Board
Our scrum board for all sprints is available in this github repo under Projects -> Projects (not beta version).

## Project setup
OBS: Project unfortunately does not work on Safari as it does not support YYYY-MM-DD date format. Please use chrome/firefox on mac.

To run the project you will need to clone the repository. You also need to have Node.js installed on your machine.

First, you will have to make sure that your terminal in VSCode is in the `/client` directory.
```powershell
cd client
```

The first time you run the project you will have to install the dependencies with npm.
```powershell
npm install
```

Before you run make sure to create a .env.local file in the `/client` directory and add your MongoDB database URI and database name to it:
```
MONGODB_URI=<your uri>
MONGODB_DB=<database name to use>
```

You also need to add a random byte string for the JWT. You can generate one here `https://catonmat.net/tools/generate-random-bytes`.
32 random hexadecimal bytes works nicely. Then place it in your env.local:
```
JWT_SECRET=<random byte string>
```

To run the development server you can now write the following:
```powershell
npm run dev
```
The only user that can add new users is the user with the username 'admin'. We run in to a bit of a chicken/egg situation. Therefore you have to add the admin user manually to the database. To make sure the login works you first have to hash your intended password using SHA256, then hash the SHA256-hash using bcrypt and insert the bcrypt-hash into the database along with the username like this:
```
"username": "admin",
"salthash": "<bcrypt-hash>"
```
