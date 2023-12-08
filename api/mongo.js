const mongoose = require('mongoose');

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@phonebook.xczfwcy.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);
const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model('Person', phonebookSchema);

if (process.argv.length === 3) {
  console.log('phonebook:');
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    console.log('Person saved!');
    mongoose.connection.close();
  });
}
