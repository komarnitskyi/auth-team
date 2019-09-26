const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
const port = 8000;
const urlencodedParser = bodyParser.urlencoded({
   extended: false
});

app.use(bodyParser.json());
app.use(cors());
app.use(urlencodedParser);
app.use("/static", express.static(path.join(__dirname, "static")));

let count = 0;

fs.readFile('./data.json', 'utf8', (error, data) => {
   const parseData = JSON.parse(data);
   count = parseData[parseData.length - 1].id;
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/views/registration.html")));

app.get("/login", (req, res) => {
   fs.readFile('./data.json', 'utf8', (error, data) => {
      if (!req.body) return res.sendStatus(400);
      return error ? res.sendStatus(404) : res.send(JSON.parse(data));
   })
});

app.post("/registration", (req, res) => {
   fs.readFile('./data.json', 'utf8', (error, data) => {
      if (!req.body) return res.sendStatus(400);
      if (error) {
         return res.sendStatus(404);
      } else {
         const obj = {
            ...req.body,
            id: ++count
         }
         const dataParse = JSON.parse(data);
         const list = [...dataParse, obj]
         fs.writeFileSync('./list.json', JSON.stringify(list));
         res.send(list)
      }
   })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));