
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";

function App() {
	
  return (
	<Routes>
		<Route path="/" element={<Layout />}>
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="contacts" element={<Contacts />} />
			<Route path="*" element={<NoPage />} />
		</Route>
	</Routes>
  );
}

export default App;
