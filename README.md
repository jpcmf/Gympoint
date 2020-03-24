<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>

<h3 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/gympoint-logo.png" width="200px" /> <br/>
  Gympoint full application
</h3>

<p align="center">In this repository, you'll find the final challenge for Rocketseat's bootcamp GoStack 9.0 🎓 (2019/2020). It is a complete application, which includes a Back end, Front end and Mobile.</p>

<p align="center">
  <a href="#coffee-back-end">Back end</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-front-end">Front end</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#iphone-mobile">Mobile</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

# Build Setup

The project requires [Node.js](https://nodejs.org/) and [Docker](https://docs.docker.com/install/) to run locally.

## :coffee: Back end

After cloning the repository, go to the folder named `backend` and install all the dependencies required.

```bash
# install dependencies
npm install
```

### 1. Creating the Postgres database with Docker

```bash
# run this command
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

```bash
# run this command
docker start database
```

### 2. Accessing the Postgres database

You must have to create a new database called `gympoint`. I suggest you to use [Postbird](https://www.electronjs.org/apps/postbird) for `OSX`. After installing, you must have to add these configurations below and then create your database with `UTF8` client encoding.

```bash
# host
localhost

# port
5432 (the port you set in the docker run)

# username
postgres

# password
docker (the password you set in the docker run)
```

### 3. Creating the Redis database

```bash
# run this command
docker run --name redisgympoint -p 6379:6379 -d -t redis:alpine
```

```bash
# run this command
docker start redisgympoint
```

### 4. Changing the .env file

Rename the `.env-example` to `.env` and configure it with the database and redis details. Remember to set the `REDIS_HOST` to `127.0.0.1`.

### 5. Running the sequelize migrations

```bash
# run this command
./node_modules/.bin/sequelize db:migrate
```

### 6. Running the sequelize seeds

```bash
# run this command
./node_modules/.bin/sequelize db:seed:all
```

### 7. Running the server

```bash
# run this command
npm run dev
```

### 8. Running the queue (mail server)

```bash
# run this command
npm run queue
```

## :computer: Front end

After cloning the repository, go to the folder named `frontend` and install all the dependencies required and run the project by using the command `npm start`.

```bash
# install dependencies
npm install
```

```bash
# run at localhost:3000
npm start
```

## :iphone: Mobile

After cloning the repository, go to the folder named `mobile`, install all the dependencies and run the project by using the command `react-native run-ios`.

Note: The version of mobile app was developed for `iOS` system. You'll need the Xcode client in your computer in order to run the application in the Simulator or configure to use the app via USB. There are other options for running the app, for eg., [Expo](https://expo.io/learn).

```bash
# install dependencies
npm install
```

```bash
# run react-native
react-native run-ios
```

# :memo: License

This project is under the MIT license. See the [LICENSE](LICENSE.md) file for more details.

---

Made with :blue_heart: by João Paulo C M Fricks
