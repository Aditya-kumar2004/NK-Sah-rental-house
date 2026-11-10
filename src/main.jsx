import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// 1. Headings: Playfair Display (600, 700)
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";

// 2. Body: Plus Jakarta Sans (400, 500, 600, 700)
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";

// 3. Hindi Headings: Noto Serif Devanagari (600, 700)
import "@fontsource/noto-serif-devanagari/600.css";
import "@fontsource/noto-serif-devanagari/700.css";

// 4. Hindi Body: Noto Sans Devanagari (400, 500, 600)
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/500.css";
import "@fontsource/noto-sans-devanagari/600.css";

createRoot(document.getElementById("root")).render(<App />);

