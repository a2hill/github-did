const ghdid = require('@github-did/lib');
const fse = require('fs-extra');
const path = require('path');

module.exports = (vorpal) => {
  vorpal.command('verify2 <pathToFile>', 'verify signed JSON-LD').action(async ({ pathToFile }) => {
    const payload = JSON.parse(fse.readFileSync(path.resolve(pathToFile)));
    const verified = await ghdid.v2.func.verifyWithResolver(payload, ghdid.v2.func.resolver);
    await vorpal.logger.log({
      level: 'info',
      message: `${pathToFile} ${verified ? 'proof is valid' : 'proof is not valid'} `,
    });
    return vorpal.wait(1);
  });
};