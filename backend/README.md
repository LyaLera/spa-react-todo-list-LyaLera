## Creating server and database for a ToDoApp

1. Delete a ToDoList folder
2. Create a backend folder
3. Install expressJS and nodemon: `npm init`, `npm install express`, `npm install --save-dev nodemon`
4. Add in package.json command `"devStart": "nodemon index.js"`
5. Import express to index.js:
`const express = require("express");`
`const app = express();`
6. Add command for using middleware: `app.use(express.json());`
7. Add `app.listen(port, ()=>{})` request
8. Intsall express-validator: `npm install express-validator`
9. Import express-validator: `const { validationResult, body, param } = require("express-validator");`
9. Install cros `npm install cors`
10. Import cors: `const cors = require("cors")`, `app.use(cors());`
11. Add validation Schema
12. Install mongodb `npm install mongodb`, to check the version of mongodb use: `npm list mongodb`
13. Import mongodb: `const { MongoClient } = require("mongodb")`
14. Connect server and mongodb `.connect()`using url from mongodb
15. Add get, post, put and delete requests
16. Install dotenv: `npm install dotenv --save` and import `require("dotenv").config();`
17. Install vercel: `npm i vercel` and create vercel.json file
18. Create a vercel project with `vercel` command
19. Deploy to production `vercel --prod`

 




