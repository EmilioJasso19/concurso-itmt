"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";

export default function Home() {
	const { user, token } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (!token) {
			router.push("/login");
		}
	}, [token, router]);

	if (user) {
		return (
			<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
				<h1 className="text-2xl font-bold mb-4">Bienvenido, {user.name}!</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Tu email: {user.email}
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black"></div>
	);
}
