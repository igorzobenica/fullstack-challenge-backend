import firebaseFunctionsTest from 'firebase-functions-test'
import { saveProfile, getProfile } from '../src/controllers/profileController'
import { Request, Response } from 'express'
import { db } from '../src/utils/firebase'

const testEnv = firebaseFunctionsTest(
  {
    projectId: 'fullstack-challenge-5a3f1',
    storageBucket: 'fullstack-challenge-5a3f1.appspot.com',
  },
  './config/fullstack-challenge-5a3f1-90a715e294fd.json',
)

jest.mock('../src/utils/firebase', () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    set: jest.fn(),
    get: jest.fn().mockResolvedValueOnce({
      exists: true,
      data: () => ({
        name: 'Test User',
        email: 'testuser@example.com',
      }),
    }),
  },
}))

describe('Profile Controller', () => {
  afterAll(() => {
    testEnv.cleanup()
  })

  describe('getProfile', () => {
    it('should fetch a user profile successfully', async () => {
      const req = {
        user: { phone_number: '1234567890' },
      } as unknown as Request

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response

      await getProfile(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'testuser@example.com',
      })
    })

    it('should return 200 if user not found', async () => {
      // Mocking Firebase to return no document
      jest.mocked(db.doc).mockReturnValueOnce({
        get: jest.fn().mockResolvedValueOnce({ exists: false }),
      } as any)

      const req = {
        user: { phone_number: '1234567890' },
      } as unknown as Request

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response

      await getProfile(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        message: 'No user found',
        user: null,
      })
    })

    it('should return 500 on Firebase error', async () => {
      // Mocking Firebase to throw an error
      jest.mocked(db.doc).mockReturnValueOnce({
        get: jest.fn().mockRejectedValueOnce(new Error('Firebase error')),
      } as any)

      const req = {
        user: { phone_number: '1234567890' },
      } as unknown as Request

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response

      await getProfile(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server error',
      })
    })
  })

  describe('saveProfile', () => {
    it('should save user profile successfully', async () => {
      const req = {
        body: {
          name: 'Test User',
          email: 'testuser@example.com',
        },
        user: { phone_number: '1234567890' },
      } as unknown as Request

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response

      await saveProfile(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Profile saved successfully',
      })
    })

    it('should return 400 for missing name or email', async () => {
      const req = {
        body: {
          name: '',
          email: '',
        },
        user: { phone_number: '1234567890' },
      } as unknown as Request

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response

      await saveProfile(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Name and email are required',
      })
    })

    it('should return 400 for invalid email format', async () => {
      const req = {
        body: {
          name: 'Test User',
          email: 'invalid-email',
        },
        user: { phone_number: '1234567890' },
      } as unknown as Request

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response

      await saveProfile(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email format' })
    })
  })
})
