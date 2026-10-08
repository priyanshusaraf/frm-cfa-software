/* Account builders for scenario files. Keeping these terse is deliberate:
   a scenario should read like the textbook exhibit it animates. */
export { dr, cr } from "../engine/ledger.js";

export const cash = (label = "Cash") => ({ id: "cash", label, type: "asset", group: "ca", cash: true });
export const asset = (id, label, group = "ca", extra) => ({ id, label, type: "asset", group, ...extra });
export const liab = (id, label, group = "cl", extra) => ({ id, label, type: "liability", group, ...extra });
export const equity = (id, label, extra) => ({ id, label, type: "equity", group: "eq", ...extra });
export const re = (label = "Retained earnings") => ({ id: "re", label, type: "equity", group: "eq", role: "re" });
export const aoci = (label = "Accumulated OCI") => ({ id: "aoci", label, type: "equity", group: "eq", role: "aoci" });
export const nciEq = (label = "Non-controlling interest") => ({ id: "nciEq", label, type: "equity", group: "eq" });
export const rev = (id, label, extra) => ({ id, label, type: "revenue", ...extra });
export const exp = (id, label, extra) => ({ id, label, type: "expense", ...extra });
export const oci = (id, label, extra) => ({ id, label, type: "oci", ...extra });
export const nciAlloc = (label = "NI attributable to NCI") => ({ id: "nciAlloc", label, type: "nci" });
export const divs = (label = "Dividends declared") => ({ id: "divs", label, type: "dividend" });
