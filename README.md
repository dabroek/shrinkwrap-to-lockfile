# NPM Shrinkwrap to Yarn lockfile

Migrate your `npm-shrinkwrap.json` to a yarn lockfile without a headache!

The migration consists of three steps:
* extract the dependency versions from the `npm-shrinkwrap.json`;
* save and lock down these versions in the `package.json` (by removing the version leniency, i.e. `~` and `^`); 
* generate a new `yarn.lock` file from the updated `package.json`.

## Installation

```bash
yarn global add shrinkwrap-to-lockfile
```

## How to use

```bash
shrinkwrap-to-lockfile [npm-shrinkwrap-file] [package-file]
```

That's it!
