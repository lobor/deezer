import { create } from 'axios'

export default create({
  baseURL: 'http://api.deezer.com/search/',
  headers: {
    'Access-Control-Request-Credentials': 'true'
  }
});
