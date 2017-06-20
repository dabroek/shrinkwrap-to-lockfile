const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const _ = require('lodash');

function parseJsonFile(filename) {
  let obj = {};

  try {
    const file = fs.readFileSync(path.resolve(process.cwd(), filename), 'utf8');
    obj = JSON.parse(file);
  } catch (error) {
    throw new Error(`${filename} could not be parsed.`);
  }

  return obj;
}

function getDependencyVersions(dependencies) {
  return _.reduce(dependencies, (result, pkg, name) => {
    const version = pkg.version || pkg;
    result[name] = _.head(version.match(/(\d+\.\d+\.\d+(?:-.+)?)/));

    return result;
  }, {});
}

function objectMergeLeft(a, b) {
  return _.reduce(a, (result, value, key) => {
    result[key] = value;

    if (!_.isEqual(value, b[key])) {
      result[key] = b[key];
    }

    return result;
  }, {});
}

function updatePackageJson(shrinkwrapFile, packageFile) {
  const shrinkwrapJson = parseJsonFile(shrinkwrapFile);
  const packageJson = parseJsonFile(packageFile);

  const shrinkwrapVersions = getDependencyVersions(shrinkwrapJson.dependencies);

  if (packageJson.dependencies) {
    const dependencyVersions = getDependencyVersions(packageJson.dependencies);
    packageJson.dependencies = objectMergeLeft(dependencyVersions, shrinkwrapVersions);
  }

  if (packageJson.devDependencies) {
    const devDependencyVersions = getDependencyVersions(packageJson.devDependencies);
    packageJson.devDependencies = objectMergeLeft(devDependencyVersions, shrinkwrapVersions);
  }

  fs.writeFileSync(path.resolve(__dirname, 'package.json'), JSON.stringify(packageJson, null, 2));
}

function createLockFile() {
  exec('yarn install');
}

function shrinkwrapToLockfile(shrinkwrap = 'npm-shrinkwrap.json', packageJson = 'package.json') {
  updatePackageJson(shrinkwrap, packageJson);
  createLockFile();
}

module.exports = shrinkwrapToLockfile;
