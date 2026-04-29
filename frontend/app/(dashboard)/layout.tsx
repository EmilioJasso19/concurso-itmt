"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import {
  IconGrid,
  IconBuilding,
  IconCalendar,
  IconWarning,
  IconUsers,
  IconBell,
  IconSettings,
  IconLogOut,
} from "@/components/icons";

const NAV = [
  { href: "/inicio", label: "Inicio", Icon: IconGrid },
  { href: "/espacios", label: "Espacios", Icon: IconBuilding },
  { href: "/horarios", label: "Horarios", Icon: IconCalendar },
  { href: "/incidencias", label: "Incidencias", Icon: IconWarning },
  { href: "/usuarios", label: "Usuarios", Icon: IconUsers },
];

const SECTION_TITLES: Record<string, string> = {
  "/horarios": "Gestión de Horarios",
  "/espacios": "Gestión de Espacios",
  "/incidencias": "Gestión de Incidencias",
  "/usuarios": "Gestión de Usuarios",
  "/inicio": "Panel de Control",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, token, logout } = useAuthStore();

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  const sectionKey = Object.keys(SECTION_TITLES).find((k) => pathname.startsWith(k)) ?? "";
  const title = SECTION_TITLES[sectionKey] ?? "EspacioTEC";

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "AD";

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── SIDEBAR ── */}
      <aside
        className="w-64 flex-shrink-0 flex flex-col"
        style={{ background: "#0f1729" }}
      >
        {/* brand */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-cyan-400 flex-shrink-0" />
            <div>
              <p className="text-white font-bold text-sm tracking-wide leading-none">
                ESPACIOTEC
              </p>
              <p className="text-gray-400 text-[9px] uppercase tracking-widest mt-0.5">
                Gestión Académica
              </p>
            </div>
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ href, label, Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-all ${
                  active
                    ? "bg-white/15 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
                {active && (
                  <div className="ml-auto w-1 h-4 bg-cyan-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* user */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-400 flex items-center justify-center text-black text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-xs font-semibold truncate">
                {user?.name ?? "Admin"}
              </p>
              <p className="text-gray-400 text-[10px] capitalize truncate">
                {user?.role ?? "Administrador"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── RIGHT SIDE ── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {/* header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 gap-4 flex-shrink-0">
          <span className="text-sm font-semibold text-gray-800 flex-1">{title}</span>

          <div className="flex items-center gap-3">
            <button className="text-gray-500 hover:text-gray-800 transition-colors">
              <IconBell size={18} />
            </button>
            <button className="text-gray-500 hover:text-gray-800 transition-colors">
              <IconSettings size={18} />
            </button>

            <div className="w-px h-5 bg-gray-200" />

            <span className="text-sm text-gray-600">{user?.name ?? "Administrador"}</span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors"
            >
              <IconLogOut size={13} />
              Cerrar Sesión
            </button>
          </div>
        </header>

        {/* main content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
