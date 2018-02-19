import * as functions from 'firebase-functions'
import helloWorld from './helloWorld'

export const main = functions.https.onRequest(helloWorld)
