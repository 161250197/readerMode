import axios from 'axios'
import {
  serverHost,
  serverPort
} from './consts'

const instance = axios.create({
  baseURL: `http://${serverHost}:${serverPort}/`,
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
})

export {
  instance
}
