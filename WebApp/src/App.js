// Basic
import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import backBase from "./assets/backBase.png"

// Router
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

// Pages
import Main from "./pages/main";
import MainM from "./pagesMob/main"
import MainMNM from "./pagesMobNM/main"
import Login from './pagesMobNM/login/login';

// Utils
import history from "./utils/history";

// Cookies
import { CookiesProvider } from 'react-cookie';
import ContextModule from './utils/contextModule';
import { isMobile } from 'react-device-detect';
import reactAutobind from "react-autobind";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ewallet: null,
      crypto: null
    }
    reactAutobind(this)
  }

  static contextType = ContextModule;

  componentDidMount() {
    document.body.style.backgroundImage = `url(${backBase})`
  }

  render() {
    if (isMobile && window.ethereum ? true : false) { // If metamask Available
      console.log("Mobile Metamask")
      return (
        <CookiesProvider>
          <Router history={history}>
            <Routes>
              <Route path="/:address" element={<MainM />} />
              <Route path="*" element={<MainM />} />
            </Routes>
          </Router>
        </CookiesProvider>
      );
    }
    else if (isMobile) {
      console.log("Mobile not Metamask")
      return (
        <CookiesProvider>
          <Router history={history}>
            <Routes>
              <Route path="/" element={<Login login={this.login} />} />
              <Route path="/main/:address" element={<MainMNM />} />
              <Route path="*" element={<MainMNM />} />
            </Routes>
          </Router>
        </CookiesProvider>
      );
    }
    else {
      console.log("Desktop")
      return (
        <CookiesProvider>
          <Router history={history}>
            <Routes>
              <Route path="/:address" element={<Main />} />
              <Route path="*" element={<Main />} />
            </Routes>
          </Router>
        </CookiesProvider>
      );
    }
  }
}

export default App;
