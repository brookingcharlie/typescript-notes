describe("interfaces", () => {
  it("inline types", () => {
    function greeting(person: { name: string }) {
      return `Hello, ${person.name}!`;
    }

    const joe = { name: "Joe", age: 65 };
    expect(greeting(joe)).toBe("Hello, Joe!");
  });

  it("interfaces", () => {
    interface Person {
      name: string;
    }

    function greeting(person: Person) {
      return `Hello, ${person.name}!`;
    }

    const joe = { name: "Joe", nickname: "Joey" };
    expect(greeting(joe)).toBe("Hello, Joe!");
  });

  it("extending interfaces", () => {
    interface Person {
      name: string;
    }

    interface FamiliarPerson extends Person {
      nickname: string;
    }

    const joe: FamiliarPerson = { name: "Joe", nickname: "Joey" };
    expect(joe.name).toBe("Joe");
    expect(joe.nickname).toBe("Joey");
  });

  it("optional properties", () => {
    interface Person {
      name: string;
      nickname?: string;
    }

    function greeting(person: Person) {
      return person.nickname
        ? `Hey, ${person.nickname}!`
        : `Hello, ${person.name}!`;
    }

    expect(greeting({ name: "Joe", nickname: "Joey" })).toBe("Hey, Joey!");
    expect(greeting({ name: "Joe" })).toBe("Hello, Joe!");
    // TS2345: Argument of type '{ name: string; nick: string; }' is not
    //   assignable to parameter of type 'Person'. Object literal may only
    //   specify known properties, and 'nick' does not exist in type 'Person'.
    // expect(greeting({name: 'Joe', nick: 'Joey'})).toBe('Hey, Joey!');
  });

  it("readonly properties - like const variables", () => {
    interface Person {
      readonly name: string;
      age: number;
    }

    const joe: Person = { name: "Joe", age: 65 };
    joe.age += 1;
    // TS2540: Cannot assign to 'name' because it is a read-only property.
    // joe.name = 'Joseph';
  });

  it("function types", () => {
    interface Greeting {
      (name: string, location: string): string;
    }

    const greeting: Greeting = function (name: string, place: string) {
      return `Welcome to ${place}, ${name}!`;
    };
    expect(greeting("Joe", "Brisbane")).toBe("Welcome to Brisbane, Joe!");
  });

  it("indexable types", () => {
    interface StringArray {
      [index: number]: string;
    }

    const array: StringArray = ["Bob", "Fred"];
    expect(array[0]).toBe("Bob");

    interface Dictionary {
      [index: string]: string | number;

      prop1: string;
      prop2: number;
      // TS2411: Property 'prop3' of type 'boolean' is not assignable to string
      //   index type 'string | number'.
      // prop3: boolean;
    }

    const dictionary: Dictionary = { prop1: "one", prop2: 2, prop3: "extra" };
    expect(dictionary.prop1).toBe("one");
    expect(dictionary.prop2).toBe(2);
    expect(dictionary["prop3"]).toBe("extra");
    expect(dictionary.prop3).toBe("extra");
  });

  it("class types", () => {
    interface Person {
      name: string;

      getName(): string;
    }

    class Student implements Person {
      constructor(public id: string, public name: string) {}

      getName(): string {
        return this.name;
      }
    }

    const joe: Person = new Student("S1234567", "Joe");
    expect(joe.name).toBe("Joe");
    expect(joe.getName()).toBe("Joe");
  });

  it("interfaces extending classes", () => {
    class Person {
      constructor(public name: string) {}
    }

    interface FamiliarPerson extends Person {
      nickname: string;
    }

    const joe: FamiliarPerson = { name: "Joe", nickname: "Joey" };
    expect(joe.name).toBe("Joe");
    expect(joe.nickname).toBe("Joey");
  });
});
