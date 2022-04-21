# dat257-hasse-andersson
Project for DAT257 Agile software project management. 2022 group Hasse Andersson.

## Project setup
To run the project you will need to clone the repository. You also need to have Node.js installed on your machine.

First, you will have to make sure that your terminal in VSCode is in the `/client` directory.
```powershell
cd client
```

The first time you run the project you will have to install the dependencies with npm.
```powershell
npm install
```

Before you run make sure to create a .env.local file in the `/client` directory and add your MongoDB database URI to it:
```
MONGODB_URI=<your uri>
```

To run the development server you can now write the following:
```powershell
npm run dev
```