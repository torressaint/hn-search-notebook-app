## FRONTEND

By default application starts on port 3000

Before start please configure .env file e.g.

### .env file

REACT_APP_BACKEND_URL=//localhost:9000/api/v1
REACT_APP_ALGOLIA_URL=https://hn.algolia.com/api/v1

### Run

- npm start

### Tests

- npm run tdd

## BACKEND

Before start please configure .env file e.g.

### .env file

DEV_DB_USERNAME=root
DEV_DB_PASSWORD=SecretPassword
DEV_DB_NAME=hn_search_db
DEV_DB_HOSTNAME=127.0.0.1
PORT=9000

### Run

- npm run start
  By default application starts on port 9000
