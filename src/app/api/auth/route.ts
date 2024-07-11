import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../lib/firebase";

const PARENT_FRAME = document.location.ancestorOrigins[0];

const PROVIDER = new GoogleAuthProvider();

function sendResponse(result: any) {
  globalThis.parent.self.postMessage(JSON.stringify(result), PARENT_FRAME);
}

globalThis.addEventListener("message", function ({ data }) {
  if (data.initAuth) {
    // Opens the Google sign-in page in a popup, inside of an iframe in the
    // extension's offscreen document.
    // To centralize logic, all respones are forwarded to the parent frame,
    // which goes on to forward them to the extension's service worker.
    signInWithPopup(auth, PROVIDER).then(sendResponse).catch(sendResponse);
  }
});
