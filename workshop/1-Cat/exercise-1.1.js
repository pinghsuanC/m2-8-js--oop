// Exercise 1.1
// ------------
// Creating a Cat class.

// A) Add some properties to our class instances.
// Objects created via this class should have the following properties:

// {
//   species: 'cat',
//   tiredness: 0,
//   hunger: 0,
//   loneliness: 0,
//   happiness: 0,
// }

class Cat {
  // Add code here
  species = "cat";
  tiredness= 0;
  hunger= 0;
  loneliness= 0;
  happiness= 0;
  name=undefined;
  breed=undefined;

  constructor(name, breed){
    this.name = name;
    this.breed = breed;
  }
}

// B) Instantiate a cat called 'boots' with the Cat class.
let boots = new Cat("boots", "Simaese");
// C) What do you see when you console.log(boots)?
/*Cat {
  species: 'cat',
  tiredness: 0,
  hunger: 0,
  loneliness: 0,
  happiness: 0,
  name: 'boots'
}*/
//console.log(boots);
// D) What if I want to output just boots' species?
console.log(boots.species);