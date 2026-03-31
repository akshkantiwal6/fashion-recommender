import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Upload from "./pages/upload";

export default function App() {
  return (
    <Router>
      <Routes>
        {[
          ["/", <Login />],
          ["/admin", <Admin />],
          ["/upload", <Upload />],
        ].map(([path, el]) => (
          <Route key={path} path={path} element={el} />
        ))}
      </Routes>
    </Router>
  );
}