export interface Person {
  name: string;
}

export class Student {
  constructor(public id: string, public name: string) {}
}

export function greeting(person: Person) {
  return `Hello, ${person.name}!`;
}
