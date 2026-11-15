import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { StatStrip } from "@/components/StatStrip";
import { AssetToolbar } from "@/components/AssetToolbar";
import { AssetList } from "@/components/AssetList";
import { AssetDetail } from "@/components/AssetDetail";
import { initialAssets, type Asset } from "@/data/assets";

export default function App() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(initialAssets[0]?.id ?? null);

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      const matchesQuery =
        query.trim() === "" ||
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.tag.toLowerCase().includes(query.toLowerCase()) ||
        a.owner.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || a.category === category;
      const matchesStatus = status === "all" || a.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [assets, query, category, status]);

  const selected = assets.find((a) => a.id === selectedId) ?? null;

  function cycleStatus(id: string) {
    setAssets((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status:
                a.status === "compliant"
                  ? "review"
                  : a.status === "review"
                    ? "at-risk"
                    : "compliant",
            }
          : a
      )
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header />
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-8">
        <StatStrip assets={assets} />
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AssetToolbar
              query={query}
              onQuery={setQuery}
              category={category}
              onCategory={setCategory}
              status={status}
              onStatus={setStatus}
              count={filtered.length}
            />
            <AssetList
              assets={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
          <div className="lg:col-span-1">
            <AssetDetail asset={selected} onCycleStatus={cycleStatus} />
          </div>
        </div>
      </main>
    </div>
  );
}