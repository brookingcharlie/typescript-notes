describe("literal types", () => {
  it("string literal types", () => {
    type Result = "win" | "loss" | "draw";
    const result1: Result = "win";
    // TS2322: Type '"defeat"' is not assignable to type 'Result'.
    // const result2: Result = "defeat";
  });

  it("numeric literal types", () => {
    type Roll = 1 | 2 | 3 | 4 | 5 | 6;
    const roll1: Roll = 6;
    // TS2322: Type '7' is not assignable to type 'Roll'.
    // const roll2: Roll = 7;
  });

  it("boolean literal types", () => {
    interface ValidationSuccess {
      isValid: true;
      reason: null;
    }

    interface ValidationFailure {
      isValid: false;
      reason: string;
    }

    type ValidationResult = ValidationSuccess | ValidationFailure;
    const result1: ValidationResult = { isValid: true, reason: null };
    const result2: ValidationResult = { isValid: false, reason: "Too short" };
    // TS2322: Type '{ isValid: true; reason: string; }' is not assignable to type 'ValidationResult'.
    //   Type '{ isValid: true; reason: string; }' is not assignable to type 'ValidationFailure'.
    //   Types of property 'isValid' are incompatible.
    //   Type 'true' is not assignable to type 'false'.
    // const result3: ValidationResult = { isValid: true, reason: "Got it!" };
  });
});
