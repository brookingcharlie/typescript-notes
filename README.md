# TypeScript notes

My notes on TypeScript, written as unit tests that demonstrate features of the language.

## Usage

These tests are mainly intended for reading, to understand how TypeScript works.

To execute them, run:

```
```

## Maintenance notes

### How the project was created

The initial node project was generated using `yarn init -p -y`.

The basic TypeScript dependency was added using `yarn add -D typescript`.

Then the following scripts were added in `package.json` to build/run:

```
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js"
}
```

The TypeScript compiler was configured with this `tsconfig.json`
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
