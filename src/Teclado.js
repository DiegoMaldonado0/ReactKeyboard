import React, { useEffect, useState, useCallback } from 'react';
import Tecla from './Tecla';
import { Howl } from 'howler';

const notas = [
    { nota: 'C', audio: '/sounds/piano-c4.wav', key: 'w', isSharp: false },
    { nota: 'C#', audio: '/sounds/piano-cs4.wav', key: '3', isSharp: true },
    { nota: 'D', audio: '/sounds/piano-d4.wav', key: 'e', isSharp: false },
    { nota: 'D#', audio: '/sounds/piano-ds4.wav', key: '4', isSharp: true },
    { nota: 'E', audio: '/sounds/piano-e4.wav', key: 'r', isSharp: false },
    { nota: 'F', audio: '/sounds/piano-f4.wav', key: 't', isSharp: false },
    { nota: 'F#', audio: '/sounds/piano-fs4.wav', key: '6', isSharp: true },
    { nota: 'G', audio: '/sounds/piano-g4.wav', key: 'y', isSharp: false },
    { nota: 'G#', audio: '/sounds/piano-gs4.wav', key: '7', isSharp: true },
    { nota: 'A', audio: '/sounds/piano-a4.wav', key: 'u', isSharp: false },
    { nota: 'A#', audio: '/sounds/piano-as4.wav', key: '8', isSharp: true },
    { nota: 'B', audio: '/sounds/piano-b4.wav', key: 'i', isSharp: false },
    { nota: 'C5', audio: '/sounds/piano-c5.wav', key: 'z', isSharp: false },
    { nota: 'C#5', audio: '/sounds/piano-cs5.wav', key: 's', isSharp: true },
    { nota: 'D5', audio: '/sounds/piano-d5.wav', key: 'x', isSharp: false },
    { nota: 'D#5', audio: '/sounds/piano-ds5.wav', key: 'd', isSharp: true },
    { nota: 'E5', audio: '/sounds/piano-e5.wav', key: 'c', isSharp: false },
    { nota: 'F5', audio: '/sounds/piano-f5.wav', key: 'v', isSharp: false },
    { nota: 'F#5', audio: '/sounds/piano-fs5.wav', key: 'g', isSharp: true },
    { nota: 'G5', audio: '/sounds/piano-g5.wav', key: 'b', isSharp: false },
    { nota: 'G#5', audio: '/sounds/piano-gs5.wav', key: 'h', isSharp: true },
    { nota: 'A5', audio: '/sounds/piano-a5.wav', key: 'n', isSharp: false },
    { nota: 'A#5', audio: '/sounds/piano-as5.wav', key: 'j', isSharp: true },
    { nota: 'B5', audio: '/sounds/piano-b5.wav', key: 'm', isSharp: false },
    { nota: 'C6', audio: '/sounds/piano-c6.wav', key: ',', isSharp: false },
];

const Teclado = () => {
    const [activeKeys, setActiveKeys] = useState([]);

    const playSound = useCallback((key) => {
        const nota = notas.find((n) => n.key === key);
        if (nota) {
            const sound = new Howl({
                src: [nota.audio],
                volume: 1.0,
            });
            sound.play();

            if (!activeKeys.includes(key)) {
                setActiveKeys((prevKeys) => [...prevKeys, key]);
            }

            setTimeout(() => {
                setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
                sound.stop();
            }, 1600);
        }
    }, [activeKeys]); // Memoriza la función y solo cambia si activeKeys cambia

    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key.toLowerCase();
            playSound(key);
        };

        const handleKeyUp = (event) => {
            const key = event.key.toLowerCase();
            setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [playSound]); // Aquí usamos playSound como dependencia sin problemas

    return (
        <div className="teclado">
            {notas.map((nota) => (
                <Tecla 
                    key={nota.nota}
                    nota={nota.nota}
                    audio={nota.audio}
                    isActive={activeKeys.includes(nota.key)}
                    isSharp={nota.isSharp}
                    keyLetter={nota.key}
                />
            ))}
        </div>
    );
};

export default Teclado;