import { Heart } from 'lucide-react';
import { invitationImages } from '../../config/invitationImages';

function InvitationMessage() {
    return (
        <section
            id="invitation"
            className="overflow-hidden bg-white px-7 py-20"
        >
            <div className="mx-auto max-w-lg text-center">

                {/* Ornamento */}
                <div className="mb-10 flex items-center justify-center gap-4">
                    <span className="h-px w-12 bg-[#A38D61]" />
                    <Heart
                        size={17}
                        strokeWidth={1}
                        className="text-[#A96D51]"
                    />
                    <span className="h-px w-12 bg-[#A38D61]" />
                </div>

                {/* Encabezado */}
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#A38D61]">
                    Nuestra historia
                </span>

                <h2 className="mt-6 font-serif text-4xl leading-tight text-[#505143]">
                    Dos corazones,
                    <br />
                    <span className="italic">una misma fe.</span>
                </h2>

                <div className="mx-auto my-8 h-px w-16 bg-[#A38D61]" />

                {/* Mensaje */}
                <p className="font-serif text-xl leading-9 text-[#505143]">
                    Dos corazones, una misma fe y un amor que,
                    de la mano de Dios, ha decidido caminar
                    juntos para toda la vida.
                </p>

                <p className="mt-7 text-sm leading-8 text-[#68685D]">
                    Hemos decidido unir nuestras vidas en matrimonio,
                    por lo que nos complace sean partícipes de esta unión.
                </p>

                <p className="mt-8 font-serif text-2xl italic text-[#A96D51]">
                    ¡Celebra con nosotros este día tan maravilloso!
                </p>
                

                {/* Fotografía de los novios */}
                <div className="mx-auto mt-16 max-w-md">
                    <img
                        src={invitationImages.bride}
                        alt="Eli y Will"
                        loading="lazy"
                        className="h-auto w-full object-cover"
                    />
                </div>
            </div>

            {/* Versículo bíblico */}
            <div className="relative mx-auto mt-20 max-w-lg overflow-hidden bg-[#505143] px-8 py-16 text-center">

                <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5B58D]">
                    Una promesa ante Dios
                </span>

                <div className="my-7 font-serif text-6xl leading-none text-[#A38D61]">
                    “
                </div>

                <p className="font-serif text-2xl italic leading-relaxed text-[#F0EBE3]">
                    Y si alguno prevaleciere contra uno,
                    dos le resistirán; y cordón de tres
                    dobleces no se rompe pronto.
                </p>

                <div className="mx-auto my-9 h-px w-14 bg-[#A38D61]" />

                <span className="text-xs uppercase tracking-[0.3em] text-[#C5B58D]">
                    Eclesiastés 4:12
                </span>

                <div className="mt-10 font-serif text-xl italic text-[#F0EBE3]">
                    Eli & Will
                </div>

            </div>

            {/* Cierre */}
            <div className="mt-14 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-[#A38D61]" />
                <Heart size={13} className="text-[#A96D51]" />
                <span className="h-px w-10 bg-[#A38D61]" />
            </div>

        </section>
    );
}

export default InvitationMessage;