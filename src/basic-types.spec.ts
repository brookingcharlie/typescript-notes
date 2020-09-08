describe("basic types", () => {
  it("boolean", () => {
    const isDone: boolean = false;
    expect(isDone).toBe(false);
  });

  it("number", () => {
    const decimal: number = 78;
    const hex: number = 0x4e;
    const binary: number = 0b1001110;
    const octal: number = 0o116;
    expect(decimal).toBe(78);
    expect(hex).toBe(78);
    expect(binary).toBe(78);
    expect(octal).toBe(78);
  });

  it("string", () => {
    const name: string = "Joe";
    const age: number = 65;
    const intro = `My name's ${name} and I'm ${age}.`;
    expect(intro).toBe("My name's Joe and I'm 65.");
  });

  it("array", () => {
    const listBracketSyntax: number[] = [1, 2, 3];
    const listGenericSyntax: number[] = [1, 2, 3];
    expect(listBracketSyntax).toStrictEqual(listGenericSyntax);
  });

  it("tuple", () => {
    const record: [string, number] = ["Joe", 65];
    expect(record[0]).toBe("Joe");
    expect(record[1]).toBe(65);
  });

  it("numeric enum", () => {
    enum ColorDefault {
      Red,
      Green,
      Blue,
    }
    enum ColorCustom {
      Red = 1,
      Green = 2,
      Blue = 4,
    }
    const color1: ColorDefault = ColorDefault.Blue;
    const color2: ColorCustom = ColorCustom.Green;
    expect(typeof color1).toBe("number");
    expect(color1).toBe(ColorDefault.Blue);
    expect(color1).toBe(2);
    expect(color2).toBe(2);
    expect(ColorDefault[2]).toBe("Blue");
    expect(ColorCustom[2]).toBe("Green");
  });

  it("string enum", () => {
    enum Direction {
      Up = "UP",
      Down = "DOWN",
      Left = "LEFT",
      Right = "RIGHT",
    }
    const direction: Direction = Direction.Up;
    expect(typeof direction).toBe("string");
    expect(direction).toBe(Direction.Up);
    expect(direction).toBe("UP");
    expect(Direction["Up"]).toBe(direction);
  });

  it("any - no type checking", () => {
    function someLibraryFunction(): any {
      return "testing";
    }
    const value: string = someLibraryFunction();
    expect(value).toBe("testing");
    expect(value.length).toBe(7);
  });

  it("unknown - value could be anything", () => {
    let value: unknown = 4;
    value = "testing";
    expect(value).toBe("testing");
    // TS2571: Object is of type 'unknown'.
    // expect(value.length).toBe(7);
    expect(typeof value).toBe("string");
  });

  it("type assertions", () => {
    let value: unknown = "testing";
    expect(value).toBe("testing");
    expect((value as string).length).toBe(7);
    expect((<string>value).length).toBe(7);
  });

  it("void - no value", () => {
    function doSomething(): void {}
    expect(doSomething()).toBeUndefined();
  });

  it("never", () => {
    function infinite(message: string): never {
      while (true) {}
    }
    function error(message: string): never {
      throw new Error(message);
    }
    expect(() => error("foo")).toThrow();
  });

  it("null and undefined", () => {
    // TS2322: Type 'null' is not assignable to type 'string'.
    // let required: string = null;
    // TS2322: Type 'undefined' is not assignable to type 'string | null'.
    // let nullable: string | null = undefined;
    let optional1: string | null = null;
    let optional2: string | undefined = undefined;
  });

  it("object", () => {
    function create(o: object): void {}
    create({ a: 1, b: 2 });
    // TS2345: Argument of type 'null' is not assignable to parameter of type 'object'.
    // create(null);
    // TS2345: Argument of type 'number' is not assignable to parameter of type 'object'.
    // create(42);
  });
});
