# Remote-Engine-Interview-Task

## Introduction
  Companies and developers can register swiftly with our simple sign-up process. Your data is safeguarded through secure sign-up APIs and JWT authentication.
  
## Deployed App

[netlify](https://unique-tulumba-dbf463.netlify.app/)
##
[backend](https://remoteengine.onrender.com/)

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


## Snaps
### Home
![1](https://github.com/shatrukumar47/Remote-Engine-Interview-Task/assets/123942835/fca30d4f-f6a6-48df-802e-3dbdc54a93c6)

### Register as Developer
![2](https://github.com/shatrukumar47/Remote-Engine-Interview-Task/assets/123942835/f9912367-1c34-43b6-88d4-3d3d6f0d6d25)

### Register as Client
![3](https://github.com/shatrukumar47/Remote-Engine-Interview-Task/assets/123942835/c87acd1c-6017-4384-afbe-a009459aa118)









 
