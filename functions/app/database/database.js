let database;

exports.getDatabase = () => {
  if (!database) {
    const admin = require("firebase-admin");
    const serviceAccount = require("../../service-account.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    database = admin.firestore();
  }
  return database;
};
