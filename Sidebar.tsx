import {
  LayoutDashboard,
  Boxes,
  ShieldCheck,
  Sparkles,
  Settings,
  LifeBuoy,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export type NavKey = "overview" | "inventory" | "compliance" | "translator";

interface Props {
  active: NavKey;
  onChange: (key: NavKey) => void;
}

export function Sidebar({ active, onChange }: Props) {
  const { t } = useLanguage();

  const items: { key: NavKey; icon: React.ReactNode; label: string }[] = [
    { key: "overview", icon: <LayoutDashboard className="h-4 w-4" />, label: t("navOverview") },
    { key: "inventory", icon: <Boxes className="h-4 w-4" />, label: t("navInventory") },
    { key: "compliance", icon: <ShieldCheck className="h-4 w-4" />, label: t("navCompliance") },
    { key: "translator", icon: <Sparkles className="h-4 w-4" />, label: t("navTranslator") },
  ];

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {items.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-teal-50 text-teal-800 ring-1 ring-teal-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className={isActive ? "text-teal-600" : "text-slate-400"}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="border-t border-slate-100 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
          <Settings className="h-4 w-4 text-slate-400" />
          Settings
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
          <LifeBuoy className="h-4 w-4 text-slate-400" />
          Support
        </button>
      </div>
    </aside>
  );
}