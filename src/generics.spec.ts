describe("generics", () => {
  it("generic types", () => {
    function identity<T>(arg: T): T {
      return arg;
    }

    interface Identity<T> {
      (arg: T): T;
    }

    const f: Identity<number> = identity;
    const g: <T>(arg: T) => T = identity;
    expect(f(123)).toBe(123);
    expect(g(123)).toBe(123);

    function length<T>(arg: T[]): number {
      return arg.length;
    }

    expect(length([1, 2, 3])).toBe(3);
  });

  it("generic classes", () => {
    class Accumulator<T> {
      private _items: T[] = [];

      public add(x: T) {
        this._items.push(x);
      }

      public get items() {
        return this._items;
      }
    }

    const accumulator = new Accumulator<string>();
    accumulator.add("a");
    accumulator.add("b");
    expect(accumulator.items).toStrictEqual(["a", "b"]);
  });

  it("generic constraints", () => {
    interface Line {
      length: number;
    }

    function length<T extends Line>(arg: T): number {
      return arg.length;
    }

    expect(length({ length: 3 })).toBe(3);
  });
});
