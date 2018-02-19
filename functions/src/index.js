import * as functions from 'firebase-functions'
import instagramFn from './instagram'

export const instagram = functions.https.onRequest(instagramFn)
