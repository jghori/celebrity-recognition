import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Celebrity from './components/Celebrity/Celebrity';
import Rank from './components/Rank/Rank';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '9d5c5a0b0a824f98a2883f9e990d097b'
});

const particlesOptions = {
  particles: {
    number: {
      value: 150,
        density: {
          enable: true,
          value_area: 800
        }
      }
  }
}
                 
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      name: '',
      value: ''
    }
  }


  calculateFaceLocation = (data) => {
    const celebrity = data.outputs[0].data.regions[0].data.face.identity.concepts[0];
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const name= celebrity.name;
    const value= celebrity.value;
    console.log(name, value);
    return { 
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
      name: celebrity.name,
      value: celebrity.value
    }
  }


  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models
      .predict(
        Clarifai.CELEBRITY_MODEL, 
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">

        
        <Particles className='particles'
              params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <Celebrity name={this.state.name} value={this.state.value}/>
        <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
      </div>
  );
}
}


export default App;
