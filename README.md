# TypeScript notes

My notes on TypeScript, written as unit tests that demonstrate features of the language.

## Usage

These tests are mainly intended for reading, to understand how TypeScript works.

To execute them, run:

```
yarn test
```

## Maintenance notes

### How the project was created

Generated initial node project using `yarn init -p -y`.

Added TypeScript dependency using `yarn add -D typescript`.

Added the following scripts in `package.json` to build/run:

```
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js"
}
```

Configured the TypeScript compiler with this `tsconfig.json`
to compile from `src/` to `dist/`:

```
{
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
preprocessor with source map support for Jest, using:

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

## Troubleshooting

### Jest hangs

If you're on Mac, try running `brew reinstall watchman`
(see [jest/issues/4529](https://github.com/facebook/jest/issues/4529)).

## References

### Using Babel instead of tsc/ts-jest

See [this blog post](https://iamturns.com/typescript-babel/) for an alternative approach.
It advocates transpiling with babel to improve build speed and simplify the tool ecosystem,
though it notes you should separately run the TypeScript compiler to check types.

The official TypeScript handbook also
[notes](https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html)
that, when "you need a build pipeline with multiple potential outputs ...
use `babel` for transpiling and `tsc` for type checking".
