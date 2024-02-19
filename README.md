# Pet Store

## Setup

- Requires Node 18 or above.

## Installation

Clone the repository, install the dependencies and get started right away. Make sure you already have `nodejs`, `npm` and `yarn` installed in your system.

```sh
git git@github.com:Prabeshpd/pet-store.git
cd pet-store
```

## Docker Compose

- ### Start Development Server

  ```bash
  cp .env.example .env

  make dev-start
  ```

  Make sure to update the .env variables.

  ```
  POSTGRES_DB_CONNECTION_URL = postgresql://postgres:Password@1234@localhost:5432/postgres
  ```

  Server will run at port 3001

  For Seeding

  ```bash
   yarn seed
  ```

- ### Test Application

  ```bash
  cp .env.example .env.test

  make test
  ```

  Make sure to update the .env.test variables.

  ```
  POSTGRES_DB_CONNECTION_URL = postgresql://postgres:Password@1234@localhost:5432/postgres_test
  ```

## Getting Started

### Development

1. Install all dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

### API DOC

> [!NOTE]
>
> Once the server has started. Visit http://localhost:3000/api-docs/ for api documentation

### Test

1. Test

   ```bash
   yarn test
   ```
