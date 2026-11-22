import { invitationImages } from '../../config/invitationImages';

function Gallery() {
    return (
        <section className="overflow-hidden bg-[#DADAD2] px-6 py-20">
            <div className="mx-auto max-w-5xl">

                <div className="text-center">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#A38D61]">
                        Eli & Will
                    </span>

                    <h2 className="mt-5 font-serif text-4xl text-[#505143]">
                        Nuestros momentos
                    </h2>

                    <p className="mx-auto mt-5 max-w-md font-serif text-lg italic leading-8 text-[#68685D]">
                        Pequeños instantes, grandes recuerdos
                        y una historia que apenas comienza.
                    </p>

                    <div className="mx-auto my-8 h-px w-16 bg-[#A38D61]" />
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                    {invitationImages.gallery.map((image, index) => (
                        <div
                            key={image}
                            className={
                                index % 2 === 1
                                    ? "overflow-hidden aspect-[3/4] md:mt-10"
                                    : "overflow-hidden aspect-[3/4]"
                            }
                        >
                            <img
                                src={image}
                                alt={`Eli y Will - Fotografía ${index + 1}`}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-14 text-center font-serif text-xl italic text-[#A96D51]">
                    Eli & Will
                </div>

            </div>
        </section>
    );
}

export default Gallery;