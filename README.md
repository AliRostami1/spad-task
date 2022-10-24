## Description

This repository contains source code for spad job interview task.

## How to validate

Both tasks are done, in order to test them you can follow there instructions

### Install Dependencies

```bash
$ yarn
```

### Run the app

```bash
$ yarn start
```

### Import Postman Config

Open postman and import the postman.json file into it.

### First Task

- Create a User => user create
- Login with created user credentials => login
- Get the User info => user get one
- Update the credit (or profile) field of the User => user update one
- Get the User info again to see the changes take effect => user get one
- See protected routes not being shown to public => user get all

### Second Task

- Send a test request to /send endpoint => send test
- Check Nestjs logs to see the response received from /user (should be unauthorized 401)
