import React from "react";
import "./App.scss";
import { bankOne, bankTwo } from "./Data/Clips";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFreeCodeCamp} from '@fortawesome/free-brands-svg-icons'

let store=[{bank:bankOne,bankName:'Heater Kit' },{bank:bankTwo,bankName:'Smooth Piano Kit' }]
class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      power:true,
      bank: store[0].bank,
      clipsIndex: null,
      display:  ' ',
      bankSwitch: false ,
      volume:0.4
    };
    this.handlePress = this.handlePress.bind(this);
    this.toglePower = this.toglePower.bind(this);
    this.togleBank = this.togleBank.bind(this);
    this.togleVolume =  this.togleVolume.bind(this);
  }

  handlePress(event) {
    if(this.state.power){
    let eventValue =
      event.type === "click"
        ? event.target.innerText
        : event.type === "keydown"
        ? event.key
        : null;

    let clipIndex = this.state.bank.findIndex(
      (clips) => clips.keyTrigger === eventValue.toUpperCase()
    );

    if (clipIndex > -1) {
      this.setState(
        {
          clipsIndex: clipIndex,
          display: this.state.bank[clipIndex].id,
        });
       
        this.audio = document.getElementById(eventValue.toUpperCase()) 
        this.audio.volume = this.state.volume;
        this.audio.play();

      document
        .getElementById("button-" + eventValue.toUpperCase())
        .classList.add("drum-buttons-active");

      setTimeout(() => {
        document
          .getElementById("button-" + eventValue.toUpperCase())
          .classList.remove("drum-buttons-active");
      }, 200);
    }
   }
  }

  toglePower(event){
    this.setState({
      power:!this.state.power,
    },()=>{
      if(this.state.power === true)
      document.getElementById("power")
      .classList.add("inner-animate-on");
      else{
        
     document
    .getElementById("power")
    .classList.remove("inner-animate-on");
      }

    })
}
togleBank(event){
  store= store.reverse()
  if(this.state.power){
    this.setState({
      bank: store[0].bank,
      display: store[0].bankName,
      bankSwitch: !this.state.bankSwitch
    },()=>{

      if(this.state.bankSwitch === false)
      document.getElementById("bank")
      .classList.remove("inner-animate-on");
      else{     
     document
    .getElementById("bank")
    .classList.add("inner-animate-on");
      }} )
  
  }
}
togleVolume(event){
  this.setState({
    volume:event.target.value,
  })

}

  componentDidMount() {
    document.addEventListener("keydown", this.handlePress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handlePress);
  }
  render() {
    return (
      <div className="App">
        <div id="drum-machine">
          <div className="container-cover">
            <div className="item1">
              <div className="button-container">
                {this.state.bank.map((bt, index) => (
                  <button
                    id={"button-" + bt.keyTrigger}
                    onClick={this.handlePress} 
                    className="drum-pad drum-buttons"
                    key={index}
                  >
                    {bt.keyTrigger}
                    <audio preload="auto" src={bt.url} className='clip' id={bt.keyTrigger} type='audio/mpeg'></audio>
                  </button>
                ))}
              </div>
            </div>
            <div className="item2">
            <FontAwesomeIcon id='fcc-logo' icon={faFreeCodeCamp} />
              <div className="config-container">
                <div className="control">
                  <p>Power</p>
                  <div  onClick={this.toglePower} className="select">
                    <div id="power" className="inner inner-animate-on" />
                  </div>
                </div>
                <p id="display">{this.state.display}</p>
                <div className="volume-slider">
                  <input value={this.state.volume} onChange={this.togleVolume} type="range" min="0" max="1" step="0.01" />
                </div>
                <p>Bank</p>
                <div onClick={this.togleBank}   className="select">
                  <div id="bank"  className="inner" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
