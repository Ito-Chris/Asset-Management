import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Copy, Check } from "lucide-react";
import { LANGUAGES, aiTranslate } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export function AITranslator() {
  const { t } = useLanguage();
  const [text, setText] = useState("K9 unit certified and ready for deployment.");
  const [copied, setCopied] = useState(false);

  const results = useMemo(
    () => LANGUAGES.map((l) => ({ ...l, out: aiTranslate(text, l.code) })),
    [text],
  );

  const copyAll = async () => {
    const payload = results.map((r) => `${r.flag} ${r.label}: ${r.out}`).join("\n");
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card className="border-teal-200 bg-gradient-to-br from-white to-teal-50/40 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-teal-100">
        <CardTitle className="flex items-center gap-2 font-serif text-lg text-teal-900">
          <Sparkles className="h-5 w-5 text-teal-600" />
          {t("translatorTitle")}
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={copyAll}
          className="border-teal-200 text-teal-700 hover:bg-teal-50"
        >
          {copied ? (
            <>
              <Check className="mr-1.5 h-4 w-4" />
              {t("copied")}
            </>
          ) : (
            <>
              <Copy className="mr-1.5 h-4 w-4" />
              {t("copyAll")}
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <p className="text-sm text-teal-800/70">{t("translatorHint")}</p>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("translatorPlaceholder")}
          className="min-h-20 border-teal-200 bg-white"
        />
        <div className="grid max-h-96 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
          {results.map((r) => (
            <div
              key={r.code}
              className="rounded-lg border border-teal-100 bg-white px-3 py-2 shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-teal-700">
                <span>{r.flag}</span>
                {r.label}
              </div>
              <p className="mt-1 text-sm text-slate-700">{r.out}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}