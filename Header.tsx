import { ShieldCheck, Languages, LayoutList, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES, t, type LangCode } from "@/lib/i18n";

interface HeaderProps {
  lang: LangCode;
  onLangChange: (l: LangCode) => void;
  tab: "register" | "translator";
  onTabChange: (t: "register" | "translator") => void;
}

export function Header({ lang, onLangChange, tab, onTabChange }: HeaderProps) {
  return (
    <header className="border-b border-teal-900/20 bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-700 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold leading-tight sm:text-2xl">
              {t("appTitle", lang)}
            </h1>
            <p className="text-xs text-teal-50/80 sm:text-sm">
              {t("appSubtitle", lang)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg bg-white/10 p-1 ring-1 ring-white/20">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTabChange("register")}
              className={
                tab === "register"
                  ? "bg-white text-teal-800 hover:bg-white hover:text-teal-800"
                  : "text-white hover:bg-white/15 hover:text-white"
              }
            >
              <LayoutList className="mr-1.5 h-4 w-4" />
              {t("navRegister", lang)}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTabChange("translator")}
              className={
                tab === "translator"
                  ? "bg-white text-teal-800 hover:bg-white hover:text-teal-800"
                  : "text-white hover:bg-white/15 hover:text-white"
              }
            >
              <Sparkles className="mr-1.5 h-4 w-4" />
              {t("navTranslator", lang)}
            </Button>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-2 py-1 ring-1 ring-white/20">
            <Languages className="h-4 w-4 text-teal-50" />
            <Select value={lang} onValueChange={(v) => onLangChange(v as LangCode)}>
              <SelectTrigger className="h-8 w-44 border-0 bg-transparent text-white focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l.code} value={l.code}>
                    <span className="mr-2">{l.flag}</span>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
}