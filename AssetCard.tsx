import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dog, Trash2, CalendarDays } from "lucide-react";
import { translate, type LangCode } from "@/lib/i18n";
import type { K9Asset } from "@/types/asset";

interface Props {
  asset: K9Asset;
  lang: LangCode;
  onRemove: (id: string) => void;
}

const statusTone: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  training: "bg-sky-100 text-sky-800 hover:bg-sky-100",
  retired: "bg-slate-200 text-slate-700 hover:bg-slate-200",
};

const riskTone: Record<string, string> = {
  low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  medium: "bg-amber-50 text-amber-700 ring-amber-200",
  high: "bg-rose-50 text-rose-700 ring-rose-200",
};

export function AssetCard({ asset, lang, onRemove }: Props) {
  const t = (key: string) => translate(key, lang);
  const statusLabel =
    asset.status === "active"
      ? t("statusActive")
      : asset.status === "training"
        ? t("statusTraining")
        : t("statusRetired");
  const riskLabel =
    asset.riskLevel === "low"
      ? t("riskLow")
      : asset.riskLevel === "medium"
        ? t("riskMedium")
        : t("riskHigh");

  return (
    <Card className="group border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-200">
              <Dog className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">{asset.name}</p>
              <p className="text-xs text-slate-500">{asset.id}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(asset.id)}
            className="text-slate-400 opacity-0 transition group-hover:opacity-100 hover:text-rose-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 space-y-1 text-sm text-slate-600">
          <p>
            <span className="text-slate-400">{t("formBreed")}: </span>
            {asset.breed}
          </p>
          <p>
            <span className="text-slate-400">{t("formHandler")}: </span>
            {asset.handler}
          </p>
          <p>
            <span className="text-slate-400">{t("formRole")}: </span>
            {asset.role}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge className={statusTone[asset.status]}>{statusLabel}</Badge>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${riskTone[asset.riskLevel]}`}
          >
            {riskLabel}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
          <CalendarDays className="h-3.5 w-3.5" />
          {t("certExpires")}: {asset.certification}
        </div>
      </CardContent>
    </Card>
  );
}