import {onRequest} from "firebase-functions/v2/https";
import {saveProfile, getProfile} from "../controllers/profileController";
import corsHandler from "../middlewares/corsMiddleware";
import authMiddleware from "../middlewares/authMiddleware";

export const saveProfileHttp = onRequest((req, res) => {
  corsHandler(req, res, () => {
    authMiddleware(req, res, () => {
      saveProfile(req, res);
    });
  });
});

export const getProfileHttp = onRequest((req, res) => {
  corsHandler(req, res, () => {
    authMiddleware(req, res, () => {
      getProfile(req, res);
    });
  });
});
