require("dotenv").config();
let express = require("express");
let app = express();
let port = 3080;
let mongoose = require("mongoose");

// to prepare for the change.
mongoose.set("strictQuery", false);

// to supress the warning.
/* mongoose.set('strictQuery', true); */

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

let personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: {
    type: [String],
  },
});

let Person = mongoose.model("Person", personSchema);

let rafaelTeixeira = new Person({
  name: "Rafael Teixeira",
  age: 24,
  favoriteFoods: ["Hamburguer"],
});

// Função para salvar no cloud mongoDbAtlas.
const createAndSavePerson = (object, done) => {
  object.save((err, data) => {
    if (err) console.log(err);
    done(null, data);
  });
};

createAndSavePerson(rafaelTeixeira, (err, data) => {
  if (err) console.log(err);
  else console.log("Dados cadastrados com sucesso.");
});

arrayOfPeople = [
  { name: "Rafael Teixeira", age: 24, favoriteFoods: ["oldBurger"] },
  { name: "Lorena", age: 24, favoriteFoods: ["oldBurger"] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) console.log(err);
    done(null, people);
    console.log(personFound);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) console.log(err);
    done(null, personFound);
    console.log(personFound);
  });
};

console.log(
  findPeopleByName("Rafael Teixeira", (err, data) => {
    if (err) console.log(err);
  })
);

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, founded) => {
    if (err) console.log(err);
    done(null, founded);
  });
};

app.get("/", (req, res) => {
  res.send(`rodando na porta ${port}`);
});

app.listen(port);
