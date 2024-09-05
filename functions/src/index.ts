import { onRequest } from 'firebase-functions/v2/https'
import express from 'express'
import { saveProfile, getProfile } from './controllers/profileController'
import corsHandler from './middlewares/corsMiddleware'
import authMiddleware from './middlewares/authMiddleware'

const app = express()
app.use(express.json())

app.use(corsHandler)
app.use(authMiddleware)

app.post('/profile', saveProfile)
app.get('/profile', getProfile)

exports.app = onRequest(app)
