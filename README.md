<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>

<h3 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/gympoint-logo.png" width="200px" /> <br/>
  Gympoint Full Application
</h3>

<p align="center">In this repository you will find the final challenge of the Rocketseat GoStack Bootcamp 9 2019/2020 🎓 A complete application including the Back-end, Front-end and Mobile.</p>

<p align="center">
  <a href="#coffee-back-end">Back-end</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-front-end">Front-end</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#iphone-mobile">Mobile</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

# Build Setup

The project requires [Node.js](https://nodejs.org/) and [Docker](https://docs.docker.com/install/) to run locally.

## :coffee: Back-end

After clone the repository go to the `backend` folder and install the dependencies.

```bash
# install dependencies
npm install
```

### 1. create the Postgres database with Docker

```bash
# run this command
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

```bash
# run this command
docker start database
```

### 2. access the Postgres database

You need create a new database called `gympoint`. I suggest you to use the [Postbird](https://www.electronjs.org/apps/postbird) for OSX. After install you need to set the configuration bellow and then create your database with `UTF8` client encoding.

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

### 3. create the Redis database

```bash
# run this command
docker run --name redisgympoint -p 6379:6379 -d -t redis:alpine
```

```bash
# run this command
docker start redisgympoint
```

### 4. change the .env file

Rename the `.env-example` to `.env` and configure with the database and redis details. Remember to set the `REDIS_HOST` to `127.0.0.1`.

### 5. run sequelize migrate

```bash
# run this command
./node_modules/.bin/sequelize db:migrate
```

### 6. run sequelize seed

```bash
# run this command
./node_modules/.bin/sequelize db:seed:all
```

### 7. run server

```bash
# run this command
npm run dev
```

### 8. run queue (mail server)

```bash
# run this command
npm run queue
```

## :computer: Front-end

After clone the repository go to the `frontend` folder and install the dependencies and run the project with the command `npm start`.

```bash
# install dependencies
npm install
```

```bash
# run at localhost:3000
npm start
```

## :iphone: Mobile

After clone the repository go to the `mobile` folder and install the dependencies and run the project with the command `react-native run-ios`.

Note: The version of mobile app was development for `iOS`. You need the Xcode client in your computer to run the application in the simulator or configure to use the app via USB. There is another options to run the app, for i.e. [Expo](https://expo.io/learn).

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
