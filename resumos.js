// Require do pacote.
let mongoose = require("mongoose");

// Conexão com o banco. ===================================================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Facilita leitura do código quando lidar com Schemas. ====================================
const Schema = mongoose.Schema;

// Cria modelo de Schema. =========================================================
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

// Cria uma pessoa "rafael Teixeira";
let rafaelTeixeira = new Person({
  name: "Rafael Teixeira",
  age: 24,
  favoriteFoods: ["Hamburguer"],
});

// Função para salvar no DB =================>>> método .save() <<<============================
const createAndSavePerson = (object, done) => {
  object.save((err, data) => {
    if (err) console.log(err);
    done(null, data);
  });
};

// Função para criar multiplos records (array de objetos). ========>> método .create() <<===========
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) console.log(err);
    done(null, people);
    console.log(personFound);
  });
};

// Função para encontrar records no db por propriedade =====>> método .find() <<===============
// Person sendo o Schema e name sendo a key... Retorna um array com os encontrados.
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) console.log(err);
    done(null, personFound);
    console.log(personFound);
  });
};

// Função para encontrar apenas um record no db =====>> método .findOne() <<=====================
// Person sendo o Schema e food sendo a key... Retorna apenas um encontrado.
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, founded) => {
    if (err) console.log(err);
    done(null, founded);
  });
};

// Função para Atualizar (Encontrar, Editar e Salvar) =======================================
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // ENCONTRAR ========= ========================  =
  Person.findById(personId, (err, founded) => {
    if (err) console.log(err);

    // ADICIONAR ATUALIZAÇAO ======================
    founded.favoriteFoods.push(foodToAdd);

    // SALVAR ALTERAÇÃO =========================
    founded.save((err, updated) => {
      if (err) console.log(err);
      done(null, updated);
    });
  });
};
