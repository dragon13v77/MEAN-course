# MEAN Course

### Import data to mongo database

First navigate to project folder then execute this from cmd

`mongoimport --jsonArray --db meanhotel --collection hotels --file ./api/data/hotel-data.json`

### Run app

`npm run start`

Then open this url http://localhost:3000

---

`npm install --production` : npm will not install modules listed in devDependencies