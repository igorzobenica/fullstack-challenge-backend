import cors from 'cors'

const allowedOrigins = [
  'http://localhost:5173', // Local dev environment
  process.env.DEPLOYED_FRONTEND_URL, // Netlify deployed frontend URL
]

const corsHandler = cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin || '') || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
})

export default corsHandler
