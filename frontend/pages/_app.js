import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { JobProvider } from "../context/JobContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <JobProvider>
        <Component {...pageProps} />
      </JobProvider>
    </AuthProvider>
  );
}

export default MyApp;
