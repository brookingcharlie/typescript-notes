describe('interfaces', () => {
  it('inline type', () => {
    function greeting(person: { name: string }) {
      return `Hello, ${person.name}!`;
    }
    const joe = { name: 'Joe', age: 65 };
    expect(greeting(joe)).toBe('Hello, Joe!');
  });

  it('interface', () => {
    interface Person {
      name: string;
    }
    function greeting(person: Person) {
      return `Hello, ${person.name}!`;
    }
    const joe = { name: 'Joe', nickname: 'Joey' };
    expect(greeting(joe)).toBe('Hello, Joe!');
  });

  it('optional properties', () => {
    interface Person {
      name: string;
      nickname?: string;
    }
    function greeting(person: Person) {
      return (
        person.nickname
        ? `Hey, ${person.nickname}!`
        : `Hello, ${person.name}!`
      );
    }
    expect(greeting({name: 'Joe', nickname: 'Joey'})).toBe('Hey, Joey!');
    expect(greeting({name: 'Joe'})).toBe('Hello, Joe!');
    // TS2345: Argument of type '{ name: string; nick: string; }' is not
    //   assignable to parameter of type 'Person'. Object literal may only
    //   specify known properties, and 'nick' does not exist in type 'Person'.
    // expect(greeting({name: 'Joe', nick: 'Joey'})).toBe('Hey, Joey!');
  });

  it('readonly properties - like const variables', () => {
    interface Person {
      readonly name: string;
      age: number;
    }
    const joe: Person = { name: 'Joe', age: 65 };
    joe.age += 1;
    // TS2540: Cannot assign to 'name' because it is a read-only property.
    // joe.name = 'Joseph';
  });

  it('function types', () => {

  });
});
