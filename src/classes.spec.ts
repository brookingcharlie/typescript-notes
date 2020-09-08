describe("classes", () => {
  it("basic classes", () => {
    class Greeter {
      public version: number = 1;
      private readonly name: string;

      constructor(name: string) {
        this.name = name;
      }

      greeting(): string {
        return `Hello, ${this.name}!`;
      }
    }

    const greeter = new Greeter("Joe");
    expect(greeter.greeting()).toBe("Hello, Joe!");
    expect(greeter.version).toBe(1);
  });

  it("inheritance", () => {
    abstract class Thing {
      protected constructor(protected name: string) {}
      abstract move(distance: number): string;
    }

    class Animal extends Thing {
      constructor(name: string) {
        super(name);
      }

      move(distance: number): string {
        return `${this.name} moved ${distance} m`;
      }
    }

    class Dog extends Animal {
      constructor(name: string) {
        super(name);
      }

      bark(): string {
        return `${this.name} barked`;
      }
    }

    const animal: Animal = new Dog("Rex");
    expect(animal.move(5)).toBe("Rex moved 5 m");
    // TS2339: Property 'bark' does not exist on type 'Animal'.
    // expect(animal.bark()).toBe("Rex barked");

    const dog: Dog = new Dog("Rex");
    expect(dog.move(5)).toBe("Rex moved 5 m");
    expect(dog.bark()).toBe("Rex barked");
  });

  it("accessors", () => {
    class Greeter {
      private _name: string = "";

      get name(): string {
        return this._name;
      }

      set name(name: string) {
        this._name = name;
      }

      greeting(): string {
        return `Hello, ${this.name}!`;
      }
    }

    const greeter = new Greeter();
    greeter.name = "Joe";
    expect(greeter.name).toBe("Joe");
    expect(greeter.greeting()).toBe("Hello, Joe!");
  });

  it("static properties", () => {
    class Grid {
      static origin = { x: 0, y: 0 };
    }

    expect(Grid.origin).toStrictEqual({ x: 0, y: 0 });
  });
});
