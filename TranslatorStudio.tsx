import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Copy, Check, Languages } from "lucide-react";
import { LANGUAGES, translate, aiTranslate, type LangCode } from "@/lib/i18n";

interface Props {
  lang: LangCode;
}

export function TranslatorStudio({ lang }: Props) {
  const t = (key: string) => translate(key, lang);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const results = useMemo(
    () =>
      LANGUAGES.map((l) => ({
        ...l,
        output: aiTranslate(text, l.code),
      })),
    [text],
  );

  const copyAll = async () => {
    const payload = results
      .map((r) => `${r.flag} ${r.label}: ${r.output}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card className="border-teal-200 bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100">
        <CardTitle className="flex items-center gap-2 font-serif text-lg text-teal-900">
          <Sparkles className="h-5 w-5 text-teal-600" />
          {t("translatorTitle")}
        </CardTitle>
        <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
          <Languages className="mr-1 h-3 w-3" />
          {LANGUAGES.length}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("translatorPlaceholder")}
          className="min-h-24 border-slate-300 bg-slate-50"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500">{t("translatorHint")}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={copyAll}
            disabled={!text.trim()}
            className="border-teal-300 text-teal-800 hover:bg-teal-50"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                {t("copied")}
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                {t("copyAll")}
              </>
            )}
          </Button>
        </div>

        {text.trim() ? (
          <div className="grid max-h-96 gap-2 overflow-y-auto pr-1 md:grid-cols-2">
            {results.map((r) => (
              <div
                key={r.code}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span>{r.flag}</span>
                  <span>{r.label}</span>
                </div>
                <p className="mt-1 text-sm text-slate-800">{r.output}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 py-8 text-center text-sm text-slate-400">
            {t("translatorPlaceholder")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}