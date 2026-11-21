export type AssetStatus =
  | "Active"
  | "Maintenance"
  | "Retired"
  | "Decommissioned";

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export type Classification =
  | "Public"
  | "Internal"
  | "Confidential"
  | "Restricted";

export type ComplianceState =
  | "Compliant"
  | "Partial"
  | "NonCompliant"
  | "NotAssessed";

export type AssetCategory =
  | "Information"
  | "Hardware"
  | "Software"
  | "Service"
  | "Network"
  | "People"
  | "Facility"
  | "K9 Unit";

export interface Control {
  id: string;
  name: string;
}

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  classification: Classification;
  criticality: 1 | 2 | 3 | 4;
  owner: string;
  custodian: string;
  location: string;
  status: AssetStatus;
  risk: RiskLevel;
  compliance: ComplianceState;
  controls: string[];
  lastReview: string;
  nextReview: string;
  value: number;
}

export const CATEGORIES: AssetCategory[] = [
  "Information",
  "Hardware",
  "Software",
  "Service",
  "Network",
  "People",
  "Facility",
  "K9 Unit",
];

export const CLASSIFICATIONS: Classification[] = [
  "Public",
  "Internal",
  "Confidential",
  "Restricted",
];

export const STATUSES: AssetStatus[] = [
  "Active",
  "Maintenance",
  "Retired",
  "Decommissioned",
];

export const RISKS: RiskLevel[] = ["Low", "Medium", "High", "Critical"];

export const COMPLIANCE_STATES: ComplianceState[] = [
  "Compliant",
  "Partial",
  "NonCompliant",
  "NotAssessed",
];

export const CONTROLS: Control[] = [
  { id: "A.5.1", name: "Policies for information security" },
  { id: "A.5.9", name: "Inventory of information and assets" },
  { id: "A.5.10", name: "Acceptable use of information" },
  { id: "A.5.12", name: "Classification of information" },
  { id: "A.5.13", name: "Labelling of information" },
  { id: "A.5.15", name: "Access control" },
  { id: "A.5.23", name: "Cloud services security" },
  { id: "A.6.3", name: "Awareness and training" },
  { id: "A.7.4", name: "Physical security monitoring" },
  { id: "A.8.1", name: "User endpoint devices" },
  { id: "A.8.8", name: "Technical vulnerability management" },
  { id: "A.8.9", name: "Configuration management" },
  { id: "A.8.12", name: "Data leakage prevention" },
  { id: "A.8.13", name: "Information backup" },
  { id: "A.8.16", name: "Monitoring activities" },
  { id: "A.8.20", name: "Network security" },
  { id: "A.8.24", name: "Use of cryptography" },
  { id: "A.8.28", name: "Secure coding" },
];

export const CONTROL_MAP: Record<string, string> = CONTROLS.reduce(
  (acc, c) => {
    acc[c.id] = c.name;
    return acc;
  },
  {} as Record<string, string>
);