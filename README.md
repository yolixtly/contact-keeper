# Contact Keeper

#### Full Stack React Application

Visit App: https://nameless-coast-74765.herokuapp.com

### Backend Features:

-   Restful API with Node JS and Express
-   Authentication with JWT
-   Persistent NoSQL DB with MongoDB
-   Deployed with Heroku

### Frontend Features:

-   Bootstrap Like Design
-   React and React Router Libraries
-   State Management with React Hooks and Context API

# API Usage & Endpoints

## Register a User [POST /api/users]

-   Request: Add user and request JSON web token

    -   Headers

            Content-type: application/json

    -   Body

                {
                  "name": "",
                  "email": "",
                  "password": ""
                }

-   Response: 200 (application/json)

    -   Body

              {
                "token": ""
              }

## Login with a User [POST /api/auth]

-   Request: Login with credentials to recieve a JSON web token

    -   Headers

            Content-type: application/json

    -   Body

                {
                  "email": "",
                  "password": ""
                }

-   Response: 200 (application/json)

    -   Body

              {
                "token": ""
              }

## Get Contacts [GET /api/contacts]

-   Request: Get all contacts of a specific user

    -   Headers

            x-auth-token: YOURJWT

*   Response: 200 (application/json)

    -   Body

              {
                "contacts": []
              }

## Add New Contact [POST /api/contacts]

-   Request: Add a new contact

    -   Headers

            x-auth-token: YOURJWT
            Content-type: application/json

    -   Body

                {
                  "name": "",
                  "email": "",
                  "phone": "",
                  "type": "" [personal or professional]
                }

-   Response: 200 (application/json)

    -   Body

              {
                "contact": {}
              }

## Update Contact [PUT /api/contacts/:id]

-   Request: Update existing contact

    -   Parameters

        -   id: 1 (number) - An unique identifier of the contact.

    -   Headers

            x-auth-token: YOURJWT
            Content-type: application/json

    -   Body

                {
                  "name": "",
                  "email": "",
                  "phone": "",
                  "type": "" [personal or professional]
                }

-   Response: 200 (application/json)

    -   Body

              {
                "contact": {}
              }

## Delete Contact [DELETE /api/contacts/:id]

-   Request: Delete existing contact

    -   Parameters

        -   id: 1 (number) - An unique identifier of the contact.

    -   Headers

            x-auth-token: YOURJWT

*   Response: 200 (application/json)

    -   Body

              {
                "msg": "Contact removed"
              }
