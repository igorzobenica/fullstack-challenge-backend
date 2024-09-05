import cors from 'cors'

const corsHandler = cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173', // TODO: Add production URL once FE gets deployed,
    ]

    if (allowedOrigins.includes(origin ?? '') || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
})

export default corsHandler
