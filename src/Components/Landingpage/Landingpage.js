import React from 'react'
import './Landingpage.css'
import {
    UserSession,
    AppConfig,
  } from 'blockstack';
  const appConfig = new AppConfig()
  const userSession = new UserSession({ appConfig: appConfig })
class Landingpage extends React.Component{
    constructor(props){
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
        localStorage. removeItem("tictactoe");
        userSession.signUserOut(window.location.origin);
    }
    fetchdata=()=>{
        if (userSession.isUserSignedIn()) 
        {  
          // const option={encrypt : false};
          // var temp=[];
          // userSession.putFile("Journaldata.json",JSON.stringify(temp),option);  
        const options = { decrypt: false };
        userSession.getFile('Tictactoe.json', options)
          .then((file) => {
            if(file)
            localStorage.setItem("tictactoe", JSON.stringify(JSON.parse(file)));      
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.setState({ loading: false });       
          });  
        }
      }
      componentDidMount() 
      {   
        if (userSession.isSignInPending()) {
          userSession.handlePendingSignIn().then((userData) => {
            this.props.history.push("/");
            window.history.replaceState({}, document.title, "/");
            this.setState({ loading: true });
          })
        this.fetchdata();
      
        }
      }
render(){
    return(
        <div className="land">
            {!userSession.isUserSignedIn() ?
            <button onClick={this.handleSignin}>Login using blockstack</button>:
                <div>
                  <a href="/tictactoe">Go to game</a>
                 <a href="/scoreboard">Scoreboard</a>
                  <button onClick={this.handleSignOut}>Logout</button>
                </div>}
            {this.state.loading ? <div class="loadcontainer"><div class="loader" /></div> : null}
        </div>
    )
}
}
export default Landingpage;