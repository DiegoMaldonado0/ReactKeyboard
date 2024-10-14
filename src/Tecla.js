import React from 'react';
import { Howl, Howler } from 'howler';

const Tecla = ({ nota, sonido, isActive, isSharp, keyLetter }) => {

    const reproducirSonido = () => {
        // Verificar si el AudioContext de Howler está suspendido
        if (Howler.ctx && Howler.ctx.state === 'suspended') {
            Howler.ctx.resume().then(() => {
                console.log('AudioContext resumed');
                reproducirNota(); 
            }).catch((err) => {
                console.error('Error resuming AudioContext:', err);
            });
        } else {
            reproducirNota(); // Si no está suspendido, reproducir
        }
    };

    const reproducirNota = () => {
        const sonidoNota = new Howl({
            src: [sonido]
        });
        sonidoNota.play();

        setTimeout(() => {
            sonidoNota.stop();
        }, 1600);
    };

    return (
        <div
            className={`tecla ${isActive ? 'active' : ''} ${isSharp ? 'sharp' : ''}`}
            onMouseDown={reproducirSonido}  // Soporta el clic del mouse
        >
            <div className="tecla-key">{keyLetter}</div> {/* Muestra la letra de la tecla correspondiente */}
        </div>
    );
};

export default Tecla;
