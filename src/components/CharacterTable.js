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
            <tr key={data.name} style={{color: 'rgb(255, 255, 0)', backgroundColor: 'rgba(52, 52, 52, 0.4)'}}>
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
        <div  className="d-flex justify-content-center">
        <table className=" w-50 table table-striped">
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
