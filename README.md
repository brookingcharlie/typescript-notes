# TypeScript notes

My notes on TypeScript, written as unit tests that demonstrate features of the language.

Also includes an example main program to show compilation/running.

## Usage

The tests are mainly intended for reading, to understand how TypeScript works.

To execute them, run:

```
yarn test
```

To compile:

```
yarn build
```

To run example main program:

```
yarn start
```

## Maintenance notes

### How the project was created

Generated initial node project using `yarn init -p -y`.

Added TypeScript dependency using `yarn add --dev typescript`.

Added the following scripts in `package.json` to build/run:

```
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js"
}
```

Added TypeScript's [recommended base configuration](https://github.com/tsconfig/bases#readme):

```
yarn add --dev @tsconfig/recommended
```

Configured the TypeScript compiler with this `tsconfig.json`
to compile from `src/` to `dist/`:

```
{
  "extends": "@tsconfig/recommended/tsconfig.json",
  "include": [
    "./src/**/*.ts"
  ],
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### Testing with Jest

Installed [ts-jest](https://github.com/kulshekhar/ts-jest), a TypeScript
preprocessor for [Jest](https://jestjs.io/), using:

```
yarn add --dev jest ts-jest @types/jest
```

And created `jest.config.js` using:

```
yarn ts-jest config:init
```

The resulting `jest.config.js` included the ts-jest preset:

```
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

Added a `test` script to run Jest:

```
"scripts": {
  ...,
  "test": "jest"
}
```

### Code formatting with Prettier

Added [Prettier](https://prettier.io/) dependency:

```
yarn add --dev prettier
```

Created an empty config file to let editors/tools know we're using Prettier:

```
echo '{}' > .prettierrc.json
```

Added a `format` script to run it:

```
"scripts": {
  ...,
  "format": "prettier --write src"
}
```

## Troubleshooting

### Jest hangs

If you're on Mac, try running `brew reinstall watchman`
(see [jest/issues/4529](https://github.com/facebook/jest/issues/4529)).

## References

### Basic references

* [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [Jest docs](https://jestjs.io/docs/en/getting-started)

### Using Babel instead of tsc/ts-jest

See [this blog post](https://iamturns.com/typescript-babel/) for an alternative approach.
It advocates transpiling with babel to improve build speed and simplify the tool ecosystem,
though it notes you should separately run the TypeScript compiler to check types.

The official TypeScript handbook also
[notes](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html)
that, when "you need a build pipeline with multiple potential outputs ...
use `babel` for transpiling and `tsc` for type checking".
