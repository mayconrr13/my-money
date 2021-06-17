import admin from 'firebase-admin';

import 'firebase/firestore';

import serviceAccount from '../../serviceAccountCredentials.json';

const config = {
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
};

if (admin.apps.length === 0) {
  admin.initializeApp(config);
}

export default admin;
