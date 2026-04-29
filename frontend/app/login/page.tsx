"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const { form, setField, login, loading, error } = useAuthStore();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await login();
		router.push("horarios");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#f8f9ff] px-4">
			<div className="w-full max-w-md">
				{/* HEADER */}
				<div className="text-center mb-8">
					<h1 className="text-3xl font-semibold tracking-tight">EspacioTEC</h1>
					<p className="text-xs uppercase tracking-widest text-gray-500 mt-1">
						Gestión Académica
					</p>
				</div>

				{/* CARD */}
				<div className="bg-white border border-gray-200 shadow-sm">
					{/* Accent line */}
					<div className="h-1 bg-cyan-400"></div>

					<div className="p-6 space-y-5">
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="flex flex-col gap-1">
								<label className="text-xs uppercase tracking-wide text-gray-600">
									Correo
								</label>
								<input
									placeholder="admin@espaciotec.com"
									value={form.username}
									onChange={(e) => setField("username", e.target.value)}
									className="
                    w-full h-11 px-3 
                    border border-gray-300 
                    bg-white 
                    text-sm
                    focus:outline-none 
                    focus:border-cyan-400 
                    focus:ring-1 focus:ring-cyan-400
                    transition
                  "
									required
								/>
							</div>

							{/* PASSWORD */}
							<div className="flex flex-col gap-1">
								<label className="text-xs uppercase tracking-wide text-gray-600">
									Contraseña
								</label>
								<input
									type="password"
									placeholder="••••••••"
									value={form.password}
									onChange={(e) => setField("password", e.target.value)}
									className="
                    w-full h-11 px-3 
                    border border-gray-300 
                    bg-white 
                    text-sm
                    focus:outline-none 
                    focus:border-cyan-400 
                    focus:ring-1 focus:ring-cyan-400
                    transition
                  "
									required
								/>
							</div>

							{/* ERROR */}
							{error && (
								<p className="text-red-500 text-xs text-center">{error}</p>
							)}

							{/* BUTTON */}
							<button
								type="submit"
								disabled={loading}
								className="
                  w-full h-12
                  bg-cyan-400 text-black
                  font-medium
                  border border-black
                  hover:bg-black hover:text-cyan-400
                  transition-all
                  flex items-center justify-center gap-2
                  disabled:opacity-50
                "
							>
								{loading ? "Ingresando..." : "Iniciar sesión"}
								{!loading && <span>→</span>}
							</button>
						</form>

						{/* FOOTER */}
						<div className="flex items-center justify-between text-[11px] text-gray-500 pt-2">
							<span className="underline cursor-pointer hover:text-black">
								¿Olvidaste tu contraseña?
							</span>
							<span className="flex items-center gap-1">
								<span className="w-2 h-2 bg-cyan-400"></span>
								Seguro
							</span>
						</div>
					</div>
				</div>

				{/* LEGAL / INFO */}
				<div className="text-center mt-6 text-[10px] text-gray-400 uppercase tracking-widest">
					Acceso restringido a personal autorizado
				</div>
			</div>
		</div>
	);
}
