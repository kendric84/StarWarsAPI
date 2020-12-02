import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class NameSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-center">
          <label style={{color: 'rgb(255, 255, 0)'}}>Search for a character</label>
        </div>
        <div className="d-flex justify-content-center">
          <br />
          <form className="form"
          id="userInput"
          onSubmit={this.props.searchByName} >
          <input 
          required 
          name="searchText" 
          id="searchText" 
          placeholder="Character name..." 
          onChange={this.props.handleChange}></input>
          <button id="submitButton" type="submit">Search</button>
          </form>
        </div>
        <br/>
      </div>
    );
  }
}

export default NameSearch;
