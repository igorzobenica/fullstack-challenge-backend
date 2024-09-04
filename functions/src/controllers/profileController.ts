import {Request, Response} from "firebase-functions";
import {db} from "../utils/firebase";

export const saveProfile = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;
  const phoneNumber = req.user.phone_number;

  if (!name || !email) {
    res.status(400).json({ message: "Name and email are required" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Invalid email format" });
    return;
  }

  try {
    const userRef = db.collection("users").doc(phoneNumber);
    await userRef.set({ name, email });

    res.status(200).json({ message: "Profile saved successfully" });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const phoneNumber = req.user.phone_number;

  try {
    const userRef = db.collection("users").doc(phoneNumber as string);
    const doc = await userRef.get();

    if (doc.exists) {
      res.status(200).json(doc.data());
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
