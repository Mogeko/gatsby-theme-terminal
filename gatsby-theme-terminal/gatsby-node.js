const fs = require('fs');

exports.onPreBootstrap = async ({ reporter }) => {
  const contentPath = `${__dirname}/content/posts`;

  fs.stat(contentPath, (err) => {
    if (err) {
      reporter.info(`creating the ${contentPath} directory`);
      fs.mkdir(contentPath, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }
  });
};
