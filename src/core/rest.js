import { create } from 'axios'

// create instance rest
export default create({
  baseURL: 'deezer',
  headers: {
    'Access-Control-Request-Credentials': 'true'
  }
});
