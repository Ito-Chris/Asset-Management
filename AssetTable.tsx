import { useMemo, useState } from "react";
import { Search, Inbox } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { t, type LangCode } from "@/lib/i18n";
import {
  CLASSIFICATIONS,
  COMPLIANCE_STATES,
  STATUSES,
  type Asset,
  type Classification,
  type ComplianceState,
  type AssetStatus,
} from "@/types/asset";

interface AssetTableProps {
  assets: Asset[];
  lang: LangCode;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const CLASS_KEY: Record<Classification, string> = {
  Public: "classPublic",
  Internal: "classInternal",
  Confidential: "classConfidential",
  Restricted: "classRestricted",
};

const STATUS_KEY: Record<AssetStatus, string> = {
  Active: "statusActive",
  Maintenance: "statusMaintenance",
  Retired: "statusRetired",
  Decommissioned: "statusDecommissioned",
};

const COMP_KEY: Record<ComplianceState, string> = {
  Compliant: "compCompliant",
  Partial: "compPartial",
  NonCompliant: "compNonCompliant",
  NotAssessed: "compNotAssessed",
};

const CLASS_STYLE: Record<Classification, string> = {
  Public: "bg-slate-100 text-slate-700 border-slate-200",
  Internal: "bg-sky-100 text-sky-700 border-sky-200",
  Confidential: "bg-amber-100 text-amber-800 border-amber-200",
  Restricted: "bg-rose-100 text-rose-700 border-rose-200",
};

const COMP_STYLE: Record<ComplianceState, string> = {
  Compliant: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Partial: "bg-amber-100 text-amber-800 border-amber-200",
  NonCompliant: "bg-rose-100 text-rose-700 border-rose-200",
  NotAssessed: "bg-slate-100 text-slate-600 border-slate-200",
};

export function AssetTable({
  assets,
  lang,
  selectedId,
  onSelect,
}: AssetTableProps) {
  const [query, setQuery] = useState("");
  const [cls, setCls] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [comp, setComp] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assets.filter((a) => {
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.owner.toLowerCase().includes(q) ||
        a.controls.some((c) => c.toLowerCase().includes(q));
      const matchesCls = cls === "all" || a.classification === cls;
      const matchesStatus = status === "all" || a.status === status;
      const matchesComp = comp === "all" || a.compliance === comp;
      return matchesQuery && matchesCls && matchesStatus && matchesComp;
    });
  }, [assets, query, cls, status, comp]);

  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="gap-4">
        <CardTitle className="font-serif text-lg text-slate-900">
          {t("navRegister", lang)}
        </CardTitle>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder", lang)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={cls} onValueChange={setCls}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filterAll", lang)}</SelectItem>
                {CLASSIFICATIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {t(CLASS_KEY[c], lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filterAll", lang)}</SelectItem>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {t(STATUS_KEY[s], lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={comp} onValueChange={setComp}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filterAll", lang)}</SelectItem>
                {COMPLIANCE_STATES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {t(COMP_KEY[c], lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-6 py-16 text-center">
            <Inbox className="h-10 w-10 text-slate-300" />
            <p className="text-sm text-slate-500">{t("emptyState", lang)}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3 font-semibold">{t("colAsset", lang)}</th>
                  <th className="px-4 py-3 font-semibold">
                    {t("colClassification", lang)}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {t("colCompliance", lang)}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {t("colControls", lang)}
                  </th>
                  <th className="px-4 py-3 font-semibold">{t("colOwner", lang)}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr
                    key={a.id}
                    onClick={() => onSelect(a.id)}
                    className={`cursor-pointer border-b border-slate-100 transition hover:bg-teal-50/60 ${
                      selectedId === a.id ? "bg-teal-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{a.name}</div>
                      <div className="text-xs text-slate-400">
                        {a.id} · {a.category}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={CLASS_STYLE[a.classification]}
                      >
                        {t(CLASS_KEY[a.classification], lang)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={COMP_STYLE[a.compliance]}>
                        {t(COMP_KEY[a.compliance], lang)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {a.controls.slice(0, 3).map((c) => (
                          <span
                            key={c}
                            className="rounded bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-700"
                          >
                            {c}
                          </span>
                        ))}
                        {a.controls.length > 3 && (
                          <span className="text-xs text-slate-400">
                            +{a.controls.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{a.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}