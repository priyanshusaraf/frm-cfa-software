import { useMemo } from "react";
import { useParams, useSearchParams, useLocation, Link } from "react-router-dom";
import PdfCore from "../components/PdfCore.jsx";

export default function PdfView() {
  const { bn: bnParam } = useParams();
  const bn = parseInt(bnParam, 10);
  const validBook = Number.isInteger(bn) && bn >= 1 && bn <= 5;

  const [searchParams] = useSearchParams();
  const qParam = searchParams.get("q") || "";
  const q2Param = searchParams.get("q2") || ""; // fallback anchor (usually the reading title)
  const pageParam = searchParams.get("page");
  /* memoized: PdfCore re-searches whenever the ladder's contents change */
  const queries = useMemo(() => [qParam, q2Param].filter(Boolean), [qParam, q2Param]);
  const location = useLocation();
  const backTo = (location.state && location.state.from) || "/";

  if (!validBook) {
    return (
      <main className="page">
        <div className="card" style={{ maxWidth: 460, margin: "3rem auto", textAlign: "center" }}>
          <h3>Couldn't open this PDF</h3>
          <p className="text-dim">Unknown book "{bnParam}".</p>
          <Link to={backTo} className="text-accent">← Go back</Link>
        </div>
      </main>
    );
  }

  return (
    <PdfCore
      fileUrl={import.meta.env.BASE_URL + "pdfs/book" + bn + ".pdf"}
      label={"Book " + bn}
      maxWidth={900}
      mode="window"
      initialQueries={queries}
      initialPage={pageParam}
      toolbarLeft={<Link to={backTo} className="text-dim hover:text-ink text-sm no-underline">← Back</Link>}
    />
  );
}
