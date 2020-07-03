import * as dotenv from 'dotenv';
import * as fs from 'fs';

const envConfig = dotenv.parse(
  fs.readFileSync(`./env/.${process.env.NODE_ENV}.env`),
);

export default envConfig
