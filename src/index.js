const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv=require("dotenv");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let workItems = [];
let work = "work";
let today = new Date();
let options = {
  day: "numeric",
  weekday: "short",
  month: "long",
  year: "numeric",
};
let day = today.toLocaleString("en-US", options);
// dataBase coding

mongoose.connect(
  "mongodb+srv://shehabCoder777:SHEHABamr1998@cluster0.n7k1q.mongodb.net/todoDB?retryWrites=true&w=majority"
);

const todoShema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", todoShema);

const item1 = new Item({
  name: "first Task!",
});

let allItems = [item1];

app.get("/", (req, res) => {
  Item.find((e, items) => {
    if (e) {
      console.log(e);
    } else if (items.length === 0) {
      Item.insertMany(allItems, (e) => {
        if (e) {
          console.log(e);
        } else {
          console.log("inserted!");
        }
      });
      res.render("list", { title: day, items: items });
    } else {
      res.render("list", { title: day, items: items });
    }
  });
});

app.post("/", (req, res) => {
  let deletedItem = req.body.checkbox;
  console.log(deletedItem);

  if (deletedItem != undefined) {
    Item.deleteOne({ _id: deletedItem }, (e) => {
      if (e) {
        console.log(e);
      } else {
        console.log("deleted!");
      }
    });
    res.redirect("/");
  } else {
    let itemWhenPosting = new Item({ name: req.body.name });
    itemWhenPosting.save();
    res.redirect("/");
  }
});

const port = Process.env.PORT || 80;

app.listen(port, () => console.log("app is live now on port 3000"));
