/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Inisialisasi Firebase Admin SDK
admin.initializeApp();

// Fungsi untuk membuat Firebase Custom Token
exports.createFirebaseToken = functions.https.onRequest(async (req, res) => {
  const {clerkUserId} = req.body; // Mengambil ID pengguna dari permintaan
  try {
    const firebaseToken = await admin.auth().createCustomToken(clerkUserId);
    res.status(200).send({firebaseToken});
  } catch (error) {
    console.error("Error creating Firebase token:", error);
    res.status(500).send({error: "Unable to create Firebase token"});
  }
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
