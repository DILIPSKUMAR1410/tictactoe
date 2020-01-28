import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Tictactoe from './Components/tictactoe/tictactoe'
import Landingpage from './Components/Landingpage/Landingpage'
import Scoreboard from './Components/Listingpage/Listingpage'
import PublicRoute from './Route/Publicroute';
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute component={Landingpage} path="/" exact />
          <PublicRoute component={Tictactoe} path="/tictactoe" exact />
          <PublicRoute component={Scoreboard} path="/scoreboard" exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;