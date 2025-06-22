import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import BookingProvider from "./Context/BookingProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BookingProvider>
      <App />
    </BookingProvider>
  </AuthProvider>
);
