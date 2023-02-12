import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Inbox from './pages/Inbox'
import SendEmail from './pages/SendEmail'
import Starred from './pages/Starred'

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Contact() {
//   return <h2>Contact</h2>;
// }

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/send-email">SendEmail</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Inbox />} />
          <Route path="/send-email" element={<SendEmail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
