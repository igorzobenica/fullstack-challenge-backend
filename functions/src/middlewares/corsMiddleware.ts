import cors from 'cors'
import * as functions from 'firebase-functions';

const frontendUrl = functions.config().app?.frontend_url || 'http://localhost:5173';

const corsHandler = cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      frontendUrl,
    ];

    if (allowedOrigins.includes(origin ?? '') || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
});

export default corsHandler
