import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import firebase from "firebase";
import { CookiesProvider } from "react-cookie";
import theme from "./theme/theme";

// firebase関連
import { firebaseConfig } from "./env";
import { RecoilRoot } from "recoil";

require("firebase/firestore");

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <RecoilRoot>
      <CookiesProvider>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ChakraProvider>
      </CookiesProvider>
    </RecoilRoot>
  );
}
