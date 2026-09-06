import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Landing } from './pages/Landing';
import { SignIn } from './pages/SignIn';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { Product } from './pages/Product';
import { HowItWorks } from './pages/HowItWorks';
import { About } from './pages/About';
import { Dashboard } from './pages/Dashboard';
import { NewAnalysis } from './pages/NewAnalysis';
import { AnalysisResults } from './pages/AnalysisResults';
import { StandardDetail } from './pages/StandardDetail';
import { MyAnalyses } from './pages/MyAnalyses';
import { Settings } from './pages/Settings';
import { HelpSupport } from './pages/HelpSupport';
import { DashboardLayout } from './components/layout/DashboardLayout';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public landing and informational pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/product" element={<Product />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />

          {/* Protected Dashboard routes with sidebar layout */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="new-analysis" element={<NewAnalysis />} />
            <Route path="results/:id" element={<AnalysisResults />} />
            <Route path="standard/:id" element={<StandardDetail />} />
            <Route path="my-analyses" element={<MyAnalyses />} />
            {/* Redirect any legacy library links smoothly into new-analysis workspace */}
            <Route path="standards-library" element={<Navigate to="/app/new-analysis" replace />} />
            <Route path="saved" element={<Dashboard />} />
            <Route path="recent" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<HelpSupport />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
