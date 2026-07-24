import { renderProse } from "../lib/tex.js";

/* Renders a trusted curriculum HTML string (after typesetting \( … \) prose math).
   All reading content is authored in this repo, so innerHTML is safe here. */
export default function Html({ as: Tag = "div", html, ...rest }) {
  if (html == null) return null;
  /* data-html marks a subtree React renders as opaque innerHTML. The Phase 3
     concept linker only rewrites text inside these, because splitting a text
     node React itself owns would break reconciliation on the next re-render. */
  return <Tag data-html="" dangerouslySetInnerHTML={{ __html: renderProse(html) }} {...rest} />;
}
