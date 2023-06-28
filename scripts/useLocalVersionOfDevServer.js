#!/usr/bin/env node
const path = require('path');
const { writeFileSync } = require('fs');

const PATH_TO_DEMO_PROJECT = path.join(__dirname, '../src/app/extensions/');
const PACKAGE_JSON_PATH = path.join(PATH_TO_DEMO_PROJECT, 'package.json');
const PACKAGE_JSON = require(PACKAGE_JSON_PATH);

PACKAGE_JSON.devDependencies['@hubspot/ui-extensions-dev-server'] =
  '../../../../../ui-extensibility/public-packages/ui-extensions-dev-server/';

writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(PACKAGE_JSON, null, 2));
