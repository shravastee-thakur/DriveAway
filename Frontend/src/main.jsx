import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import BookingProvider from "./context/BookingProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BookingProvider>
      <App />
    </BookingProvider>
  </AuthProvider>
);
