describe("union and intersection types", () => {
  it("simple unions", () => {
    type Id = string | number;
    const id1: Id = "foo";
    const id2: Id = 3;
    // TS2322: Type 'boolean' is not assignable to type 'Id'.
    // const id3: Id = true;
  });

  it("unions with common fields", () => {
    interface Bird {
      fly(): void;

      layEggs(): void;
    }

    interface Fish {
      swim(): void;

      layEggs(): void;
    }

    function handle(smallPet: Fish | Bird) {
      smallPet.layEggs();
      // TS2339: Property 'fly' does not exist on type 'Bird | Fish'.
      //   Property 'fly' does not exist on type 'Fish'.
      // smallPet.fly();
      // TS2339: Property 'swim' does not exist on type 'Bird | Fish'.
      //   Property 'swim' does not exist on type 'Bird'.
      // smallPet.swim();
    }
  });

  it("discriminating unions", () => {
    type NetworkLoadingState = {
      state: "loading";
    };
    type NetworkFailedState = {
      state: "failed";
      code: number;
    };
    type NetworkSuccessState = {
      state: "success";
      response: {
        title: string;
      };
    };
    type NetworkState =
      | NetworkLoadingState
      | NetworkFailedState
      | NetworkSuccessState;

    function handle(state: NetworkState): string {
      switch (state.state) {
        case "loading":
          return "Downloading";
        case "failed":
          return `Error ${state.code}`;
        case "success":
          return `${state.response.title}`;
      }
    }

    expect(handle({ state: "loading" })).toBe("Downloading");
    expect(handle({ state: "failed", code: 404 })).toBe("Error 404");
    expect(handle({ state: "success", response: { title: "Rx" } })).toBe("Rx");
  });

  it("intersection types", () => {
    interface ErrorHandling {
      success: boolean;
      error?: { message: string };
    }

    interface ArtworksData {
      artworks: { title: string }[];
    }

    type ArtworksResponse = ArtworksData & ErrorHandling;
    const response: ArtworksResponse = {
      success: true,
      artworks: [{ title: "The Moon" }, { title: "The Stars" }],
    };
  });
});
