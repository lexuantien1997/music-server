import React, {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


import Artist from "./pages/Artist";
import Song from "./pages/Song";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
      <Route
        render={({ location }) => (
          <div style = {{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
            <Route
              exact
              path="/"
              render = { () =>  <Redirect to="/add-song" />}
            />

            <ul style = {{ padding: 0, margin: 0, position: "absolute", top: 0, height: "40px", width: "100%", display: "flex" }}>
              <NavLink to="/add-artist">Add Artist</NavLink>
              <NavLink to="/add-song">Add Song</NavLink>
              <NavLink to="/manage-user">Manage User</NavLink>
              <NavLink to="/add-utils">Add Utils</NavLink>
            </ul>

            <div style = {{ position: "absolute", left: 0, right: 0,top: 0,bottom: 0,top: "40px",textAlign: "center"}}>
              <Switch>
                <Route exact path="/add-artist" render={ () => <Artist />} />
                <Route exact path="/add-song" render={ () => <Song />} />
                <Route render={() => <div>Not Found</div>} />
              </Switch>
            </div>
          </div>
        )}
      />
    </Router>
    );
  }
}
export default App;

function NavLink(props) {
  return (
    <li style={{ textAlign: "center", flex: 1, listStyleType: "none", padding: "10px" }}>
      <Link {...props} style={{ color: "inherit" }} />
    </li>
  );
}
