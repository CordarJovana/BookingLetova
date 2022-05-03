const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const db = require("./flightConnection");

app.post("/flights", (req, res) => {
  let newFlight = req.body;
  console.log(newFlight);

  db.promise()
    .query(
      `INSERT INTO Flight VALUES('NULL','${newFlight.FlightNumber}', '${newFlight.NumberOfPassengers}', '${newFlight.Duration}', ${newFlight.Departure}, ${newFlight.Destination})`
    )
    .then(() => {
      console.log("Flight created");
      res.status(201).send({ msg: "Created flight" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/flights/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db
      .promise()
      .query(`SELECT * FROM flight WHERE id=${id}`);
    res.send(result[0]);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/flights/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db
      .promise()
      .query(`DELETE FROM flight WHERE id=${id};`);
    res.send("Flight successfully deleted");
  } catch (error) {
    console.log(error);
  }
});

app.get("/flights", async (req, res) => {
  try {
    const result = await db.promise().query(`SELECT * FROM flight`);
    res.send(result[0]);
  } catch (error) {
    console.log(error);
  }
});

app.listen("3333", () => {
  console.log("Up and running - Flight service");
});
