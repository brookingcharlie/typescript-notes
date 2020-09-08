describe("functions", () => {
  it("named", () => {
    function add(x: number, y: number): number {
      return x + y;
    }
  });

  it("anonymous", () => {
    let add: (x: number, y: number) => number;
    add = function (x: number, y: number): number {
      return x + y;
    };
    let addInferred1: (x: number, y: number) => number = (x, y) => x + y;
    let addInferred2 = (x: number, y: number) => x + y;
  });

  it("required parameters", () => {
    function greeting(firstName: string, lastName: string): string {
      return `Hello, ${firstName} ${lastName}!`;
    }

    expect(greeting("Joe", "Smith")).toBe("Hello, Joe Smith!");
    // TS2554: Expected 2 arguments, but got 1.
    // greeting('Joe');
    // TS2554: Expected 2 arguments, but got 3.
    // greeting('Joe', 'Smith', 123);
  });

  it("optional parameters", () => {
    function greeting(firstName: string, lastName?: string): string {
      return `Hello, ${firstName} ${lastName ?? "Smith"}!`;
    }

    expect(greeting("Joe", "Smith")).toBe("Hello, Joe Smith!");
    expect(greeting("Joe")).toBe("Hello, Joe Smith!");
  });

  it("default parameter - last", () => {
    function greeting(firstName: string, lastName: string = "Smith"): string {
      return `Hello, ${firstName} ${lastName}!`;
    }

    expect(greeting("Joe", "Smith")).toBe("Hello, Joe Smith!");
    expect(greeting("Joe")).toBe("Hello, Joe Smith!");
  });

  it("default parameter - not last", () => {
    function greeting(lastName: string = "Smith", firstName: string): string {
      return `Hello, ${firstName} ${lastName}!`;
    }

    expect(greeting("Smith", "Joe")).toBe("Hello, Joe Smith!");
    expect(greeting(undefined, "Joe")).toBe("Hello, Joe Smith!");
  });

  it("rest parameters", () => {
    function greeting(firstName: string, ...otherNames: string[]) {
      return `Hello, ${firstName} ${otherNames.join(" ")}!`;
    }

    expect(greeting("Joe", "Henry", "Smith")).toBe("Hello, Joe Henry Smith!");
  });

  it("implicit this", () => {
    // TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.
    // const greeter = {
    //   name: "Joe",
    //   createFunction: function () {
    //     return function () {
    //       return `Hello, ${this.name}!`;
    //     };
    //   },
    // };
  });

  it("this with arrow function", () => {
    const greeter = {
      name: "Joe",
      createFunction: function () {
        return () => `Hello, ${this.name}!`;
      },
    };
    let greeting = greeter.createFunction();
    expect(greeting()).toBe("Hello, Joe!");
  });

  it("this type parameter - interface when referenced", () => {
    interface Greeter {
      name: string;

      createFunction(this: Greeter): () => string;
    }

    const greeter: Greeter = {
      name: "Joe",
      createFunction: function (this: Greeter) {
        return () => `Hello, ${this.name}!`;
      },
    };
    let greeting = greeter.createFunction();
    expect(greeting()).toBe("Hello, Joe!");
  });

  it("this type parameter - void when not referenced", () => {
    const greeter = {
      createFunction: function (this: void) {
        return () => "Hello, friend!";
      },
    };
    let greeting = greeter.createFunction();
    expect(greeting()).toBe("Hello, friend!");
  });

  it("overloads", () => {
    function greeting(names: string[]): string[];
    function greeting(id: number): string;
    function greeting(arg: any): any {
      return Array.isArray(arg)
        ? arg.map((name) => `Hi, ${name}!`)
        : `Hi, member ${arg}!`;
    }

    expect(greeting(["Joe", "Lee"])).toStrictEqual(["Hi, Joe!", "Hi, Lee!"]);
    expect(greeting(12345678)).toBe("Hi, member 12345678!");
  });
});
