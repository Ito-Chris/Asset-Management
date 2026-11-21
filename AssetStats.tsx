import { Card, CardContent } from "@/components/ui/card";
import { Dog, CheckCircle2, GraduationCap, HeartPulse, Wallet } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { Asset } from "@/types/asset";

interface Props {
  assets: Asset[];
}

export function AssetStats({ assets }: Props) {
  const { t } = useLanguage();

  const total = assets.length;
  const active = assets.filter((a) => a.status === "Active").length;
  const training = assets.filter((a) => a.status === "Training").length;
  const medical = assets.filter((a) => a.status === "Medical Leave").length;
  const value = assets.reduce((sum, a) => sum + a.value, 0);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard icon={<Dog className="h-5 w-5" />} label={t("statTotal")} value={String(total)} tone="teal" />
      <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label={t("statActive")} value={String(active)} tone="emerald" />
      <StatCard icon={<GraduationCap className="h-5 w-5" />} label={t("statTraining")} value={String(training)} tone="sky" />
      <StatCard icon={<HeartPulse className="h-5 w-5" />} label={t("statMedical")} value={String(medical)} tone="rose" />
      <StatCard
        icon={<Wallet className="h-5 w-5" />}
        label={t("statValue")}
        value={`$${(value / 1000).toFixed(1)}k`}
        tone="amber"
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "teal" | "emerald" | "sky" | "rose" | "amber";
}) {
  const tones = {
    teal: "bg-teal-50 text-teal-700 ring-teal-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    sky: "bg-sky-50 text-sky-700 ring-sky-200",
    rose: "bg-rose-50 text-rose-700 ring-rose-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
  } as const;

  return (
    <Card className="border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${tones[tone]}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="truncate text-2xl font-bold text-slate-900">{value}</p>
          <p className="truncate text-xs uppercase tracking-wide text-slate-500">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}