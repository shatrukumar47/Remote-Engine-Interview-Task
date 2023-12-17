# Remote-Engine-Interview-Task

## Introduction
  Companies and developers can register swiftly with our simple sign-up process. Your data is safeguarded through secure sign-up APIs and JWT authentication.
  
## Deployed App

[netlify](https://unique-tulumba-dbf463.netlify.app/)
##
[backend](https://remoteengine.onrender.com/)

## Video Walkthrough of the project

## Features

- Signup for Clients
- Signup for Developers
- Form Validation
- MultiStep Registration for Developer

## Design decisions or assumptions

I have created the client registration page including fields as company name, email, password

## Installation & Getting started

### Backend
Use your own ***.env*** file and include ***mongoURL***, ***JWT_SECRET***, ***saltRounds***
```bash
git clone https://github.com/shatrukumar47/Remote-Engine-Interview-Task/tree/main/backend
npm install
npm run server
```

### Frontend
```bash
git clone https://github.com/shatrukumar47/Remote-Engine-Interview-Task/tree/main/frontend
npm install
npm run start
```

## API Endpoints

### Skill Route
```
GET /skills/ - Retrieve all skills (no authentication required)
POST /skills/add - Add new skill (authentication required) - req.body({name})
PATCH /skills/update/:id - Update skill with skillID (authentication required) - req.body({name})
DELETE /skills/delete/:id - Delete skill with skillID (authentication required)
```

### Developer Route
```
POST /developer/register - Register Developer - req.body({firstName, lastName, phoneNumber, email, password, skills(Array) })
POST /developer/add-education - Add educational experience (authentication required) - req.body({educationalExperience:(Array[{degreeName, schoolName, duration}])})
POST /developer/add-profession - Add professional experience (authentication required) - req.body({professionalExperience:(Array[{companyName, techStack, duration, skills(Array)}])})
```

### Client Route
```
POST /client/register - Register client - req.body({companyName, email, password})
```

## Technology Stacks

### Backend
 Node.js | Express.js | MongoDB | Mongoose | JWT | bcrypt

### Frontend
 React | ChakraUI | Axios




 
