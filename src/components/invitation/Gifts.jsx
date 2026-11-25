import { useState } from 'react';
import { Gift, Copy, Check, Heart } from 'lucide-react';

function Gifts() {
    const [copied, setCopied] = useState(false);

    const accountNumber = '044180256051439046';
    const phoneNumber = '5584254498';

    const copyAccount = async () => {
        try {
            await navigator.clipboard.writeText(accountNumber);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2500);
        } catch (error) {
            console.error('No se pudo copiar la cuenta:', error);
        }
    };

    const copyPhone = async () => {
        try {
            await navigator.clipboard.writeText(phoneNumber);
        } catch (error) {
            console.error('No se pudo copiar el número:', error);
        }
    };

    return (
        <section className="bg-[#E8E2DC] px-6 py-20">
            <div className="mx-auto max-w-2xl">

                {/* Encabezado */}
                <div className="text-center">
                    <Gift
                        size={30}
                        strokeWidth={1}
                        className="mx-auto text-[#A38D61]"
                    />

                    <span className="mt-5 block text-[10px] uppercase tracking-[0.4em] text-[#A38D61]">
                        Con cariño
                    </span>

                    <h2 className="mt-4 font-serif text-4xl text-[#505143]">
                        Un detalle para nosotros
                    </h2>

                    <div className="mx-auto my-7 h-px w-16 bg-[#A38D61]" />

                    <p className="mx-auto max-w-lg font-serif text-lg italic leading-8 text-[#68685D]">
                        Lo más importante para nosotros es compartir
                        este día con ustedes. Si desean tener un detalle
                        adicional, les compartimos las siguientes opciones.
                    </p>
                </div>

                {/* Opciones de regalo */}
                <div className="mt-12 grid gap-6 md:grid-cols-2">

                    {/* Opción telefónica */}
                    <div className="border border-[#A38D61]/30 bg-white/50 p-7 text-center">

                        <Heart
                            size={24}
                            strokeWidth={1}
                            className="mx-auto text-[#A96D51]"
                        />

                        <h3 className="mt-5 font-serif text-2xl text-[#505143]">
                            Un detalle especial
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-[#68685D]">
                            Si desean tener un detalle adicional y no podrán
                            acompañarnos, pueden hacerlo a través del siguiente
                            número:
                        </p>

                        <p className="mt-6 font-serif text-xl tracking-wider text-[#505143]">
                            {phoneNumber}
                        </p>

                        <button
                            onClick={copyPhone}
                            className="mt-5 inline-flex items-center gap-2 border border-[#A38D61] px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-[#68685D] transition-colors hover:bg-[#505143] hover:text-white"
                        >
                            <Copy size={14} />
                            Copiar número
                        </button>
                    </div>

                    {/* Transferencia bancaria */}
                    <div className="border border-[#A38D61]/30 bg-white/50 p-7 text-center">

                        <Gift
                            size={24}
                            strokeWidth={1}
                            className="mx-auto text-[#A96D51]"
                        />

                        <h3 className="mt-5 font-serif text-2xl text-[#505143]">
                            Regalo económico
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-[#68685D]">
                            Si desean hacernos llegar un regalo económico,
                            pueden hacerlo mediante transferencia bancaria:
                        </p>

                        <div className="mt-6 space-y-2 text-sm text-[#68685D]">
                            <p>
                                <span className="font-semibold">Banco:</span>{' '}
                                Scotiabank
                            </p>

                            <p>
                                <span className="font-semibold">Titular:</span>
                                <br />
                                Elizabeth Magdaleno Vega
                            </p>
                        </div>

                        <div className="mt-5 border-y border-[#A38D61]/30 py-4">
                            <span className="block text-[9px] uppercase tracking-[0.25em] text-[#A38D61]">
                                Número de cuenta
                            </span>

                            <p className="mt-2 break-all font-serif text-lg tracking-wider text-[#505143]">
                                {accountNumber}
                            </p>
                        </div>

                        <button
                            onClick={copyAccount}
                            className="mt-5 inline-flex items-center gap-2 border border-[#A38D61] px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-[#68685D] transition-colors hover:bg-[#505143] hover:text-white"
                        >
                            {copied ? (
                                <>
                                    <Check size={14} />
                                    ¡Cuenta copiada!
                                </>
                            ) : (
                                <>
                                    <Copy size={14} />
                                    Copiar cuenta
                                </>
                            )}
                        </button>
                    </div>

                </div>

                {/* Agradecimiento */}
                <div className="mt-14 text-center">
                    <p className="mx-auto max-w-lg font-serif text-lg italic leading-8 text-[#68685D]">
                        ¡Gracias por ser parte de este momento tan especial
                        en nuestras vidas!
                    </p>

                    <div className="mt-7 font-serif text-2xl italic text-[#A96D51]">
                        Eli & Will
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Gifts;