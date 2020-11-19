import React, { Component } from "react";

class CharacterTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tableRows = {};
    if (this.props.characters === []) {
      return <tr></tr>;
    } else {
      tableRows = this.props.characters.map((data) => {
        return (
            <tr>
                <td>{data.name}</td>
                <td>{data.birth_year}</td>
                <td>{data.height}</td>
                <td>{data.mass}</td>
                <td>{data.homeworld}</td>
                <td>{data.species}</td>
          </tr>
        );
      });
    }

    return (
        <div>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Birth Date</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Homeworld</th>
              <th>Species</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    )
  }
}

export default CharacterTable;
