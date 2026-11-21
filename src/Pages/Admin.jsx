import * as XLSX from 'xlsx';
import { Fragment, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

import {
    Users,
    UserCheck,
    UserX,
    LogOut,
    Search,
    RefreshCw,
    Heart,
    LockKeyhole,
    ChevronDown,
    ChevronUp,
    FileSpreadsheet
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon }) => (
    <div className="border border-[#A38D61]/30 bg-white p-5">
        <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#777568]">
                {title}
            </span>

            <Icon size={20} className="text-[#A96D51]" />
        </div>

        <p className="mt-5 font-serif text-4xl text-[#505143]">
            {value}
        </p>
    </div>
);

function Admin() {
    const [session, setSession] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [rsvps, setRsvps] = useState([]);
    const [search, setSearch] = useState('');
    const [filterGroup, setFilterGroup] = useState('todos');
    const [filterAttendance, setFilterAttendance] = useState('todos');
    const [expandedId, setExpandedId] = useState(null);

    // AUTENTICACIÓN
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setCheckingAuth(false);
        });

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);



    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setError('Correo o contraseña incorrectos.');
        } else {
            setSession(data.session);
        }

        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setRsvps([]);
        setSession(null);
    };

    

      const loadGuests = async (showLoading = true) => {
          if (showLoading) {
              setLoading(true);
              setError('');
          }


        const { data, error } = await supabase
            .from('rsvps')
            .select(`
                id,
                guest_name,
                phone,
                attending,
                guests_count,
                guest_group,
                message,
                created_at,
                rsvp_companions (
                    id,
                    companion_name
                )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error(error);
            setError('No fue posible cargar los invitados.');
        } else {
            setRsvps(data || []);
        }

        setLoading(false);
    };


        // CARGAR INVITADOS
    useEffect(() => {
        if (session) {
            loadGuests(false);
        }
    }, [session]);


    // FILTRAR INVITADOS
    const filteredGuests = rsvps.filter((guest) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            guest.guest_name.toLowerCase().includes(searchText) ||
            (guest.phone || '').includes(searchText) ||
            guest.rsvp_companions?.some(person =>
                person.companion_name.toLowerCase().includes(searchText)
            );

        const matchesGroup =
            filterGroup === 'todos' ||
            guest.guest_group === filterGroup;

        const matchesAttendance =
            filterAttendance === 'todos' ||
            (filterAttendance === 'confirmados' && guest.attending) ||
            (filterAttendance === 'no_asistiran' && !guest.attending);

        return matchesSearch && matchesGroup && matchesAttendance;
    });

    // ESTADÍSTICAS
    const totalConfirmed = rsvps
        .filter(g => g.attending)
        .reduce((total, g) => total + g.guests_count, 0);

    const totalDeclined = rsvps.filter(g => !g.attending).length;

    const eliGuests = rsvps.filter(g => g.guest_group === 'eli');
    const willGuests = rsvps.filter(g => g.guest_group === 'will');

    const eliConfirmed = eliGuests
        .filter(g => g.attending)
        .reduce((total, g) => total + g.guests_count, 0);

    const willConfirmed = willGuests
        .filter(g => g.attending)
        .reduce((total, g) => total + g.guests_count, 0);

    // EXPORTAR EXCEL
    const exportToExcel = () => {
        const guestsData = filteredGuests.map(guest => ({
            Responsable: guest.guest_name,
            Grupo: guest.guest_group === 'eli' ? 'Eli' : 'Will',
            Telefono: guest.phone || '',
            Asistencia: guest.attending ? 'Confirmado' : 'No asistirá',
            Total_Asistentes: guest.guests_count,
            Acompanantes: guest.rsvp_companions
                ?.map(person => person.companion_name)
                .join(', ') || '',
            Mensaje: guest.message || '',
            Fecha_Registro: new Date(guest.created_at).toLocaleDateString('es-MX')
        }));

        const worksheet = XLSX.utils.json_to_sheet(guestsData);

        worksheet['!cols'] = [
            { wch: 25 },
            { wch: 12 },
            { wch: 18 },
            { wch: 18 },
            { wch: 18 },
            { wch: 40 },
            { wch: 40 },
            { wch: 18 }
        ];

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            'Lista de invitados'
        );

        XLSX.writeFile(workbook, 'Invitados_Eli_Will.xlsx');
    };

    // CARGANDO
    if (checkingAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#DADAD2]">
                Cargando...
            </div>
        );
    }

    // LOGIN
    if (!session) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#505143] px-6">

                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-md border border-[#A38D61]/40 bg-[#DADAD2] p-8"
                >
                    <div className="mb-8 text-center">

                        <Heart
                            size={27}
                            className="mx-auto text-[#A96D51]"
                        />

                        <h1 className="mt-5 font-serif text-4xl text-[#505143]">
                            Eli & Will
                        </h1>

                        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[#A38D61]">
                            Panel administrativo
                        </p>

                    </div>

                    <div className="space-y-5">

                        <div>
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#505143]">
                                Correo electrónico
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full border border-[#A38D61]/40 bg-transparent px-4 py-4 text-sm outline-none focus:border-[#505143]"
                                placeholder="admin@correo.com"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs uppercase tracking-wider text-[#505143]">
                                Contraseña
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="w-full border border-[#A38D61]/40 bg-transparent px-4 py-4 text-sm outline-none focus:border-[#505143]"
                                placeholder="Tu contraseña"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-700">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-3 bg-[#505143] px-5 py-4 text-xs uppercase tracking-widest text-white transition hover:bg-[#A96D51] disabled:opacity-50"
                        >
                            <LockKeyhole size={16} />

                            {loading ? 'Ingresando...' : 'Iniciar sesión'}
                        </button>

                    </div>
                </form>

            </main>
        );
    }

    // DASHBOARD
    return (
        <main className="min-h-screen bg-[#F1EFEA]">

            {/* HEADER */}
            <header className="border-b border-[#A38D61]/30 bg-[#505143] px-6 py-6 text-white">

                <div className="mx-auto flex max-w-7xl items-center justify-between">

                    <div>
                        <h1 className="font-serif text-3xl">
                            Eli & Will
                        </h1>

                        <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#C5B58D]">
                            Administración de invitados
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/80 hover:text-white"
                    >
                        <LogOut size={17} />
                        Salir
                    </button>

                </div>

            </header>

            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* TÍTULO */}
                <div className="mb-8 flex items-center justify-between">

                    <div>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#A38D61]">
                            Resumen general
                        </span>

                        <h2 className="mt-2 font-serif text-3xl text-[#505143]">
                            Panel de invitados
                        </h2>
                    </div>

                    <button
                        onClick={() => loadGuests(true)}
                        disabled={loading}
                        className="flex items-center gap-2 border border-[#505143]/30 px-4 py-3 text-xs uppercase tracking-wider text-[#505143]"
                    >
                        <RefreshCw size={15} />
                        Actualizar
                    </button>

                </div>

                {/* ESTADÍSTICAS */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <StatCard
                        title="Invitaciones registradas"
                        value={rsvps.length}
                        icon={Users}
                    />

                    <StatCard
                        title="Personas confirmadas"
                        value={totalConfirmed}
                        icon={UserCheck}
                    />

                    <StatCard
                        title="No asistirán"
                        value={totalDeclined}
                        icon={UserX}
                    />

                    <StatCard
                        title="Invitados de Eli"
                        value={eliGuests.length}
                        icon={Heart}
                    />

                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <StatCard
                        title="Invitaciones de Will"
                        value={willGuests.length}
                        icon={Heart}
                    />

                    <StatCard
                        title="Personas confirmadas de Will"
                        value={willConfirmed}
                        icon={UserCheck}
                    />

                    <StatCard
                        title="Personas confirmadas de Eli"
                        value={eliConfirmed}
                        icon={UserCheck}
                    />

                </div>

                {/* LISTADO DE INVITADOS */}
                <section className="mt-12 border border-[#A38D61]/30 bg-white">

                    <div className="border-b border-[#A38D61]/30 p-6">

                        <h3 className="font-serif text-2xl text-[#505143]">
                            Lista de invitados
                        </h3>

                        <div className="mt-6 flex flex-col gap-3 lg:flex-row">

                            {/* BUSCADOR */}
                            <div className="relative flex-1">

                                <Search
                                    size={17}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A38D61]"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Buscar responsable, acompañante o teléfono..."
                                    className="w-full border border-[#A38D61]/30 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#505143]"
                                />

                            </div>

                            {/* FILTRO GRUPO */}
                            <select
                                value={filterGroup}
                                onChange={e => setFilterGroup(e.target.value)}
                                className="border border-[#A38D61]/30 bg-white px-4 py-3 text-sm text-[#505143]"
                            >
                                <option value="todos">Todos los grupos</option>
                                <option value="eli">Invitados de Eli</option>
                                <option value="will">Invitados de Will</option>
                            </select>

                            {/* FILTRO ASISTENCIA */}
                            <select
                                value={filterAttendance}
                                onChange={e => setFilterAttendance(e.target.value)}
                                className="border border-[#A38D61]/30 bg-white px-4 py-3 text-sm text-[#505143]"
                            >
                                <option value="todos">Todas las asistencias</option>
                                <option value="confirmados">Confirmados</option>
                                <option value="no_asistiran">No asistirán</option>
                            </select>

                            {/* EXPORTAR */}
                            <button
                                onClick={exportToExcel}
                                disabled={filteredGuests.length === 0}
                                className="flex items-center justify-center gap-2 bg-[#505143] px-5 py-3 text-xs uppercase tracking-wider text-white transition hover:bg-[#A96D51] disabled:opacity-40"
                            >
                                <FileSpreadsheet size={16} />
                                Exportar Excel
                            </button>

                        </div>

                    </div>

                    {error && (
                        <p className="p-5 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    {/* TABLA */}
                    <div className="overflow-x-auto">

                        <table className="w-full text-left text-sm">

                            <thead className="bg-[#F1EFEA] text-[10px] uppercase tracking-wider text-[#777568]">
                              <tr>
                                  <th className="px-4 py-4">Responsable</th>
                                  <th className="px-4 py-4">Grupo</th>

                                  <th className="hidden px-6 py-4 md:table-cell">
                                      Acompañantes
                                  </th>

                                  <th className="hidden px-6 py-4 md:table-cell">
                                      Total
                                  </th>

                                  <th className="hidden px-6 py-4 md:table-cell">
                                      Estado
                                  </th>

                                  <th className="px-4 py-4">Detalle</th>
                              </tr>
                            </thead>

                            <tbody>

                                {filteredGuests.map(guest => (

                                    // IMPORTANTE: ambas filas deben ir dentro de un fragmento.
                                    <Fragment key={guest.id}>

                                        {/* FILA PRINCIPAL */}
                                        <tr
                                            key={guest.id}
                                            className="border-t border-[#A38D61]/15"
                                        >

                                            <td className="px-6 py-5">
                                                <p className="font-medium text-[#505143]">
                                                    {guest.guest_name}
                                                </p>

                                                <p className="mt-1 text-xs text-[#777568]">
                                                    {guest.phone || 'Sin teléfono'}
                                                </p>
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="uppercase text-xs tracking-wider text-[#A96D51]">
                                                    {guest.guest_group}
                                                </span>
                                            </td>

                                            <td className="hidden px-6 py-5 md:table-cell">
                                                {guest.rsvp_companions?.length > 0 ? (
                                                    <div className="space-y-1">
                                                        {guest.rsvp_companions.map(person => (
                                                            <p
                                                                key={person.id}
                                                                className="text-xs text-[#505143]"
                                                            >
                                                                {person.companion_name}
                                                            </p>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-[#777568]">
                                                        Sin acompañantes
                                                    </span>
                                                )}
                                            </td>

                                            <td className="hidden px-6 py-5 font-medium text-[#505143] md:table-cell">
                                                {guest.guests_count}
                                            </td>

                                            <td className="hidden px-6 py-5 md:table-cell">
                                                <span className={`text-xs ${
                                                    guest.attending
                                                        ? 'text-green-700'
                                                        : 'text-red-600'
                                                }`}>
                                                    {guest.attending
                                                        ? 'Confirmado'
                                                        : 'No asistirá'}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5">
                                                <button
                                                    onClick={() =>
                                                        setExpandedId(
                                                            expandedId === guest.id
                                                                ? null
                                                                : guest.id
                                                        )
                                                    }
                                                    className="flex items-center gap-2 text-xs text-[#A96D51]"
                                                >
                                                    {expandedId === guest.id ? (
                                                        <>
                                                            Ocultar
                                                            <ChevronUp size={15} />
                                                        </>
                                                    ) : (
                                                        <>
                                                            Ver detalle
                                                            <ChevronDown size={15} />
                                                        </>
                                                    )}
                                                </button>
                                            </td>

                                        </tr>

                                        {/* FILA DE DETALLE */}
                                        {expandedId === guest.id && (

                                            <tr className="bg-[#F1EFEA]">
                                                <td colSpan={6} className="px-6 py-7">

                                                    <div className="grid gap-6 md:grid-cols-2">

                                                        <div>
                                                            <span className="text-[10px] uppercase tracking-widest text-[#A38D61]">
                                                                Información del responsable
                                                            </span>

                                                            <p className="mt-3 text-sm text-[#505143]">
                                                                <strong>Nombre:</strong> {guest.guest_name}
                                                            </p>

                                                            <p className="mt-2 text-sm text-[#505143]">
                                                                <strong>Teléfono:</strong> {guest.phone || 'No proporcionado'}
                                                            </p>

                                                            <p className="mt-2 text-sm text-[#505143]">
                                                                <strong>Grupo:</strong> {guest.guest_group === 'eli' ? 'Eli' : 'Will'}
                                                            </p>

                                                            <p className="mt-2 text-sm text-[#505143]">
                                                                <strong>Asistencia:</strong> {guest.attending ? 'Confirmada' : 'No asistirá'}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <span className="text-[10px] uppercase tracking-widest text-[#A38D61]">
                                                                Acompañantes
                                                            </span>

                                                            {guest.rsvp_companions?.length > 0 ? (
                                                                <ul className="mt-3 space-y-2">
                                                                    {guest.rsvp_companions.map(person => (
                                                                        <li
                                                                            key={person.id}
                                                                            className="text-sm text-[#505143]"
                                                                        >
                                                                            • {person.companion_name}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p className="mt-3 text-sm text-[#777568]">
                                                                    No registró acompañantes.
                                                                </p>
                                                            )}

                                                            <p className="mt-4 text-sm font-medium text-[#505143]">
                                                                Total de asistentes: {guest.guests_count}
                                                            </p>
                                                        </div>

                                                    </div>

                                                    {guest.message && (
                                                        <div className="mt-6 border-t border-[#A38D61]/30 pt-5">

                                                            <span className="text-[10px] uppercase tracking-widest text-[#A38D61]">
                                                                Mensaje para los novios
                                                            </span>

                                                            <p className="mt-2 font-serif text-lg italic text-[#505143]">
                                                                "{guest.message}"
                                                            </p>

                                                        </div>
                                                    )}

                                                </td>
                                            </tr>

                                        )}

                                    </Fragment>

                                ))}

                                {filteredGuests.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-12 text-center text-sm text-[#777568]"
                                        >
                                            No hay invitados para mostrar.
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                </section>

            </div>

        </main>
    );
}

export default Admin;