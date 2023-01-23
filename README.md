<div>
  <h1 align="center">Node Assignment Solution</h1>
</div>

<br>

<div>
<h2>Contents</h2>
<ol>
  <li><a href="https://github.com/Arka2001/social-media-backend#description"> Description</a></li>
  <li><a href="https://github.com/Arka2001/social-media-backend#project-structure"> Project Structure</a></li>
  <li><a href="https://github.com/Arka2001/social-media-backend#getting-started"> Getting Started</a></li>
  <li><a href="https://github.com/Arka2001/social-media-backend#built-with-"> Built With</a></li>
</ol>
</div>

<br>

<div>
<h2>Description</h2>
<p>
  This project has been developed by <a href="https://github.com/Arka2001">Sayantan Dasgupta</a> as per instructions given by <a href="https://github.com/dipan29">Dipan Roy</a>.

  This REST API has a total of 4 routes. Using this we can upload an image, and divide it into different tiles, as per the tilefactor provided by the user

</p>
</div>

<br>

<div>
<h2>Project Structure</h2>

```
|-- build/            build files for Typescript .(gitignored)
|-- node_modules/     npm packages (gitignored)
|-- src/
  |-- config/         configs for db, swagger and other packages go here
  |-- controllers/    controller functions for every route. controllers make calls to services
  |-- dtos/           structures for various data objects defined in this directory
  |-- middlewares/    middlewares for various routes go here
  |-- models/         database schema / models go here
  |-- routes/         routes or endpoint definitions go here, routes make calls to controllers
  |-- services/       files to process and query database go here
  |-- shared/         files for extra utilities for this particular project go here
  |-- utils/          files for extra utilities for all NodeTS projects go here
  |-- app.ts          entry point of our project
|-- .env              environment variables used in the project(gitignored)
|-- .gitignore        stores files and directories to be ignored in the commits
|-- package-lock.json stores version of every package used in the project
|-- package.json      metadata of the project
|-- README.md         details and instructions go here
|-- tsconfig.json     configuration for the typescript setup of project

```

</div>

<br>

<div>
<h2>Getting Started</h2>
To run the api locally, follow these steps:
  
  - clone the repository
  - create the .env file with PORT, MONGO_URI, and DEBUG variables as shown in `.env.example`
  - run `npm i --save` to install the packages in package.json
  - run `npm run dev` to start the backend server

<h3>Prerequisites</h3>

  - node and npm
  - typescript
  - postman
</div>

<br>

<div>
<h2>Built With </h2>
<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
</p>
<p align="center">
  <img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">
  <img  src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white">
</p>
</div>

<br>
