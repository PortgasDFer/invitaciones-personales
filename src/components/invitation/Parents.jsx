import { Heart } from 'lucide-react';

function Parents() {
    return (
        <section className="bg-[#DADAD2] px-7 py-20">
            <div className="mx-auto max-w-lg text-center">

                <div className="mb-8 flex items-center justify-center gap-4">
                    <span className="h-px w-12 bg-[#A38D61]" />
                    <Heart size={16} strokeWidth={1} className="text-[#A96D51]" />
                    <span className="h-px w-12 bg-[#A38D61]" />
                </div>

                <span className="text-[10px] uppercase tracking-[0.4em] text-[#A38D61]">
                    Nuestra familia
                </span>

                <h2 className="mt-6 font-serif text-3xl leading-tight text-[#505143]">
                    Con la bendición de
                    <br />
                    <span className="italic">nuestros padres</span>
                </h2>

                <div className="mx-auto my-8 h-px w-16 bg-[#A38D61]" />

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6">

                    <div>
                        <h3 className="mb-5 text-[10px] uppercase tracking-[0.3em] text-[#A96D51]">
                            Padres de la novia
                        </h3>

                        <p className="font-serif text-xl leading-relaxed text-[#505143]">
                            Martha Vega
                        </p>

                        <p className="mt-2 font-serif text-xl leading-relaxed text-[#505143]">
                            Taurino Magdaleno
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-5 text-[10px] uppercase tracking-[0.3em] text-[#A96D51]">
                            Padres del novio
                        </h3>

                        <p className="font-serif text-xl leading-relaxed text-[#505143]">
                            Corina Nolasco
                        </p>

                        <p className="mt-2 font-serif text-xl leading-relaxed text-[#505143]">
                            Oscar Pérez
                        </p>
                    </div>

                </div>

                <div className="mt-12 flex items-center justify-center gap-3">
                    <span className="h-px w-10 bg-[#A38D61]" />
                    <Heart size={13} className="text-[#A96D51]" />
                    <span className="h-px w-10 bg-[#A38D61]" />
                </div>

            </div>
        </section>
    );
}

export default Parents;