# Description
This application uses vega embed for showing data that an user can enter. The user can define the specifications of how he wants to present the information and the way he wants the graphs to look. 

The user must upload a .CSV file for being able to expose the data in the graphs.

## Created by
- Gabriel Pinto Pineda

  **Personal web page:** https://glpinto10.github.io/gabriel-pinto-pineda/
  
  **Email:** gl.pinto10@uniandes.edu.co
  
  **Code:** 201515275

## Important links

**Application link:** https://vega-embed.herokuapp.com/

## Used technologies

The proyect was developed using the MERN stack.

- **Mongo DB**: The non relational database is deployed on https://mlab.com/
- **Express**: Fast, unopinionated, minimalist web framework for Node.js https://expressjs.com/en/
- **React JS**: A JavaScript library for building user interfaces https://reactjs.org/
- **Node JS**:is a JavaScript runtime built on Chrome's V8 JavaScript engine. https://nodejs.org/en/

Some other dependencies are used such as:

- MongoDB Driver
- Body Parser
- React-router-dom
- Bootstrap
- Papaparser

Finally, the application is deployed on https://heroku.com/ and can be accesed by this link: https://vega-embed.herokuapp.com/

## Instructive for execution

### Requirements

- **Node JS** 

Check that you have Node JS installed using "node -v" on the CMD or download it from https://nodejs.org/en/

- **Mongo DB**

It is neccesary for using the app of a local way. You can download MongoDB from https://www.mongodb.com/download-center?jmp=nav#community

### Steps for running the app locally

0) Clone or download the repository.
1) Run MongoDB. Enter to the the place where MongoDB was installed using the CMD, and run "mongod" (it is typically on the bin folder), make sure it is connected to the port 27017.
2) Open the root foled on a CMD.
3) Run "npm install" and then "npm start". The back server runs on http://localhost:8080
5) Open a CMD on the root folder and access to the "client" folder.
6) Run "npm install" and "npm start"
7) The application will run on http://localhost:3000/

