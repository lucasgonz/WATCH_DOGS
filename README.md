# WATCH_DOGS

**Drone rental simulation for WATCH_DOGS universe <br />**

    Language    :   JavaScript & TypeScript & HTML SCSS
    Framework   :   Vue.js & Nuxt.js
    Library UI  :   Vuetify
    REST API    :   Express.js

## Requirements

You will only need Node.js installed in your environement <br>
Download on [official Node.js website](https://nodejs.org/) <br>

    # run the following command, for verification
    $ node --version
    v16.15.1

If you need to update `npm`, you can make it using `npm`

    $ npm install npm -g

### Node

## Installation

#### Step 1

```bash
$ git clone https://github.com/lucasgonz/WATCH_DOGS.git
$ cd Application
$ npm install
```

#### Step 2

```bash
# install dependencies
$ npm install
```

#### Step 3

```bash
# Build for developement
$ npm run dev
```

```bash
# Build for production
$ npm run build
$ npm run start
```

## Acces

    App Listening on : http://localhost:3000/

    API Listening on : http://localhost:3001/

## Options

`./Application/droneConfig.ts`

    export const config = {

        // number of % you loose every rate
        dischargeRate: 4,

        // number of seconcds every time discharge rate is apply
        timeRate: 1,

        // minimum charge for drone to be available number out of 100
        minCharge: 10,
    }
