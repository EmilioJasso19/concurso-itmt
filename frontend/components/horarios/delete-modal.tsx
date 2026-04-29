"use client";

import { IconWarning, IconX } from "@/components/icons";

type Props = {
  referencia: string;
  ubicacion: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({ referencia, ubicacion, onCancel, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* modal */}
      <div className="relative bg-white w-full max-w-md mx-4 shadow-xl">
        {/* header */}
        <div className="flex items-center gap-3 p-5 border-b border-gray-200">
          <div className="w-9 h-9 bg-red-100 flex items-center justify-center flex-shrink-0">
            <IconWarning size={18} className="text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 flex-1">¿Eliminar registro?</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* body */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            ¿Estás seguro de que deseas eliminar este horario? Esta acción no se
            puede deshacer y el espacio quedará disponible inmediatamente para
            otras asignaciones.
          </p>

          {/* reference detail */}
          <div className="flex gap-6 border-l-4 border-gray-300 pl-4 py-1">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">
                Referencia
              </p>
              <p className="text-sm font-bold text-gray-900">{referencia}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">
                Ubicación
              </p>
              <p className="text-sm font-bold text-gray-900">{ubicacion}</p>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="flex gap-3 px-5 pb-5 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 text-sm font-medium border border-gray-400 text-gray-700 hover:bg-gray-50 transition-colors uppercase tracking-wide"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 text-sm font-medium bg-red-800 text-white hover:bg-red-900 transition-colors uppercase tracking-wide"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
