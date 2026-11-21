import { useState } from 'react';
import './Envelope.css';

function Envelope() {
    const [isOpening, setIsOpening] = useState(false);

    const handleOpen = () => {
        if (isOpening) return;

        setIsOpening(true);

        setTimeout(() => {
            const section = document.getElementById('invitation');

            if (section) {
                window.scrollTo({
                    top: section.getBoundingClientRect().top + window.scrollY,
                    behavior: 'smooth'
                });
            }
        }, 1600);
    };

    return (
        <div className="envelope-container">

            <p className="envelope-caption">
                Una invitación especial para ti
            </p>

            <button
                className={`envelope-button ${isOpening ? 'opening' : ''}`}
                onClick={handleOpen}
                disabled={isOpening}
                aria-label="Abrir invitación de Eli y Will"
            >

                <div className="envelope">

                    {/* Tarjeta interior */}
                    <div className="envelope-letter">
                        <span>Eli & Will</span>
                        <small>20 · 12 · 2026</small>
                    </div>

                    {/* Cuerpo del sobre */}
                    <div className="envelope-back" />

                    {/* Solapa */}
                    <div className="envelope-flap" />

                    {/* Parte frontal */}
                    <div className="envelope-front" />

                    {/* Sello */}
                    <div className="envelope-seal">
                        <span>E</span>
                        <i>&</i>
                        <span>W</span>
                    </div>

                </div>

            </button>

            <span className="envelope-instruction">
                {isOpening ? 'Con mucho amor...' : 'Pulsa para abrir'}
            </span>

        </div>
    );
}

export default Envelope;