const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const db = require("./flightConnection");

app.post("/flights", (req, res) => {
  let newFlight = req.query;
  const prepared = req.query.prepared;
  db.promise()
    .query(
      `INSERT INTO flights VALUES(NULL, '${newFlight.FlightNumber}', ${newFlight.NumberOfPassengers}, ${newFlight.Duration}, '${newFlight.Departure}', '${newFlight.Destination}', ${newFlight.Price}, ${newFlight.Prepared})`
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
      .query(`SELECT * FROM flights WHERE id=${id}`);
    res.send(result[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put("/flights/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const prep = req.query.Prepared;
    const result = await db.promise().query(`
      UPDATE flights
      SET Prepared = ${prep}
      WHERE id=${id};`);
    res.send(`${result[0].changedRows}`);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/flights/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db
      .promise()
      .query(`DELETE FROM flights WHERE id=${id};`);
    res.send("Flight successfully deleted");
  } catch (error) {
    console.log(error);
  }
});

app.get("/flights", async (req, res) => {
  try {
    const result = await db.promise().query(`SELECT * FROM flights`);
    res.send(result[0]);
  } catch (error) {
    console.log(error);
  }
});

app.listen("4567", () => {
  console.log("Up and running - Flight service");
});
