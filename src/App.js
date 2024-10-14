import React, { useEffect } from 'react';
import './App.css';
import Teclado from './Teclado';
import { Howler } from 'howler';

function App() {

    useEffect(() => {
        const resumeAudioContext = () => {
            if (Howler.ctx && Howler.ctx.state === 'suspended') {
                Howler.ctx.resume().then(() => {
                    console.log('AudioContext resumed');
                }).catch((err) => {
                    console.error('Error resuming AudioContext:', err);
                });
            }
        };

        document.addEventListener('click', resumeAudioContext);
        document.addEventListener('keydown', resumeAudioContext);

        // Limpieza de los listeners cuando el componente se desmonte
        return () => {
            document.removeEventListener('click', resumeAudioContext);
            document.removeEventListener('keydown', resumeAudioContext);
        };
    }, []);

    return (
        <div className="App">
            <h1>Online Keyboard</h1>
            <p>¡Bienvenido a tu teclado musical!</p>
            <p>¡Presiona las teclas en tu teclado real para tocar música!</p>
            <div className="bodyKey">
                <Teclado />
            </div>

            <div className="song">
                <p>Runaway:</p>
                <p>c-c-c-r ----- d-d-d-4 ----- s-s-s-3 ----- u-u-7-c</p>
                <a href='https://youtu.be/NsgdagCzH9I'> Aqui no hay novedad - Cadetes de Linares</a>
            </div>
        </div>
    );
}

export default App;
