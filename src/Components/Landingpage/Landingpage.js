import React from 'react'
import './Landingpage.css'
import {
  UserSession,
  AppConfig,
} from 'blockstack';
import Lottie from 'react-lottie';
import animationData from '../../Assets/tictactoe.json'
const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })
class Landingpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }
  handleSignin = (e) => {
    e.preventDefault();
    userSession.redirectToSignIn();
  }
  handleSignOut(e) {
    e.preventDefault();
    localStorage.removeItem("tictactoe");
    userSession.signUserOut(window.location.origin);
  }
  fetchdata = () => {
    if (userSession.isUserSignedIn()) {
      // const option={encrypt : false};
      // var temp=[];
      // userSession.putFile("Journaldata.json",JSON.stringify(temp),option); 
      console.log("Hi");
      const options = { decrypt: false };
      userSession.getFile('Tictactoe.json', options)
        .then((file) => {
          console.log("Hi1");
          if (file)
            localStorage.setItem("tictactoe", file);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }
  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        this.props.history.push("/");
        window.history.replaceState({}, document.title, "/");
        this.setState({ loading: true });
      }).finally(() => {
        this.fetchdata();
      })
    }
  }
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
    return (
      <div className="land">
        <div className="header">
          <img src={require("../../Assets/tictactoe.png")} />
          tictactoe
        </div>
        <div className="rowland">
          <div className="leftrow">
            <p>Try out Tic-Tac-Toe on decentralized web..</p>
            <p>Enjoy!</p>
            {!userSession.isUserSignedIn() ?
            <button onClick={this.handleSignin}>Login using blockstack</button>:
                <div>
                  <button onClick={this.handleSignOut}>Logout</button>
                  <a href="/tictactoe">Let's Play</a>
                  <a href="/scoreboard">Scoreboard</a>
                </div>}
          </div>
          <div>
            <Lottie options={defaultOptions}
              height={400} width={400}
            />
          </div>
        </div>
        <div className="footerland">Copyright@tictactoe2019</div>
        {this.state.loading ? <div className="loadcontainer"><div className="loader" /></div> : null}
      </div>
    )
  }
}
export default Landingpage;