# Employee-Tracker ![Static Badge](https://img.shields.io/badge/License-MIT-blue)
## Description 
 An application for managing a bussinesses employees using an sql database
## Table of Contents
[Installation](#installation)

[Usage](#usage)

[License](#license)

[Contact](#contact)

## Installation 
To get the database setup connect to your postgres user by running in the terminal
```bash
psql -U 'postgres user'

```
then create the database running
```bash
\i db/schema.sql

```
then if you wish to seed the database with the sample seed data run
```bash

\i db/seeds.sql

```

you'll then need to install the necessary packages by running


```bash

npm i

```
in the terminal.

One last thing make sure the user and password varaibles in the db/connection.js file match the user and password of your postgres user.

## Usage 
Make sure that the database is created using the instalation instructions then run  
```bash

node index.js

```

Then select the option you want and follow the prompts.

## License 
![Static Badge](https://img.shields.io/badge/License-MIT-blue)
## Contact 
 Ask me questions about the project here
* Github: Ownerman123
* Email: charlesshumway1@gmail.com