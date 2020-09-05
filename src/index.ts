interface Person {
  name: string;
}

class Student {
  constructor(public id: string, public name: string) {}
}

function greet(person: Person) {
  console.log(`Hello, ${person.name}!`);
}

const joe: Student = { id: 'S1234567', name: 'Joe Smith' };

greet(joe);
