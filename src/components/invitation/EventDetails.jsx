import { useEffect, useState } from 'react';
import { CalendarDays, Clock, MapPin, Heart } from 'lucide-react';

const weddingDate = new Date(2026, 11, 20, 13, 0, 0);

function getTimeRemaining() {
    const difference = weddingDate.getTime() - Date.now();

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

function EventDetails() {
    const [time, setTime] = useState(getTimeRemaining());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTimeRemaining());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const countdownItems = [
        { value: time.days, label: 'Días' },
        { value: time.hours, label: 'Horas' },
        { value: time.minutes, label: 'Minutos' },
        { value: time.seconds, label: 'Segundos' },
    ];

    return (
        <section className="bg-[#E8E2DC] px-6 py-24">

            <div className="mx-auto max-w-lg text-center">

                {/* Encabezado */}
                <div className="mb-8 flex items-center justify-center gap-4">
                    <span className="h-px w-12 bg-[#A38D61]" />
                    <Heart size={16} className="text-[#A96D51]" />
                    <span className="h-px w-12 bg-[#A38D61]" />
                </div>

                <span className="text-[10px] uppercase tracking-[0.4em] text-[#A38D61]">
                    Un día para recordar
                </span>

                <h2 className="mt-6 font-serif text-4xl leading-tight text-[#505143]">
                    El día de
                    <br />
                    <span className="italic">nuestra boda</span>
                </h2>

                <p className="mt-5 font-serif text-lg italic text-[#A96D51]">
                    ¡La cuenta regresiva ha comenzado!
                </p>

                {/* Cuenta regresiva */}
                <div className="my-12 grid grid-cols-4 gap-3">

                    {countdownItems.map((item) => (
                        <div
                            key={item.label}
                            className="border-r border-[#A38D61]/40 last:border-none"
                        >
                            <span className="block font-serif text-3xl text-[#505143]">
                                {String(item.value).padStart(2, '0')}
                            </span>

                            <span className="mt-2 block text-[9px] uppercase tracking-widest text-[#A38D61]">
                                {item.label}
                            </span>
                        </div>
                    ))}

                </div>

                <div className="mx-auto mb-12 h-px w-16 bg-[#A38D61]" />

                {/* Fecha */}
                <div className="mb-10 flex flex-col items-center">

                    <CalendarDays
                        size={25}
                        strokeWidth={1}
                        className="mb-4 text-[#A96D51]"
                    />

                    <span className="text-[10px] uppercase tracking-[0.35em] text-[#A38D61]">
                        Fecha
                    </span>

                    <p className="mt-3 font-serif text-3xl text-[#505143]">
                        20 de diciembre
                    </p>

                    <p className="mt-1 font-serif text-xl italic text-[#A96D51]">
                        2026
                    </p>

                </div>

                {/* Hora */}
                <div className="mb-10 flex flex-col items-center">

                    <Clock
                        size={25}
                        strokeWidth={1}
                        className="mb-4 text-[#A96D51]"
                    />

                    <span className="text-[10px] uppercase tracking-[0.35em] text-[#A38D61]">
                        Hora
                    </span>

                    <p className="mt-3 font-serif text-3xl text-[#505143]">
                        1:00 p. m.
                    </p>

                </div>

                <div className="mx-auto my-12 h-px w-16 bg-[#A38D61]" />

                {/* Ubicación */}
                <div className="flex flex-col items-center">

                    <MapPin
                        size={27}
                        strokeWidth={1}
                        className="mb-4 text-[#A96D51]"
                    />

                    <span className="text-[10px] uppercase tracking-[0.35em] text-[#A38D61]">
                        Ceremonia religiosa
                    </span>

                    <h3 className="mt-4 font-serif text-2xl text-[#505143]">
                        Iglesia Adventista del Séptimo Día Mixcoac
                    </h3>

                    <p className="mt-4 max-w-xs text-sm leading-7 text-[#68685D]">
                        Franz Hals 97, Alfonso XIII,
                        Álvaro Obregón,
                        Ciudad de México.
                    </p>

                    <a
                        href="https://maps.app.goo.gl/Wk8uQqykA5o8GViGA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-3 border border-[#505143] px-8 py-4 text-[10px] uppercase tracking-[0.25em] text-[#505143] transition-colors duration-300 hover:bg-[#505143] hover:text-white"
                    >
                        <MapPin size={15} />
                        Cómo llegar
                    </a>

                </div>

            </div>

        </section>
    );
}

export default EventDetails;