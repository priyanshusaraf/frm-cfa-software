import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { rpath, readingMeta, bookOf } from "../../lib/meta.js";
import { getReading } from "../../lib/readings.js";

const ROW_H = 68;
const MIN_H = 190;
const NODE_W = 150;
const NODE_H = 56;
const CENTER_W = 120;
const CENTER_H = 66;
const SIDE_CHARS = 22; // ~130px of 11px text per line
const CENTER_CHARS = 21; // ~108px of 10px text per line

/* Word-wrap onto at most two lines of ~perLine chars, ellipsizing the second. */
function wrapTwo(s, perLine) {
  const str = (s || "").trim();
  if (str.length <= perLine) return [str];
  const words = str.split(/\s+/);
  let first = "";
  let i = 0;
  while (i < words.length && (first ? first.length + 1 + words[i].length : words[i].length) <= perLine) {
    first = first ? first + " " + words[i] : words[i];
    i++;
  }
  if (!first) {
    first = words[0].slice(0, perLine);
    words[0] = words[0].slice(perLine);
    i = 0;
  }
  let second = words.slice(i).join(" ");
  if (second.length > perLine) second = second.slice(0, perLine - 1).trimEnd() + "…";
  return second ? [first, second] : [first];
}

/* One side node (from-column on the left, to-column on the right). */
function SideNode({ r, why, x, y, side, hovered, onHover, onLeave, color }) {
  const navigate = useNavigate();
  const rm = readingMeta(r);
  const lines = wrapTwo(rm ? rm.t : "", SIDE_CHARS);
  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={() => navigate(rpath(r))}
      onMouseEnter={() => onHover(side, r)}
      onMouseLeave={onLeave}
      style={{ cursor: "pointer" }}
    >
      <title>{why || ""}</title>
      <rect
        x={0}
        y={-NODE_H / 2}
        width={NODE_W}
        height={NODE_H}
        rx={8}
        fill="var(--bg-raised)"
        stroke={color}
        strokeWidth={hovered ? 2 : 1.2}
      />
      <text
        x={10}
        y={-11}
        fontFamily="var(--mono, monospace)"
        fontSize="10.5"
        fill={color}
      >
        R{r}
      </text>
      {lines.map((ln, i) => (
        <text key={i} x={10} y={5 + i * 14} fontSize="11" fill="var(--text)">
          {ln}
        </text>
      ))}
    </g>
  );
}

/* Small per-reading connection map: "from" readings feeding into this one on the
   left, "to" readings this one feeds into on the right, with the current reading
   as a center node and cubic-bezier edges between them. */
export default function MiniMap({ rn }) {
  const book = bookOf(rn);
  const color = book ? book.color : "var(--accent)";

  const [hover, setHover] = useState(null); // { side, r }
  const navigate = useNavigate();

  const rdata = getReading(rn);
  const conns = rdata && rdata.connections ? rdata.connections : null;
  const from = (conns && conns.from) || [];
  const to = (conns && conns.to) || [];

  if (!from.length && !to.length) return null;

  const rows = Math.max(from.length, to.length, 1);
  const height = Math.max(MIN_H, rows * ROW_H + 40);
  const width = 480;
  const cx = width / 2;
  const cy = height / 2;

  const leftX = 8;
  const rightX = width - NODE_W - 8;

  function colY(count, i) {
    const blockH = count * ROW_H;
    const start = cy - blockH / 2 + ROW_H / 2;
    return start + i * ROW_H;
  }

  const rm = readingMeta(rn);
  const centerLines = wrapTwo(rm ? rm.t : "", CENTER_CHARS);

  return (
    <div className="card">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <marker
            id="mmarrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="var(--text-faint)" />
          </marker>
        </defs>

        {/* edges: from -> center */}
        {from.map((f, i) => {
          const y = colY(from.length, i);
          const x1 = leftX + NODE_W;
          const y1 = y;
          const x2 = cx - CENTER_W / 2;
          const y2 = cy;
          const isHover = hover && hover.side === "from" && hover.r === f.r;
          const path = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
          return (
            <path
              key={"ef" + i}
              d={path}
              fill="none"
              stroke={isHover ? "var(--accent)" : "var(--border)"}
              strokeWidth={isHover ? 2.5 : 1.5}
              opacity={isHover ? 1 : 0.7}
            />
          );
        })}

        {/* edges: center -> to */}
        {to.map((t, i) => {
          const y = colY(to.length, i);
          const x1 = cx + CENTER_W / 2;
          const y1 = cy;
          const x2 = rightX;
          const y2 = y;
          const isHover = hover && hover.side === "to" && hover.r === t.r;
          const path = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
          return (
            <path
              key={"et" + i}
              d={path}
              fill="none"
              stroke={isHover ? "var(--accent)" : "var(--border)"}
              strokeWidth={isHover ? 2.5 : 1.5}
              opacity={isHover ? 1 : 0.7}
              markerEnd="url(#mmarrow)"
            />
          );
        })}

        {/* from nodes */}
        {from.map((f, i) => (
          <SideNode
            key={"nf" + i}
            r={f.r}
            why={f.why}
            x={leftX}
            y={colY(from.length, i)}
            side="from"
            hovered={hover && hover.side === "from" && hover.r === f.r}
            onHover={(side, r) => setHover({ side, r })}
            onLeave={() => setHover(null)}
            color={bookOf(f.r) ? bookOf(f.r).color : "var(--accent)"}
          />
        ))}

        {/* to nodes */}
        {to.map((t, i) => (
          <SideNode
            key={"nt" + i}
            r={t.r}
            why={t.why}
            x={rightX}
            y={colY(to.length, i)}
            side="to"
            hovered={hover && hover.side === "to" && hover.r === t.r}
            onHover={(side, r) => setHover({ side, r })}
            onLeave={() => setHover(null)}
            color={bookOf(t.r) ? bookOf(t.r).color : "var(--accent)"}
          />
        ))}

        {/* center node */}
        <g
          transform={`translate(${cx - CENTER_W / 2}, ${cy - CENTER_H / 2})`}
          onClick={() => navigate(rpath(rn))}
          style={{ cursor: "pointer" }}
        >
          <title>{rm ? rm.t : ""}</title>
          <rect
            x={0}
            y={0}
            width={CENTER_W}
            height={CENTER_H}
            rx={10}
            fill={color}
            fillOpacity={0.14}
            stroke={color}
            strokeWidth={2}
          />
          <text
            x={CENTER_W / 2}
            y={20}
            textAnchor="middle"
            fontFamily="var(--mono, monospace)"
            fontSize="12"
            fontWeight="700"
            fill={color}
          >
            R{rn}
          </text>
          {centerLines.map((ln, i) => (
            <text
              key={i}
              x={CENTER_W / 2}
              y={36 + i * 13}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-dim)"
            >
              {ln}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
