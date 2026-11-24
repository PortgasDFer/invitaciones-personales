import { useEffect, useRef, useState } from 'react';
import { Music2, Play, Pause } from 'lucide-react';

function BackgroundMusic() {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.volume = 0.35;

        audio.play()
            .then(() => setPlaying(true))
            .catch(() => setPlaying(false));

    }, []);

    const toggleMusic = async () => {
        const audio = audioRef.current;

        if (!audio) return;

        if (playing) {
            audio.pause();
            setPlaying(false);
        } else {
            try {
                await audio.play();
                setPlaying(true);
            } catch (error) {
                console.error('No se pudo reproducir el audio:', error);
            }
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                src={`${import.meta.env.BASE_URL}audio/sound.mp3`}
                loop
                preload="auto"
            />

            <button
                onClick={toggleMusic}
                aria-label={playing ? 'Pausar música' : 'Reproducir música'}
                className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#A38D61] bg-[#505143] text-[#E8E2DC] shadow-lg transition-transform hover:scale-110"
            >
                {playing ? (
                    <Pause size={19} />
                ) : (
                    <Play size={19} />
                )}
            </button>
        </>
    );
}

export default BackgroundMusic;