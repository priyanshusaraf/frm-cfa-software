import { renderProse } from "../lib/tex.js";

/* Renders a trusted curriculum HTML string (after typesetting \( … \) prose math).
   All reading content is authored in this repo, so innerHTML is safe here. */
export default function Html({ as: Tag = "div", html, ...rest }) {
  if (html == null) return null;
  return <Tag dangerouslySetInnerHTML={{ __html: renderProse(html) }} {...rest} />;
}
