# JWT Sample
A JWT sample implementation from scratch. Consist of 2 examples with usage or without usage of `express-jwt` module. 

## Pre-requisite

Please create your `.env` file first for your secret key

    SECRET_KEY=MYAPPSECRET

## Usage

To get started, install the node modules

    > npm install

To start the application sample without `express-jwt`, enter at terminal

    > npm run start-without

To start the application sample with `express-jwt`, enter at terminal

    > npm run start-with

Once the server has started, you could try to make API calls on `http://localhost:7000`.

Request for `access_token` can be called using below endpoint:

    Request: POST /api/login
    Response: { token: <signed-token> }

Use the token to access the resources.

    Request: GET /api
    Response: { 
        message: 'Welcome to the API of MyApp' 
    }

    Request: GET /api/posts
    Response: { 
        posts: []
    }

    Request: GET /api/user
    Response: {
        user: {
            ...
        }
    }