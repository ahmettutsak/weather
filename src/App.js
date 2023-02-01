import "./App.css";
import axios from "axios";
import React from "react";

function App() {
  const [state, setState] = React.useState();
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      )
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => console.error(error));
  }, [address]);

  const den = () => {
    return state.map((dsa, index) => {
      return (
        <li className="border p-4 text-center" key={index}>
          {dsa.display_name}
        </li>
      );
    });
  };

  return (
    <div className="App">
      <div>
        <input
          type={"text"}
          placeholder="City"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={"p-4 border rounded"}
        />
      </div>
      <ul>{address && den()}</ul>
    </div>
  );
}

export default App;
