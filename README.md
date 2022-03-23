# Online Shop
can test here: https://cryptic-stream-86757.herokuapp.com/shop

Code has been deployed on heroku(modificated with S3 cloud)

backend on node.js with expres.
frontend on react.js with Mobx
DB - PostgresQL
JavaScript

Functionality:
Registration(using JWT auth)
save images
send email
CRUD with Type, Brand, Device
Rating for every device
Basket for devices

.env file example:
PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
SECRET_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
MAIL_RECIPIENT=

cd server && npm install && npm run dev
cd client && npm install && npm start
