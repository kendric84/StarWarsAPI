import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CharacterTable from "./components/CharacterTable.js";
import LoadingSpinner from "./components/LoadingSpinner.js";
import NameSearch from "./components/NameSearch.js";
import shipBackground from "./assets/background.jpg"

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      nextPage: "",
      previousPage: "",
      disablePrevious: true,
      disableNext: false,
      characters: [],
      speciesCache: [{ url: "", name: "" }],
      homeworldsCache: [{ url: "", name: "" }],
      loading: false,
      searchText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.navigate = this.navigate.bind(this);
    this.searchByName = this.searchByName.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const peopleResponse = await axios.get("https://swapi.dev/api/people/");
    let result = peopleResponse.data.results || [];
    for (let i = 0; i < result.length; i++) {
      if (result[i].species.length === 0) {
        result[i].species = "https://swapi.dev/api/species/1/";
      }
      const species = await this.speciesLU(result[i].species);
      result[i].species = species;
      const homeworld = await this.homeworldLU(result[i].homeworld);
      result[i].homeworld = homeworld;
    }
    this.setState({ characters: result });
    this.setState({ nextPage: peopleResponse.data.next });
    this.setState({ previousPage: peopleResponse.data.previous });
    this.setState({ loading: false });
  }

  handleChange(e) {
    alert("search alert", e.target.searchText.value)
    //this.setState({
      //[e.target.id]: e.target.value,
    //});
  }

searchByName(e) {
  alert("search alert", e.target.id)
}

  /* async searchByName(e) {
    e.preventDefault();
    this.setState({searchText: "test"})
    alert("search alert", e.target.value)
    this.setState({ loading: true });
    const peopleResponse = await axios.get("https://swapi.dev/api/people/?search=C-3PO");
    let result = peopleResponse.data.results || [];
    for (let i = 0; i < result.length; i++) {
      if (result[i].species.length === 0) {
        result[i].species = "https://swapi.dev/api/species/1/";
      }
      const species = await this.speciesLU(result[i].species);
      result[i].species = species;
      const homeworld = await this.homeworldLU(result[i].homeworld);
      result[i].homeworld = homeworld;
    }
    this.setState({ characters: result });
    this.setState({ disableNext: true})
    this.setState({ disablePrevious: true})
    this.setState({ loading: false });
  } */

  speciesLU(url) {
    let cachedSpecies = this.state.homeworldsCache;
    let entry = cachedSpecies.find((entry) => entry.url === url);
    let species = [];
    if (typeof entry === "undefined") {
      return axios
        .get(url)
        .then((response) => {
          species = response.data || [];
          cachedSpecies.push({ url: url, name: species.name });
          this.setState({ speciesCache: cachedSpecies });
          species = species.name;
          return species;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      species = entry.name;
    }
    return species;
  }

  homeworldLU(url) {
    let cachedWorlds = this.state.homeworldsCache;
    let entry = cachedWorlds.find((entry) => entry.url === url);
    let homeWorld = [];
    if (typeof entry === "undefined") {
      return axios
        .get(url)
        .then((response) => {
          homeWorld = response.data || [];
          cachedWorlds.push({ url: url, name: homeWorld.name });
          this.setState({ homeworldsCache: cachedWorlds });
          homeWorld = homeWorld.name;
          return homeWorld;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      homeWorld = entry.name;
    }
    return homeWorld;
  }

  async navigate(e) {
    this.setState({ loading: true });
    this.setState({ characters: [] });
    let url =
      e.target.id === "next-page"
        ? this.state.nextPage
        : this.state.previousPage;
    const peopleResponse = await axios.get(url);
    let result = peopleResponse.data.results || [];
    for (let i = 0; i < result.length; i++) {
      if (result[i].species.length === 0) {
        result[i].species = "https://swapi.dev/api/species/1/";
      }
      const species = await this.speciesLU(result[i].species);
      result[i].species = species;
      const homeworld = await this.homeworldLU(result[i].homeworld);
      result[i].homeworld = homeworld;
    }
    this.setState({ characters: result });
    this.setState({ nextPage: peopleResponse.data.next });
    this.state.nextPage === null
      ? this.setState({ disableNext: true })
      : this.setState({ disableNext: false });
    this.setState({ previousPage: peopleResponse.data.previous });
    this.state.previousPage === null
      ? this.setState({ disablePrevious: true })
      : this.setState({ disablePrevious: false });
    this.setState({ loading: false });
  }

  render() {
    return (
      <div style={{backgroundSize: 'cover', width: '100vw', height: '100vh', backgroundImage: 'url('+shipBackground+')'}}>
        <NameSearch handleChange={this.handleChange} searchByName={this.searchByName}/>
        <CharacterTable
          characters={this.state.characters}
        />
        <div className="d-flex justify-content-center">
          <h1 style={{color: 'rgb(255, 255, 0)'}}>{this.state.loading ? <LoadingSpinner /> : ""}</h1>
        </div>
        <div className="d-flex justify-content-center">
          <button
            onClick={this.navigate}
            id="previous-page"
            disabled={this.state.disablePrevious}
          >
            Previous Page
          </button>
          <button
            onClick={this.navigate}
            id="next-page"
            disabled={this.state.disableNext}
          >
            Next Page
          </button>
        </div>
      </div>
    );
  }
}

export default App;
