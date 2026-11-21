import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  CATEGORIES,
  CLASSIFICATIONS,
  COMPLIANCE_STATES,
  CONTROLS,
  RISKS,
  STATUSES,
  type Asset,
  type AssetCategory,
  type AssetStatus,
  type Classification,
  type ComplianceState,
  type RiskLevel,
} from "@/types/asset";

interface AssetFormProps {
  lang: LangCode;
  onAdd: (asset: Asset) => void;
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
const RISK_KEY: Record<RiskLevel, string> = {
  Low: "riskLow",
  Medium: "riskMedium",
  High: "riskHigh",
  Critical: "riskCritical",
};

export function AssetForm({ lang, onAdd }: AssetFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<AssetCategory>("Information");
  const [classification, setClassification] =
    useState<Classification>("Internal");
  const [criticality, setCriticality] = useState("3");
  const [owner, setOwner] = useState("");
  const [custodian, setCustodian] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<AssetStatus>("Active");
  const [risk, setRisk] = useState<RiskLevel>("Medium");
  const [compliance, setCompliance] = useState<ComplianceState>("NotAssessed");
  const [controls, setControls] = useState<string[]>([]);

  const toggleControl = (id: string) => {
    setControls((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const submit = () => {
    if (!name.trim()) return;
    const now = new Date();
    const next = new Date(now);
    next.setMonth(next.getMonth() + 6);
    const iso = (d: Date) => d.toISOString().slice(0, 10);

    onAdd({
      id: `AST-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      name: name.trim(),
      category,
      classification,
      criticality: Number(criticality) as 1 | 2 | 3 | 4,
      owner: owner.trim() || "—",
      custodian: custodian.trim() || "—",
      location: location.trim() || "—",
      status,
      risk,
      compliance,
      controls,
      lastReview: iso(now),
      nextReview: iso(next),
      value: 0,
    });

    setName("");
    setOwner("");
    setCustodian("");
    setLocation("");
    setControls([]);
  };

  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="font-serif text-lg text-slate-900">
          {t("addAsset", lang)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label>{t("formName", lang)}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>{t("formCategory", lang)}</Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as AssetCategory)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>{t("formClassification", lang)}</Label>
            <Select
              value={classification}
              onValueChange={(v) => setClassification(v as Classification)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CLASSIFICATIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {t(CLASS_KEY[c], lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>{t("formCriticality", lang)}</Label>
            <Select value={criticality} onValueChange={setCriticality}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["1", "2", "3", "4"].map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>{t("formRisk", lang)}</Label>
            <Select value={risk} onValueChange={(v) => setRisk(v as RiskLevel)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RISKS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {t(RISK_KEY[r], lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>{t("formOwner", lang)}</Label>
          <Input value={owner} onChange={(e) => setOwner(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>{t("formCustodian", lang)}</Label>
          <Input value={custodian} onChange={(e) => setCustodian(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>{t("formLocation", lang)}</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>{t("formStatus", lang)}</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as AssetStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {t(STATUS_KEY[s], lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>{t("formCompliance", lang)}</Label>
            <Select
              value={compliance}
              onValueChange={(v) => setCompliance(v as ComplianceState)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COMPLIANCE_STATES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {t(COMP_KEY[c], lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>{t("formControls", lang)}</Label>
          <div className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto rounded-lg border border-slate-200 p-2">
            {CONTROLS.map((c) => {
              const active = controls.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleControl(c.id)}
                  title={c.name}
                  className={`rounded-md px-2 py-1 text-xs font-medium transition ${
                    active
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {c.id}
                </button>
              );
            })}
          </div>
        </div>

        <Button
          onClick={submit}
          className="w-full bg-teal-700 hover:bg-teal-800"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          {t("formSubmit", lang)}
        </Button>
      </CardContent>
    </Card>
  );
}