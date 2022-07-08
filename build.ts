/**
 * Remove old files, copy front-end ones.
 */

import fs from "fs-extra";
import logger from "jet-logger";
import childProcess from "child_process";

(async () => {
  try {
    // Remove current build
    await remove("./dist/");
    // Copy production env file
    await copy(
      "./src/config/env/production.env",
      "./dist/config/env/production.env"
    );

    await copy(
      "./src/config/env/development.env",
      "./dist/config/env/development.env"
    );

    // Copy back-end files
    await exec("tsc --build tsconfig.json", "./");
  } catch (err) {
    logger.err(err);
  }
})();

function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.remove(loc, (err) => {
      return !!err ? rej(err) : res();
    });
  });
}

function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.copy(src, dest, (err) => {
      return !!err ? rej(err) : res();
    });
  });
}

function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
      if (!!stdout) {
        logger.info(stdout);
      }
      if (!!stderr) {
        logger.warn(stderr);
      }
      return !!err ? rej(err) : res();
    });
  });
}
