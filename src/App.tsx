import Routes from "./pages/routes";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { GOOGLE_OAUTH_CLIENT_ID } from "./constant";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { AppProvider } from "./services/app-context";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {/* <AppProvider> */}
        <div className="font-inter flex flex-col">
          <Routes />
        </div>
        {/* </AppProvider> */}
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
