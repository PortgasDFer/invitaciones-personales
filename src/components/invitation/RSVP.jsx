import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Heart,
    Send,
    CheckCircle2,
    Plus,
    Trash2,
    Users
} from 'lucide-react';

import { supabase } from '../../services/supabase';

function RSVP() {
    const location = useLocation();

    // Identificar automáticamente el grupo desde el enlace
    const params = new URLSearchParams(location.search);
    const guestGroup = params.get('grupo');

    const validGroup = ['eli', 'will'].includes(guestGroup);

    const [form, setForm] = useState({
        guest_name: '',
        phone: '',
        attending: 'yes',
        message: '',
    });

    const [companions, setCompanions] = useState([]);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const totalGuests = form.attending === 'yes'
        ? companions.length + 1
        : 0;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Agregar acompañante
    const addCompanion = () => {
        setCompanions(prev => [...prev, '']);
    };

    // Modificar nombre de acompañante
    const updateCompanion = (index, value) => {
        setCompanions(prev =>
            prev.map((name, i) => i === index ? value : name)
        );
    };

    // Eliminar acompañante
    const removeCompanion = (index) => {
        setCompanions(prev =>
            prev.filter((_, i) => i !== index)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        if (!validGroup) {
            setError('El enlace de invitación no es válido.');
            return;
        }

        if (!form.guest_name.trim()) {
            setError('Escribe el nombre del responsable.');
            return;
        }

        const names = companions.map(name => name.trim());

        if (names.some(name => !name)) {
            setError('Completa los nombres de todos tus acompañantes.');
            return;
        }

        setLoading(true);

        try {
            const { error: rpcError } = await supabase.rpc(
                'submit_rsvp',
                {
                    p_event_slug: 'eli-will',
                    p_guest_name: form.guest_name.trim(),
                    p_phone: form.phone.trim() || null,
                    p_attending: form.attending === 'yes',
                    p_guests_count: totalGuests,
                    p_guest_group: guestGroup,
                    p_companion_names: form.attending === 'yes' ? names : [],
                    p_message: form.message.trim() || null,
                }
            );

            if (rpcError) throw rpcError;

            setSuccess(true);

        } catch (err) {
            console.error('Error al registrar RSVP:', err);

            setError(
                err.message || 'No pudimos registrar tu respuesta. Inténtalo nuevamente.'
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-[#505143] px-6 py-24">

            <div className="mx-auto max-w-lg text-center">

                {/* Encabezado */}
                <div className="mb-8 flex items-center justify-center gap-4">
                    <span className="h-px w-12 bg-[#C5B58D]" />
                    <Heart size={17} className="text-[#C5B58D]" />
                    <span className="h-px w-12 bg-[#C5B58D]" />
                </div>

                <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5B58D]">
                    Nos encantará contar contigo
                </span>

                <h2 className="mt-6 font-serif text-4xl text-[#F0EBE3]">
                    ¿Nos acompañas?
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#DADAD2]">
                    Tu presencia hará aún más especial este día.
                    Confírmanos tu asistencia.
                </p>

                {!validGroup ? (

                    <div className="mt-10 border border-red-300/40 p-6 text-sm text-red-200">
                        No pudimos identificar tu invitación.
                        Solicita a Eli o Will el enlace correspondiente.
                    </div>

                ) : success ? (

                    <div className="mt-12 border border-[#C5B58D]/40 px-6 py-12">

                        <CheckCircle2
                            size={42}
                            strokeWidth={1}
                            className="mx-auto text-[#C5B58D]"
                        />

                        <h3 className="mt-6 font-serif text-3xl text-[#F0EBE3]">
                            ¡Muchas gracias!
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-[#DADAD2]">
                            Hemos recibido tu respuesta.
                            ¡Esperamos compartir contigo este día tan especial!
                        </p>

                        <p className="mt-6 font-serif text-xl italic text-[#C5B58D]">
                            Eli & Will
                        </p>

                    </div>

                ) : (

                    <form
                        onSubmit={handleSubmit}
                        className="mt-12 space-y-7 text-left"
                    >

                        {/* Grupo identificado */}
                        <div className="border border-[#C5B58D]/40 p-4 text-center">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5B58D]">
                                Invitación de
                            </span>

                            <p className="mt-2 font-serif text-2xl text-[#F0EBE3]">
                                {guestGroup === 'eli' ? 'Eli' : 'Will'}
                            </p>
                        </div>

                        {/* Responsable */}
                        <div>
                            <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#C5B58D]">
                                Nombre del responsable *
                            </label>

                            <input
                                type="text"
                                name="guest_name"
                                value={form.guest_name}
                                onChange={handleChange}
                                maxLength={150}
                                required
                                placeholder="Tu nombre completo"
                                className="w-full border border-[#DADAD2]/30 bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-[#DADAD2]/50 focus:border-[#C5B58D]"
                            />
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#C5B58D]">
                                Teléfono de contacto
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                maxLength={20}
                                placeholder="Tu número de teléfono"
                                className="w-full border border-[#DADAD2]/30 bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-[#DADAD2]/50 focus:border-[#C5B58D]"
                            />
                        </div>

                        {/* Asistencia */}
                        <div>
                            <label className="mb-3 block text-[10px] uppercase tracking-[0.25em] text-[#C5B58D]">
                                ¿Podrás acompañarnos? *
                            </label>

                            <div className="grid grid-cols-2 gap-3">

                                <button
                                    type="button"
                                    onClick={() => setForm(prev => ({
                                        ...prev,
                                        attending: 'yes',
                                    }))}
                                    className={`border px-3 py-4 text-xs uppercase tracking-wider transition ${
                                        form.attending === 'yes'
                                            ? 'border-[#C5B58D] bg-[#C5B58D] text-[#505143]'
                                            : 'border-[#DADAD2]/30 text-white'
                                    }`}
                                >
                                    ¡Sí, asistiré!
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setForm(prev => ({
                                            ...prev,
                                            attending: 'no',
                                        }));

                                        setCompanions([]);
                                    }}
                                    className={`border px-3 py-4 text-xs uppercase tracking-wider transition ${
                                        form.attending === 'no'
                                            ? 'border-[#C5B58D] bg-[#C5B58D] text-[#505143]'
                                            : 'border-[#DADAD2]/30 text-white'
                                    }`}
                                >
                                    No podré asistir
                                </button>

                            </div>
                        </div>

                        {/* Acompañantes */}
                        {form.attending === 'yes' && (

                            <div className="border border-[#C5B58D]/30 p-5">

                                <div className="flex items-center gap-3">
                                    <Users
                                        size={20}
                                        className="text-[#C5B58D]"
                                    />

                                    <div>
                                        <h3 className="font-serif text-xl text-[#F0EBE3]">
                                            Tus acompañantes
                                        </h3>

                                        <p className="mt-1 text-xs text-[#DADAD2]/70">
                                            Registra los nombres de quienes asistirán contigo.
                                        </p>
                                    </div>
                                </div>

                                {companions.map((name, index) => (

                                    <div
                                        key={index}
                                        className="mt-5 flex items-center gap-2"
                                    >
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                updateCompanion(index, e.target.value)
                                            }
                                            maxLength={150}
                                            placeholder={`Nombre del acompañante ${index + 1}`}
                                            className="min-w-0 flex-1 border border-[#DADAD2]/30 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-[#DADAD2]/50 focus:border-[#C5B58D]"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeCompanion(index)}
                                            aria-label="Eliminar acompañante"
                                            className="p-3 text-[#C5B58D] hover:text-white"
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    </div>

                                ))}

                                <button
                                    type="button"
                                    onClick={addCompanion}
                                    className="mt-5 flex w-full items-center justify-center gap-2 border border-dashed border-[#C5B58D]/60 px-4 py-4 text-xs uppercase tracking-wider text-[#C5B58D] transition hover:bg-[#C5B58D]/10"
                                >
                                    <Plus size={16} />
                                    Agregar acompañante
                                </button>

                                <div className="mt-6 border-t border-[#C5B58D]/30 pt-5 text-center">

                                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5B58D]">
                                        Total de asistentes
                                    </span>

                                    <p className="mt-2 font-serif text-3xl text-[#F0EBE3]">
                                        {totalGuests}
                                    </p>

                                    <p className="text-xs text-[#DADAD2]/70">
                                        Incluyéndote
                                    </p>

                                </div>

                            </div>

                        )}

                        {/* Mensaje */}
                        <div>
                            <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#C5B58D]">
                                Mensaje para los novios
                            </label>

                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                maxLength={500}
                                rows={4}
                                placeholder="Déjanos unas palabras..."
                                className="w-full resize-none border border-[#DADAD2]/30 bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-[#DADAD2]/50 focus:border-[#C5B58D]"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="border border-red-300/40 bg-red-400/10 p-4 text-sm text-red-200">
                                {error}
                            </p>
                        )}

                        {/* Enviar */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-3 bg-[#C5B58D] px-6 py-5 text-xs uppercase tracking-[0.25em] text-[#505143] transition hover:bg-[#DADAD2] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Send size={15} />

                            {loading
                                ? 'Enviando respuesta...'
                                : 'Confirmar asistencia'}
                        </button>

                    </form>

                )}

            </div>

        </section>
    );
}

export default RSVP;