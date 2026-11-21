import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { StatCards } from "@/components/StatCards";
import { AssetTable } from "@/components/AssetTable";
import { AssetForm } from "@/components/AssetForm";
import { AssetDetail } from "@/components/AssetDetail";
import { Translator } from "@/components/Translator";
import { t, type LangCode } from "@/lib/i18n";
import type { Asset } from "@/types/asset";

const SEED: Asset[] = [
  {
    id: "AST-0001",
    name: "Customer CRM Database",
    category: "Information",
    classification: "Confidential",
    criticality: 4,
    owner: "Head of Sales Ops",
    custodian: "Database Team",
    location: "AWS eu-west-1",
    status: "Active",
    risk: "High",
    compliance: "Compliant",
    controls: ["A.5.9", "A.5.12", "A.5.15", "A.8.24"],
    lastReview: "2025-01-12",
    nextReview: "2025-07-12",
    value: 420000,
  },
  {
    id: "AST-0002",
    name: "K9 Patrol Unit — Handler Terminal",
    category: "K9 Unit",
    classification: "Restricted",
    criticality: 3,
    owner: "Security Operations",
    custodian: "Field Ops",
    location: "HQ — Gate 2",
    status: "Active",
    risk: "Medium",
    compliance: "Partial",
    controls: ["A.7.4", "A.8.1"],
    lastReview: "2025-02-03",
    nextReview: "2025-08-03",
    value: 18500,
  },
  {
    id: "AST-0003",
    name: "Corporate VPN Gateway",
    category: "Network",
    classification: "Internal",
    criticality: 4,
    owner: "IT Infrastructure",
    custodian: "Network Team",
    location: "Datacenter A",
    status: "Active",
    risk: "Critical",
    compliance: "NonCompliant",
    controls: ["A.8.20", "A.8.9"],
    lastReview: "2024-11-20",
    nextReview: "2025-05-20",
    value: 96000,
  },
  {
    id: "AST-0004",
    name: "HR Records Archive",
    category: "Information",
    classification: "Confidential",
    criticality: 3,
    owner: "Head of People",
    custodian: "Records Team",
    location: "On-prem vault",
    status: "Maintenance",
    risk: "Medium",
    compliance: "NotAssessed",
    controls: ["A.5.12", "A.8.13"],
    lastReview: "2024-09-01",
    nextReview: "2025-03-01",
    value: 12000,
  },
  {
    id: "AST-0005",
    name: "Endpoint Fleet (Laptops)",
    category: "Hardware",
    classification: "Internal",
    criticality: 2,
    owner: "IT Support",
    custodian: "Asset Management",
    location: "Distributed",
    status: "Active",
    risk: "Low",
    compliance: "Compliant",
    controls: ["A.8.1", "A.8.9", "A.8.8"],
    lastReview: "2025-03-15",
    nextReview: "2025-09-15",
    value: 310000,
  },
];

export default function App() {
  const [lang, setLang] = useState<LangCode>("en");
  const [assets, setAssets] = useState<Asset[]>(SEED);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<"register" | "translator">("register");

  const selected = useMemo(
    () => assets.find((a) => a.id === selectedId) ?? null,
    [assets, selectedId]
  );

  const addAsset = (asset: Asset) => {
    setAssets((prev) => [asset, ...prev]);
    setSelectedId(asset.id);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header
        lang={lang}
        onLangChange={setLang}
        tab={tab}
        onTabChange={setTab}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {tab === "register" ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <StatCards assets={assets} lang={lang} />
              <AssetTable
                assets={assets}
                lang={lang}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
            <div className="space-y-6">
              <AssetForm lang={lang} onAdd={addAsset} />
              {selected && (
                <AssetDetail
                  asset={selected}
                  lang={lang}
                  onClose={() => setSelectedId(null)}
                />
              )}
            </div>
          </div>
        ) : (
          <Translator lang={lang} />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8">
          {t("appTitle", lang)} · {t("appSubtitle", lang)}
        </div>
      </footer>
    </div>
  );
}