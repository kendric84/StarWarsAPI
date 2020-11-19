import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CharacterTable from "./CharacterTable";

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
      homeworldsCache: [{ url: "", name: "" }],
      speciesCache: [{ url: "", name: "" }],
    };
    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://swapi.dev/api/people/")
      .then((response) => {
        let result = response.data.results || [];
        for (let i = 0; i < result.length; i++) {
          console.log(this.homeworldLU(result[i].homeworld));
        }
        this.setState({ characters: result });
        this.setState({ nextPage: response.data.next });
        this.setState({ previousPage: response.data.previous });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  homeworldLU(url) {
    let cachedWorlds = this.state.homeworldsCache;
    let entry = cachedWorlds.find((entry) => entry.url === url);
    let homeWorld = [];
    if (typeof entry === "undefined") {
      (axios
        .get(url)
        .then(response => {
          homeWorld = response.data || [];
          cachedWorlds.push({ url: url, name: homeWorld.name });
          this.setState({ homeworldsCache: cachedWorlds });
          homeWorld = homeWorld.name;
          console.log(homeWorld)
          return homeWorld
        })
        .catch((error) => {
          console.log(error);
        }));

    } else {
      homeWorld = entry.name;
    }
    return homeWorld;
  }

  speciesLU(url) {
    console.log(url);
  }

  navigate(e) {
    let url =
      e.target.id === "next-page"
        ? this.state.nextPage
        : this.state.previousPage;
    axios
      .get(url)
      .then((response) => {
        let result = response.data.results || [];
        this.setState({ characters: result });
        this.setState({ nextPage: response.data.next });
        this.state.nextPage === null
          ? this.setState({ disableNext: true })
          : this.setState({ disableNext: false });
        this.setState({ previousPage: response.data.previous });
        this.state.previousPage === null
          ? this.setState({ disablePrevious: true })
          : this.setState({ disablePrevious: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <CharacterTable
          characters={this.state.characters}
          getNext={this.state.getNext}
          getPrevious={this.state.getPrevious}
        />
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
    );
  }
}

export default App;
