const { remoteBuild } = require('@hubspot/ui-extensions-dev-server');
const fs = require('fs');
const crypto = require('crypto');

exports.main = async (context = {}) => {
  const { source } = context.event.payload;
  const id = crypto.randomBytes(16).toString('hex');
  const filename = `${id}.jsx`;
  const outputFilename = `${id}.js`;

  fs.writeFileSync(`/tmp/${filename}`, source);
  remoteBuild(`/tmp`, filename, `/tmp/dist`);

  const result = fs.readFileSync(`/tmp/dist/${outputFilename}`);

  return {
    data: result.toString('base64'),
  };
};
