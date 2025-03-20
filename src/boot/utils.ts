import { firebaseAuth } from 'boot/firebase'; //firebaseApp, firestoreDB
import { OAuthProvider, signInWithPopup } from 'firebase/auth';

const loginOIDC = ($q: { loading: { hide: never } }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const provider = new OAuthProvider('oidc.mira.dev.monterrey.gob.mx');
  signInWithPopup(firebaseAuth, provider)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .then((result) => {
      //result
      // const credential = OAuthProvider.credentialFromResult(result);
    })
    .catch((error) => {
      console.error('error', error);
    })
    .finally(() => {
      $q.loading.hide;
    });
};

const logoutOIDC = () => {
  window.location.href =
    'https://iam.monterrey.gob.mx/realms/IDMty/protocol/openid-connect/logout';
};

const logOutOIDCFirebase = async ($q: {
  loading: { show: (arg0: { message: string }) => void; hide: () => void };
  router: string[];
}) => {
  $q.loading.show({
    message: 'Cerrando sesión, por favor espera...',
  });
  try {
    await firebaseAuth.signOut();
    $q.router.push('/');
  } catch (error) {
    console.error('error', error);
  } finally {
    $q.loading.hide();
  }
};

export { loginOIDC, logoutOIDC, logOutOIDCFirebase };
