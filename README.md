[![GitHub commits](https://badgen.net/github/commits/etiamsani/Project-my-therapist-back)](https://GitHub.com/EtiamSani/Project-my-therapist-back/commit/)
[![GitHub latest commit](https://badgen.net/github/last-commit/EtiamSani/Project-my-therapist-back)](https://GitHub.com/EtiamSani/Project-my-therapist-back/commit/)
# My Therapist API 
## What the project My therapist about ?

#### My Therapist is a project that provides users in need with the ability to find the therapist that best suits their needs. 

We have developed an algorithm that analyzes the answers provided in a survey (which is stored in our database) and returns a list of therapists that are most suitable for the particular pathology/issue that the user wants to work on.

You can get acces to the API throug this link : https://my-therapist-api.up.railway.app

## Language, framworks and tools used in this project 


![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)

## How to install the project ? 

1. Clone the repository in your terminal:
``` 
git clone git@github.com:EtiamSani/Project-my-therapist-back.git
```
2. Install all the dependencies:

``` 
npm i 
```
or 
```
npm install
```
3. Environment setup:

To set up the environment, make sure to create a .env file at the root of the project. An example of the content to put in the .env file is available in .env.example.

4. Initialization of the database:

Go to the migrations directory:
```
cd migrations
```
Then execute the following command:

```
bash 1.init_db.sh
```

5. Create tables 

In the migrations directory, run the following command in your terminal:

```
bash 3.deploy.sh
```

6. Seed the database through seeding script:

At the root of the project, execute the following command:
```
node script/seedingAll.cjs
```

7. Start the server

``` 
node server.js
```

or 

```
nodemon server.js
```
## Routes

The routes are available here: https://my-therapist-api.up.railway.app/api-docs

## Arborescence of the project 

```
.
├── app
│   ├── controller
│   ├── db
│   ├── log
│   ├── middlewares
│   ├── model
│   ├── router
│   └── service
│       └── error
├── documentations
├── migrations
│   ├── deploy
│   ├── revert
│   └── verify
├── public
│   └── images
│       ├── Patients profile picture
│       ├── therapists
│       └── Therapists profile picture
├── script
└── test

```
