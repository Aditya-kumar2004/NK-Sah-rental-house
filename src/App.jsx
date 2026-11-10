import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { LanguageProvider } from "@/hooks/useLanguage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <LanguageProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        {/* Catch-all route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </LanguageProvider>
        </ThemeProvider>
    </QueryClientProvider>
);

export default App;
