DONE: Fixed the two owner-reported widget UI defects (MPoR step boxes now sized to their labels instead of overflowing; exposure-metrics labels clamped inside the plot, effective EE drawn as a halo under EE so the overlap reads honestly, plus a show-PFE toggle so the EE pair can fill the box).
NEXT: Apply the R36 treatment to R37 (CVA), which consumes R36's output.
BLOCKERS: The show-PFE toggle's live behaviour is not headless-verifiable (the static-DOM harness does not run widget JS); needs a real browser check. Coverage back-audit over the 65 cleared readings still unscheduled.
