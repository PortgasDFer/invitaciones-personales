import { invitationImages } from '../../config/invitationImages';
import Envelope from './Envelope';

function Hero() {
    return (
        <section
            className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage: `url(${invitationImages.hero})`
            }}
        >

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/35" />

            {/* Contenido */}
            <div className="relative z-10 flex flex-col items-center px-6 text-center text-white">

                <span className="mb-8 text-xs uppercase tracking-[0.45em]">
                    Nuestra Boda
                </span>

                <h1
                    className="font-serif text-7xl md:text-9xl"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    Eli <span className="italic">&</span> Will
                </h1>

                <div className="my-7 h-px w-20 bg-white/70" />

                <p className="text-sm uppercase tracking-[0.35em]">
                    ¡Nos casamos!
                </p>

                <p className="mt-5 text-sm tracking-[0.3em]">
                    20 · 12 · 2026
                </p>

                <Envelope />

            </div>

        </section>
    );
}

export default Hero;