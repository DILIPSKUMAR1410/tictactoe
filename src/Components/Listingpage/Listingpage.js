import React from 'react'
import './Listingpage.css'
class Listingpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            computer: 0,
            you: 0
        };
        this.gohome = this.gohome.bind(this);

    }
    componentDidMount() {
        if (localStorage.getItem("tictactoe")) {
            this.setState({ computer: JSON.parse(localStorage.getItem("tictactoe"))[0] });
            this.setState({ you: JSON.parse(localStorage.getItem("tictactoe"))[1] });
        }
    }
    gohome(){
        this.props.history.push("/");
    }
    render() {
        return (
            <div className="list">
                <div className="header">
                    <img src={require("../../Assets/tictactoe.png")} onClick={this.gohome}/>
                    tictactoe
                </div>
                <div className="scoreboard">
                <div className="table">
                    <div className="tabledata">
                        <div className="comp">Computer</div>
                        <div className="tr">{this.state.computer}</div>
                    </div>
                    <div className="tabledata">
                        <div className="you">You</div>
                        <div className="tr">{this.state.you}</div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Listingpage;