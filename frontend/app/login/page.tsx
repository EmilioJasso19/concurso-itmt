"use client";

import { useAuthStore } from "@/stores/auth.store";

export default function LoginPage() {
	const { form, setField, login, loading, error } = useAuthStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await login();
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
				<h1 className="text-2xl font-semibold text-center mb-6">EspacioTEC</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm mb-1">Correo</label>
						<input
							type="email"
							placeholder="admin@espaciotec.com"
							value={form.email}
							onChange={(e) => setField("email", e.target.value)}
							className="w-full border rounded px-3 py-2"
							required
						/>
					</div>

					<div>
						<label className="block text-sm mb-1">Contraseña</label>
						<input
							type="password"
							placeholder="********"
							value={form.password}
							onChange={(e) => setField("password", e.target.value)}
							className="w-full border rounded px-3 py-2"
							required
						/>
					</div>

					{error && <p className="text-red-500 text-sm text-center">{error}</p>}

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 text-white py-2 rounded"
					>
						{loading ? "Ingresando..." : "Iniciar sesión"}
					</button>
				</form>
			</div>
		</div>
	);
}
