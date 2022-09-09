import * as axios from 'axios';

console.log(process.env, SERVICE_URL)
const instance = axios.create({
  baseURL: SERVICE_URL,
});

export { instance as default };
