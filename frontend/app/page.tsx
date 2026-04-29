"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";

export default function Home() {
	const { token } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (token) {
			router.replace("/horarios");
		} else {
			router.replace("/login");
		}
	}, [token, router]);

	return null;
}
