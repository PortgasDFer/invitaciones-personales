import { Heart, Sparkles, Shirt } from 'lucide-react';

function DressCode() {
    return (
        <section className="bg-[#DADAD2] px-6 py-24">

            <div className="mx-auto max-w-lg text-center">

                {/* Ornamento */}
                <div className="mb-8 flex items-center justify-center gap-4">
                    <span className="h-px w-12 bg-[#A38D61]" />
                    <Heart size={16} className="text-[#A96D51]" />
                    <span className="h-px w-12 bg-[#A38D61]" />
                </div>

                <span className="text-[10px] uppercase tracking-[0.4em] text-[#A38D61]">
                    Para celebrar juntos
                </span>

                <h2 className="mt-6 font-serif text-4xl leading-tight text-[#505143]">
                    Código de
                    <br />
                    <span className="italic">vestimenta</span>
                </h2>

                <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-[#68685D]">
                    Queremos compartir contigo este día tan especial.
                    Te invitamos a acompañarnos con vestimenta formal.
                </p>

                {/* Vestimenta */}
                <div className="mt-14 grid grid-cols-2 gap-4">

                    {/* Mujeres */}
                    <div className="border border-[#A38D61]/40 px-4 py-8">

                        <Sparkles
                            size={25}
                            strokeWidth={1}
                            className="mx-auto mb-5 text-[#A96D51]"
                        />

                        <h3 className="font-serif text-2xl text-[#505143]">
                            Mujeres
                        </h3>

                        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#A38D61]">
                            Vestido formal
                        </p>

                        <div className="mx-auto my-6 h-px w-10 bg-[#A38D61]" />

                        <p className="text-xs leading-6 text-[#68685D]">
                            Agradecemos evitar los colores:
                        </p>

                        <div className="mt-5 flex flex-col items-center gap-3">

                            <div className="flex items-center gap-2">
                                <span className="h-4 w-4 rounded-full border border-black/10 bg-[#A6A799]" />
                                <span className="text-xs text-[#505143]">
                                    Verde salvia
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-4 w-4 rounded-full border border-black/10 bg-white" />
                                <span className="text-xs text-[#505143]">
                                    Blanco
                                </span>
                            </div>

                        </div>

                    </div>

                    {/* Hombres */}
                    <div className="border border-[#A38D61]/40 px-4 py-8">

                        <Shirt
                            size={25}
                            strokeWidth={1}
                            className="mx-auto mb-5 text-[#A96D51]"
                        />

                        <h3 className="font-serif text-2xl text-[#505143]">
                            Hombres
                        </h3>

                        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#A38D61]">
                            Traje formal
                        </p>

                        <div className="mx-auto my-6 h-px w-10 bg-[#A38D61]" />

                        <p className="text-xs leading-6 text-[#68685D]">
                            Agradecemos evitar:
                        </p>

                        <div className="mt-5 flex flex-col items-center gap-3">

                            <div className="flex items-center gap-2">
                                <span className="h-4 w-4 rounded-full border border-black/10 bg-[#858585]" />
                                <span className="text-xs text-[#505143]">
                                    Trajes grises
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Nota final */}
                <div className="mt-12">
                    <Heart
                        size={18}
                        strokeWidth={1}
                        className="mx-auto text-[#A96D51]"
                    />

                    <p className="mt-4 font-serif text-lg italic text-[#505143]">
                        Gracias por formar parte de nuestra celebración.
                    </p>

                    <p className="mt-3 text-xs uppercase tracking-[0.25em] text-[#A38D61]">
                        Eli & Will
                    </p>
                </div>

            </div>

        </section>
    );
}

export default DressCode;