"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconEdit,
  IconPerson,
  IconGroup,
  IconDoor,
  IconClock,
} from "@/components/icons";

const MOCK = {
  codigo: "SCH-2023-ED-IS-G201",
  estado: "OCUPADO",
  materia: "Estructuras de Datos",
  carrera: "Ing. en Sistemas",
  docente: "Dr. Ricardo Salinas",
  grupo: "IS-G201",
  dia: "LUNES",
  horaInicio: "07:00",
  horaFin: "09:00",
  aula: "AULA A-102",
  edificio: "Edificio Norte, Planta Baja",
  capacidad: 35,
  capacidadTotal: 40,
  disponibilidad: [
    { dia: "MAR", estado: "LIBRE" },
    { dia: "MIÉ", estado: "CLASE" },
    { dia: "JUE", estado: "LIBRE" },
  ] as { dia: string; estado: "LIBRE" | "CLASE" }[],
};

export default function HorarioDetailPage() {
  return (
    <div className="p-6 space-y-5">
      {/* back + actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/horarios"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <IconArrowLeft size={14} />
          <span>Regresar</span>
        </Link>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-700 transition-colors">
          <IconEdit size={14} />
          Editar
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-900">Detalle de Horario</h1>

      {/* content grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* ── LEFT (2/3) ── */}
        <div className="col-span-2 space-y-4">
          {/* main info card */}
          <div className="bg-white border border-gray-200 p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400">
                  Código de Registro
                </p>
                <p className="text-lg font-mono font-semibold text-gray-900 mt-0.5">
                  {MOCK.codigo}
                </p>
              </div>
              <span className="px-2.5 py-1 border border-gray-400 text-[10px] uppercase tracking-widest text-gray-500 font-medium">
                {MOCK.estado}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400">Materia</p>
                <p className="text-base font-bold text-gray-900 mt-0.5">{MOCK.materia}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400">Carrera</p>
                <p className="text-base font-bold text-gray-900 mt-0.5">{MOCK.carrera}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2">
                  Docente
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <IconPerson size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{MOCK.docente}</span>
                </div>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2">
                  Grupo
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <IconGroup size={14} className="text-gray-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{MOCK.grupo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* franja + ubicación */}
          <div className="grid grid-cols-2 gap-4">
            {/* franja horaria */}
            <div className="bg-cyan-400 p-5 space-y-3">
              <p className="text-[9px] uppercase tracking-widest text-cyan-900 font-semibold">
                Franja Horaria
              </p>
              <p className="text-2xl font-bold text-gray-900">{MOCK.dia}</p>
              <div className="flex items-center gap-2 text-gray-900">
                <IconClock size={16} />
                <span className="text-base font-semibold">
                  {MOCK.horaInicio} — {MOCK.horaFin}
                </span>
              </div>
            </div>

            {/* ubicación */}
            <div className="bg-white border border-gray-200 p-5 space-y-3">
              <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">
                Ubicación
              </p>
              <div className="flex items-start gap-2">
                <IconDoor size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-base font-bold text-gray-900">{MOCK.aula}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{MOCK.edificio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT (1/3) ── */}
        <div className="space-y-4">
          {/* floor plan placeholder */}
          <div className="bg-white border border-gray-200 p-4 space-y-2">
            <div className="w-full h-36 bg-gray-100 flex items-center justify-center">
              {/* simple floor plan sketch */}
              <svg width="100" height="80" viewBox="0 0 100 80" className="text-gray-400">
                <rect x="5" y="5" width="90" height="70" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="15" y="15" width="30" height="25" fill="none" stroke="currentColor" strokeWidth="1"/>
                <rect x="55" y="15" width="30" height="25" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1"/>
                <rect x="15" y="50" width="70" height="15" fill="none" stroke="currentColor" strokeWidth="1"/>
                <line x1="50" y1="5" x2="50" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3"/>
              </svg>
            </div>
            <div className="bg-gray-900 text-white text-[9px] uppercase tracking-widest text-center py-1">
              Plano Edificio A
            </div>
          </div>

          {/* disponibilidad */}
          <div className="bg-gray-900 p-4 space-y-3">
            <p className="text-[9px] uppercase tracking-widest text-cyan-400">
              Disponibilidad Semanal
            </p>
            <div>
              <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                <span>Capacidad</span>
                <span className="text-white">
                  {MOCK.capacidad} / {MOCK.capacidadTotal}
                </span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: `${(MOCK.capacidad / MOCK.capacidadTotal) * 100}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {MOCK.disponibilidad.map(({ dia, estado }) => (
                <div key={dia} className="text-center">
                  <p className="text-[9px] text-gray-400 uppercase tracking-wide mb-1">
                    {dia}
                  </p>
                  <span
                    className={`text-[10px] font-bold uppercase ${
                      estado === "LIBRE" ? "text-cyan-400" : "text-white"
                    }`}
                  >
                    {estado}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* QR placeholder */}
          <div className="bg-white border border-gray-200 border-dashed p-4 flex flex-col items-center justify-center gap-2 h-28">
            <div className="grid grid-cols-3 gap-0.5 opacity-20">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-gray-900"
                  style={{ opacity: Math.random() > 0.4 ? 1 : 0 }}
                />
              ))}
            </div>
            <p className="text-[9px] uppercase tracking-widest text-gray-400">
              Validación Digital de Aula
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
