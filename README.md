# Punchshot Pickleball

## Setup

Install dependencies:  
Run `npm install` in the `frontend` folder and the `backend` folder.

Add `.env` file to the `backend` directory (if it does not exist) and include the connection to the MongoDB cluster and the JWT_SECRET as shown below:

```
DATABASE=mongodb+srv://<USER>:<PASSWORD>@pickleballdb.iuwzm8g.mongodb.net/PunchshotPickleball?retryWrites=true&w=majority
JWT_SECRET=<SECRET>
```

## Running the app

Now, navigate to the `backend` directory and run the following:

```
node server.js
```

This will run a local server on port 8000, connecting to MongoDB via Node/Express.

To run on the frontend, navigate to the `frontend` directory and run the following:

```
npm start
```

This will run the React frontend.
