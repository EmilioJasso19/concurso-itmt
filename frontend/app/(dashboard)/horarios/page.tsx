"use client";

import { useState } from "react";
import Link from "next/link";
import DeleteModal from "@/components/horarios/delete-modal";
import { IconPlus, IconEdit, IconTrash, IconFilter } from "@/components/icons";

type EstadoType = "ACTIVO" | "ERROR" | "BORRADOR";

type Horario = {
  id: number;
  dia: string;
  hora: string;
  conflicto?: boolean;
  materia: string;
  grupo: string;
  docente: string;
  espacio: string;
  estado: EstadoType;
  referencia: string;
  ubicacion: string;
};

const DATA: Horario[] = [
  {
    id: 1,
    dia: "LUN",
    hora: "07:00 – 09:00",
    materia: "Estructuras de Datos",
    grupo: "IS-G201",
    docente: "Dr. Ricardo Salinas",
    espacio: "A-102",
    estado: "ACTIVO",
    referencia: "TEC-201-SEC1",
    ubicacion: "Aula A-102 (Piso 1)",
  },
  {
    id: 2,
    dia: "MAR",
    hora: "10:00 – 12:00",
    conflicto: true,
    materia: "Cálculo Vectorial",
    grupo: "IS-G101",
    docente: "Mtra. Sofia Mendez",
    espacio: "L-005",
    estado: "ERROR",
    referencia: "TEC-204-SEC3",
    ubicacion: "Aula A-102 (Piso 1)",
  },
  {
    id: 3,
    dia: "MIÉ",
    hora: "08:00 – 10:00",
    materia: "Redes de Computadoras",
    grupo: "IS-G304",
    docente: "Ing. Alberto Torres",
    espacio: "C-201",
    estado: "ACTIVO",
    referencia: "TEC-301-SEC2",
    ubicacion: "Aula C-201 (Piso 2)",
  },
  {
    id: 4,
    dia: "JUE",
    hora: "13:00 – 15:00",
    materia: "Inteligencia Artificial",
    grupo: "IS-G402",
    docente: "Dr. Juan Pérez",
    espacio: "L-008",
    estado: "BORRADOR",
    referencia: "TEC-401-SEC1",
    ubicacion: "Lab L-008 (Piso 3)",
  },
  {
    id: 5,
    dia: "VIE",
    hora: "16:00 – 18:00",
    materia: "Sistemas Embebidos",
    grupo: "IS-G302",
    docente: "Ing. Karla Ruiz",
    espacio: "L-LAB-1",
    estado: "ACTIVO",
    referencia: "TEC-302-SEC4",
    ubicacion: "Lab L-LAB-1 (Piso 1)",
  },
];

const STATUS_STYLES: Record<EstadoType, string> = {
  ACTIVO: "border border-cyan-500 text-cyan-600",
  ERROR: "border border-red-500 text-red-600",
  BORRADOR: "border border-gray-400 text-gray-500",
};

export default function HorariosPage() {
  const [deleteTarget, setDeleteTarget] = useState<Horario | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planificación Académica</h1>
          <p className="text-sm text-gray-500 mt-1">
            Administración y resolución de conflictos para el ciclo 2024-II.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors">
          <IconPlus size={16} />
          Asignar Horario
        </button>
      </div>

      {/* filters */}
      <div className="bg-white border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          {[
            { label: "DOCENTE", placeholder: "Todos los docentes" },
            { label: "GRUPO", placeholder: "Cualquier grupo" },
            { label: "CARRERA", placeholder: "Todas las carreras" },
            { label: "ESPACIO", placeholder: "Todos los espacios" },
          ].map(({ label, placeholder }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <label className="text-[9px] uppercase tracking-widest text-gray-400">
                {label}
              </label>
              <select className="h-9 px-3 pr-8 border border-gray-300 bg-white text-sm text-gray-700 appearance-none focus:outline-none focus:border-cyan-400 min-w-[160px]">
                <option>{placeholder}</option>
              </select>
            </div>
          ))}

          <button className="mt-4 flex items-center gap-2 px-4 h-9 border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <IconFilter size={14} />
            Limpiar
          </button>
        </div>
      </div>

      {/* table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "#0f1729" }}>
              {["Horario", "Materia / Grupo", "Docente", "Espacio", "Estado", "Acciones"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-gray-400 font-medium"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {DATA.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {/* horario */}
                <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">
                  {row.conflicto ? (
                    <div>
                      <span className="font-semibold text-red-600">
                        {row.dia} {row.hora}
                      </span>
                      <div className="flex items-center gap-1 mt-0.5 text-red-500 text-[10px]">
                        <span>⚠</span>
                        <span className="uppercase tracking-wide">Conflicto de horario</span>
                      </div>
                    </div>
                  ) : (
                    <span className="font-semibold text-gray-800">
                      {row.dia} {row.hora}
                    </span>
                  )}
                </td>

                {/* materia */}
                <td className="px-4 py-3">
                  <p className="font-mono text-xs text-gray-800">{row.materia}</p>
                  <p className="font-mono text-[10px] text-gray-400 mt-0.5">{row.grupo}</p>
                </td>

                {/* docente */}
                <td className="px-4 py-3 font-mono text-xs text-gray-700">
                  {row.docente}
                </td>

                {/* espacio */}
                <td className="px-4 py-3 font-mono text-xs text-gray-700">
                  {row.espacio}
                </td>

                {/* estado */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[row.estado]}`}
                  >
                    {row.estado}
                  </span>
                </td>

                {/* acciones */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/horarios/${row.id}`}>
                      <button className="text-gray-400 hover:text-gray-700 transition-colors p-1">
                        <IconEdit size={15} />
                      </button>
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(row)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    >
                      <IconTrash size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-[11px] text-gray-400 uppercase tracking-wide">
            Mostrando 1-5 de 128 resultados
          </span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs border border-gray-300 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-40">
              Anterior
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-8 h-8 text-xs border transition-colors ${
                  p === 1
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button className="px-3 py-1.5 text-xs border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {/* delete modal */}
      {deleteTarget && (
        <DeleteModal
          referencia={deleteTarget.referencia}
          ubicacion={deleteTarget.ubicacion}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => {
            console.log("Eliminar:", deleteTarget.id);
            setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
}
