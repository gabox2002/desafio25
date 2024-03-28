import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faSnowflake } from "@fortawesome/free-solid-svg-icons";
import "../styles/App.scss";

const ClimaCiudad = ({ ciudades }) => {
    const apiKey = "67b867006b0829393e63ad437a1567e4";
    const [datosClima, setDatosClima] = useState([]);

    useEffect(() => {
        const obtenerTemperatura = async (ciudad) => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error("Error al obtener la temperatura");
                }
                const data = await response.json();
                return {
                    ciudad,
                    temperatura: data.main.temp,
                    mensaje: obtenerMensaje(data.main.temp),
                };
            } catch (error) {
                console.error("Error:", error);
                return null;
            }
        };

        const obtenerMensaje = (temp) => {
            if (temp > 30) {
                return "Hace mucho calor ";
            } else if (temp < 10) {
                return "Hace mucho frío ";
            } else {
                return "";
            }
        };
        const obtenerDatosClima = async () => {
            const promesasClima = ciudades.map((ciudad) =>
                obtenerTemperatura(ciudad)
            );
            const datos = await Promise.all(promesasClima);
            setDatosClima(datos);
        };

        obtenerDatosClima();
    }, [ciudades]);

    return (
        <div className="climaCiudad">
            {datosClima.length > 0 &&
                datosClima.map((dato, index) => (
                    <div key={index} className="ciudadCard">
                        {dato && (
                            <>
                                <p>
                                    Temperatura actual en <br /> 
                                    {dato.ciudad}:{" "} {dato.temperatura} °C
                                </p>
                                {dato.mensaje && (
                                    <div
                                        className={`mensaje ${dato.mensaje.includes("frío") ? "frio" : dato.mensaje.includes("calor") ? "calor" : ""}`}                                    >
                                        {dato.mensaje}
                                        {dato.mensaje.includes("frío") && (<FontAwesomeIcon icon={faSnowflake}/>)}
                                        {dato.mensaje.includes("calor") && (<FontAwesomeIcon icon={faSun} />)}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default ClimaCiudad;
