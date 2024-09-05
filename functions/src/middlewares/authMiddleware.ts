import { CustomRequest } from '../types/CustomRequest'
import { Response, NextFunction } from 'express'
import { auth } from '../utils/firebase'

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' })
    return
  }

  const idToken = authorizationHeader.split('Bearer ')[1]

  try {
    const decodedToken = await auth.verifyIdToken(idToken)

    req.user = decodedToken

    next()
    return
  } catch (error) {
    console.error('Error verifying token:', error)

    res.status(401).json({ message: 'Unauthorized: Invalid or expired token' })
    return
  }
}

export default authMiddleware
