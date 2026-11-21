import { Boxes, ShieldCheck, TriangleAlert, Lock, Network } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { t, type LangCode } from "@/lib/i18n";
import type { Asset } from "@/types/asset";

interface StatCardsProps {
  assets: Asset[];
  lang: LangCode;
}

export function StatCards({ assets, lang }: StatCardsProps) {
  const total = assets.length;
  const compliant = assets.filter((a) => a.compliance === "Compliant").length;
  const gaps = assets.filter(
    (a) => a.compliance === "NonCompliant" || a.compliance === "Partial"
  ).length;
  const restricted = assets.filter(
    (a) => a.classification === "Restricted"
  ).length;
  const controls = new Set(assets.flatMap((a) => a.controls)).size;

  const cards = [
    {
      label: t("statTotal", lang),
      value: total,
      icon: Boxes,
      chip: "bg-teal-100 text-teal-700",
    },
    {
      label: t("statCompliant", lang),
      value: compliant,
      icon: ShieldCheck,
      chip: "bg-emerald-100 text-emerald-700",
    },
    {
      label: t("statGaps", lang),
      value: gaps,
      icon: TriangleAlert,
      chip: "bg-amber-100 text-amber-700",
    },
    {
      label: t("statRestricted", lang),
      value: restricted,
      icon: Lock,
      chip: "bg-rose-100 text-rose-700",
    },
    {
      label: t("statControls", lang),
      value: controls,
      icon: Network,
      chip: "bg-indigo-100 text-indigo-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((c) => (
        <Card
          key={c.label}
          className="rounded-2xl border-slate-200 shadow-sm transition hover:shadow-md"
        >
          <CardContent className="flex flex-col gap-3 p-4">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.chip}`}>
              <c.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold tabular-nums text-slate-900">
                {c.value}
              </div>
              <div className="text-xs font-medium text-slate-500">{c.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}