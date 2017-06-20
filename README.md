# NPM Shrinkwrap to Yarn lockfile

Migrate your `npm-shrinkwrap.json` to a yarn lockfile without a headache!

There is three steps we perform with this migration:
* We extract the dependencies from the `npm-shrinkwrap.json`;
* We save and lock down these dependencies in the `package.json` (removing the ~ or ^); 
* We generate a new `yarn.lock` file from the updated `package.json`.

## Installation

```bash
yarn global add shrinkwrap-to-lockfile
```

## How to use

```bash
shrinkwrap-to-lockfile [npm-shrinkwrap-file] [package-file]
```

That's it!
