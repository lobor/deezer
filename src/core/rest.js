import { create } from 'axios'

// create instance rest
export default create({
  baseURL: 'http://api.deezer.com/search/',
  headers: {
    'Access-Control-Request-Credentials': 'true'
  }
});
