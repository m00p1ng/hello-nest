import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  await rm(join(__dirname, '..', 'test.sqlite'));
});
