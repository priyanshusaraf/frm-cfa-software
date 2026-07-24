/* Authored concept pages that supplement the auto-detected core concepts
   (src/lib/coreConcepts.js). Each entry drives the SAME /concept/:slug page, no
   new page type (roadmap Phase 1, section 7.1 v2). Two layers:

     layer: "revision"  a foundational prerequisite (Part I / already-assumed)
                        re-taught from first principles, for a concept a one-line
                        refresher is not enough for (securitization, TVM,
                        duration/convexity, copulas, ...).
     layer: "core"      a deeper authored take on a reused advanced model that
                        goes past what the home reading's own fields carry.

   Shape (all fields optional except slug + name + layer):
     {
       slug, name, layer,
       lead,                       // one-line HTML summary under the title
       homeReading,                // reading this most belongs to (crumb + base layer)
       refs: [rn, ...],            // readings this concept surfaces in
       sections: [{ label, html, tone }],   // ordered, problem-first (section 1a)
     }

   Content is authored FUNCTIONALLY in Phase 2 (the securitization flagship is the
   first), gated by the validator, then flagged for the Phase 5 tone pass. This
   table is intentionally EMPTY until then; the page and index already handle it. */
export const authoredConcepts = [];
