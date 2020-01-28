// import React from 'react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import isElectron from 'is-electron';

// const electron = require("electron");
// const electron = window.require("electron")
// const ipc = electron.ipcRenderer;
// const { ipc } = window.require('electron');

class App extends Component{

  constructor(props) {
    super(props);
    this.state={
          data:[{id:0,name:'lol'}]
    };
   
    this._loadFileListener = this._loadFileListener.bind(this)
  }

  componentDidMount(){
    if(isElectron())
    {

      console.log(window.ipcRenderer);
      let ipc =window.ipcRenderer;
    ipc.send("mainWindowLoaded")
    ipc.on('resultSent', this._loadFileListener)
    }
  }


  _loadFileListener=(data,x)=>{
    console.log(data,x)
     let prevData=[...this.state.data,...x];

     this.setState({data:prevData})


  }

  // ipc.on("resultSent", function(evt, result){
                
  // });

  sendTODB=()=>{
    if(isElectron())
    {
      let ipc =window.ipcRenderer;
    ipc.send("saveToDb",'data')

    }
  }

  getFROMDB=()=>{
    if(isElectron())
    {
      // let ipc =window.ipcRenderer;
      window.ipcRenderer.send("getFromDb",'27-01-20')

    }
  }


render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. {isElectron().toString()}
        </p>
        {
          this.state.data.map(x=>{
            return (
            <p>{x.id+"         "+x.name}</p>
            )
          })
        }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={this.sendTODB}>
        CLICK ME!!
      </button>
      <button onClick={this.getFROMDB}>
        CLICK ME AGAIN!!
      </button>
    </div>
  );
}
}

export default App;
