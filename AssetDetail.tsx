import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { t, type LangCode } from "@/lib/i18n";
import { CONTROL_MAP, type Asset } from "@/types/asset";

interface AssetDetailProps {
  asset: Asset;
  lang: LangCode;
  onClose: () => void;
}

export function AssetDetail({ asset, lang, onClose }: AssetDetailProps) {
  const rows: [string, string][] = [
    [t("formCategory", lang), asset.category],
    [t("formClassification", lang), asset.classification],
    [t("formCriticality", lang), String(asset.criticality)],
    [t("formOwner", lang), asset.owner],
    [t("formCustodian", lang), asset.custodian],
    [t("formLocation", lang), asset.location],
    [t("formStatus", lang), asset.status],
    [t("formRisk", lang), asset.risk],
    [t("formCompliance", lang), asset.compliance],
    [t("colNextReview", lang), asset.nextReview],
  ];

  return (
    <Card className="rounded-2xl border-teal-200 bg-teal-50/40 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <div>
          <CardTitle className="font-serif text-lg text-slate-900">
            {t("detailTitle", lang)}
          </CardTitle>
          <p className="mt-1 text-sm font-medium text-teal-800">{asset.name}</p>
          <p className="text-xs text-slate-400">{asset.id}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <dt className="text-xs text-slate-500">{k}</dt>
              <dd className="font-medium text-slate-800">{v}</dd>
            </div>
          ))}
        </dl>

        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            {t("formControls", lang)}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {asset.controls.length === 0 ? (
              <span className="text-sm text-slate-400">—</span>
            ) : (
              asset.controls.map((c) => (
                <Badge
                  key={c}
                  variant="outline"
                  className="border-indigo-200 bg-indigo-50 text-indigo-700"
                  title={CONTROL_MAP[c] ?? c}
                >
                  {c}
                </Badge>
              ))
            )}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={onClose}
        >
          {t("detailClose", lang)}
        </Button>
      </CardContent>
    </Card>
  );
}