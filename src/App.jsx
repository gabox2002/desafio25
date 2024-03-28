import React from "react";
import ClimaCiudad from "./components/ClimaCiudad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThermometerHalf, faCloud } from "@fortawesome/free-solid-svg-icons";
import "./styles/App.scss";

const App = () => {
    const ciudades = ["Buenos Aires", "New York", "Maracaibo"];
    return (
        <div className="App">
            <header className="App-header">
                <h1>
                   <>Aplicación del Clima</>  <FontAwesomeIcon icon={faCloud} />{" "}<FontAwesomeIcon icon={faThermometerHalf} />{" "}
                </h1>
            </header>
            <main>
                <ClimaCiudad ciudades={ciudades} />
            </main>
        </div>
    );
};

export default App;
