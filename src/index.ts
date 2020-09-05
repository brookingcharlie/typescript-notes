interface Person {
  name: string;
}

class Student {
  constructor(public id: string, public name: string) {}
}

function greeting(person: Person) {
  return `Hello, ${person.name}!`;
}

const joe: Student = new Student('S1234567', 'Joe');

console.log(greeting(joe));
