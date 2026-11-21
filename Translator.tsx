import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LANGUAGES, t, type LangCode } from "@/lib/i18n";

interface TranslatorProps {
  lang: LangCode;
}

export function Translator({ lang }: TranslatorProps) {
  const [text, setText] = useState("");

  const results = useMemo(() => {
    const src = text.trim();
    if (!src) return [];
    return LANGUAGES.map((l) => ({
      ...l,
      out: src,
    }));
  }, [text]);

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-serif text-xl text-teal-900">
            <Sparkles className="h-5 w-5" />
            {t("translatorTitle", lang)}
          </CardTitle>
          <p className="text-sm text-teal-800/70">
            {t("translatorHint", lang)}
          </p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("translatorPlaceholder", lang)}
            className="min-h-24 bg-white"
          />
        </CardContent>
      </Card>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-sm text-slate-400">
          {t("translatorPlaceholder", lang)}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r) => (
            <Card
              key={r.code}
              className="rounded-xl border-slate-200 shadow-sm transition hover:shadow-md"
            >
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-lg">{r.flag}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {r.label}
                  </span>
                </div>
                <p className="text-sm text-slate-800">{r.out}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}