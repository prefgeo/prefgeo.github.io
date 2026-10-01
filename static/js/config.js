/* =====================================================================
 * PrefGeo project page — the ONE file you edit to add links and demos.
 * =====================================================================
 *
 * ADDING A DEMO
 *   1. Put the file in the repo, e.g.  static/videos/real/toast_prefgeo.mp4
 *   2. Set that slot's `src` below to the same path:
 *        { label: "+ PrefGeo", src: "static/videos/real/toast_prefgeo.mp4" }
 *   3. Commit + push. That's it.
 *
 * SUPPORTED `src` VALUES (type is detected from the extension / URL)
 *   Video : .mp4  .webm  .m4v  .mov   -> autoplays muted + looped while on screen
 *   Image : .gif  .webp  .png  .jpg  .jpeg  .avif
 *   Embed : a YouTube or Vimeo link   -> embedded player
 *           (careful: a YouTube/Vimeo channel name can de-anonymize you)
 *   ""    : empty -> shows a "Demo coming soon" placeholder
 *
 * OPTIONAL FIELDS
 *   Per slot (variant) : label, src, poster (still image shown before a video
 *                        loads), badge (e.g. "4×" playback speed), note (text
 *                        under the clip, e.g. "7/10 successes"), highlight
 *                        (true = accent border, use for PrefGeo)
 *   Per item           : title, instruction, caption, and either `variants`
 *                        (clips shown side by side) or a single `src`
 *   Per tab            : label, subtitle, aspect (clip frame shape, e.g.
 *                        "16/9", "4/3", "1/1"), cover (context image above the
 *                        clips), layout, items
 *                        layout: "stack"  (default) one task per row, full width
 *                                "picker" task chips; one task shown at a time, full width
 *                                "grid"   two tasks per row (smaller clips)
 *
 * OVERVIEW (narrated walkthrough, e.g. a NotebookLM Video/Audio Overview)
 *   overview.video : an .mp4 in the repo  -> shown with player controls
 *   overview.audio : an .mp3/.m4a/.wav     -> audio player (used if no video)
 *   overview.poster, overview.duration (e.g. "6 min"), overview.note (small
 *   print under the player). Leave both empty to hide the section + its links.
 *   Strip metadata first:  ffmpeg -i in.mp4 -map_metadata -1 -c copy out.mp4
 *
 * HIDING UNFINISHED SLOTS
 *   showPlaceholders: false  -> empty slots are hidden; items / tabs / whole
 *   sections with nothing to show disappear, including their nav link.
 * ===================================================================== */

window.PREFGEO_CONFIG = {
  // Leave a link "" to show a disabled "Coming soon" button.
  links: {
    paper: "",  // e.g. "static/prefgeo.pdf" or an OpenReview PDF link
    code: "",   // paper says: "Code will be released upon acceptance."
  },

  overview: {
    video: "",      // e.g. "static/overview/prefgeo_overview.mp4"
    audio: "",      // e.g. "static/overview/prefgeo_overview.mp3"
    poster: "",
    duration: "",   // e.g. "6 min"
    note: "AI-generated narration based on the paper. The paper is the authoritative reference.",
  },

  showPlaceholders: false,

  demos: {
    /* ------------------------------------------------------------------ */
    real: [
      {
        id: "real-vla",
        label: "VLA Manipulation",
        subtitle:
          "Franka Panda, π<sub>0.5</sub>-DROID fine-tuned with PrefGeo using 20 target preference labels per held-out task.",
        aspect: "16/9",
        items: [
          {
            title: "Take toast out of toaster",
            instruction: "Put the slice of bread from the toaster to the bowl",
            variants: [
              { label: "π0.5-DROID (zero-shot)", src: "", note: "2/10 successes" },
              { label: "+ PrefGeo", src: "", note: "7/10 successes", highlight: true },
            ],
          },
          {
            title: "Empty the box",
            instruction: "Remove the screwdriver and the cloth from the basket and put them on the table",
            variants: [
              { label: "π0.5-DROID (zero-shot)", src: "", note: "4/10 successes" },
              { label: "+ PrefGeo", src: "", note: "9/10 successes", highlight: true },
            ],
          },
          {
            title: "Stack cubes",
            instruction: "Stack the red block on top of the blue block",
            variants: [
              { label: "π0.5-DROID (zero-shot)", src: "", note: "2/10 successes" },
              { label: "+ PrefGeo", src: "", note: "6/10 successes", highlight: true },
            ],
          },
          {
            title: "Put marker into cup",
            instruction: "Pick up the red marker and put it into the blue cup",
            variants: [
              { label: "π0.5-DROID (zero-shot)", src: "", note: "1/10 successes" },
              { label: "+ PrefGeo", src: "", note: "5/10 successes", highlight: true },
            ],
          },
        ],
      },
      {
        id: "real-feeding",
        label: "Assistive Feeding",
        subtitle:
          "User study with a Kinova Jaco arm. A baseline failure next to PrefGeo, adapted to each participant from 10 preference labels. Faces are blurred; clips play at 2×.",
        aspect: "16/9",
        layout: "stack",
        items: [
          { title: "Participant 1 · Candy", instruction: "Feed a piece of candy with a spoon",
            variants: [
              { label: "Baseline", src: "static/videos/real/feeding_u1_candy_baseline.mp4", poster: "static/videos/real/feeding_u1_candy_baseline.webp", badge: "2×" },
              { label: "PrefGeo", src: "static/videos/real/feeding_u1_candy_prefgeo.mp4", poster: "static/videos/real/feeding_u1_candy_prefgeo.webp", badge: "2×", highlight: true },
            ] },
          { title: "Participant 1 · Waffle", instruction: "Feed a piece of waffle with a fork",
            variants: [
              { label: "Baseline", src: "static/videos/real/feeding_u1_waffle_baseline.mp4", poster: "static/videos/real/feeding_u1_waffle_baseline.webp", badge: "2×" },
              { label: "PrefGeo", src: "static/videos/real/feeding_u1_waffle_prefgeo.mp4", poster: "static/videos/real/feeding_u1_waffle_prefgeo.webp", badge: "2×", highlight: true },
            ] },
          { title: "Participant 2 · Waffle", instruction: "Feed a piece of waffle with a fork",
            variants: [
              { label: "Baseline", src: "static/videos/real/feeding_u2_waffle_baseline.mp4", poster: "static/videos/real/feeding_u2_waffle_baseline.webp", badge: "2×" },
              { label: "PrefGeo", src: "static/videos/real/feeding_u2_waffle_prefgeo.mp4", poster: "static/videos/real/feeding_u2_waffle_prefgeo.webp", badge: "2×", highlight: true },
            ] },
        ],
      },
    ],

    /* ------------------------------------------------------------------ */
    sim: [
      {
        id: "sim-metaworld",
        label: "Meta-World",
        subtitle:
          "Unseen target tasks: a baseline failure next to PrefGeo, whose policy is trained from scratch with the reward adapted from 20 target labels. Neither the target object nor the target action appears in the source tasks.",
        aspect: "16/9",
        layout: "picker",
        items: [
          { title: "Coffee Button", instruction: "Press the button on a coffee machine",
            variants: [
              { label: "Baseline", src: "static/videos/sim/mw_coffee-button_baseline.mp4", poster: "static/videos/sim/mw_coffee-button_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/mw_coffee-button_prefgeo.mp4", poster: "static/videos/sim/mw_coffee-button_prefgeo.webp", highlight: true },
            ] },
          { title: "Drawer Open", instruction: "Grasp the handle and pull a drawer open",
            variants: [
              { label: "Baseline", src: "static/videos/sim/mw_drawer-open_baseline.mp4", poster: "static/videos/sim/mw_drawer-open_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/mw_drawer-open_prefgeo.mp4", poster: "static/videos/sim/mw_drawer-open_prefgeo.webp", highlight: true },
            ] },
          { title: "Handle Pull", instruction: "Pull a handle upward",
            variants: [
              { label: "Baseline", src: "static/videos/sim/mw_handle-pull_baseline.mp4", poster: "static/videos/sim/mw_handle-pull_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/mw_handle-pull_prefgeo.mp4", poster: "static/videos/sim/mw_handle-pull_prefgeo.webp", highlight: true },
            ] },
          { title: "Sweep Into", instruction: "Sweep a puck into a hole on the table",
            variants: [
              { label: "Baseline", src: "static/videos/sim/mw_sweep-into_baseline.mp4", poster: "static/videos/sim/mw_sweep-into_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/mw_sweep-into_prefgeo.mp4", poster: "static/videos/sim/mw_sweep-into_prefgeo.webp", highlight: true },
            ] },
          { title: "Window Close", instruction: "Push a sliding window closed",
            variants: [
              { label: "Baseline", src: "static/videos/sim/mw_window-close_baseline.mp4", poster: "static/videos/sim/mw_window-close_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/mw_window-close_prefgeo.mp4", poster: "static/videos/sim/mw_window-close_prefgeo.webp", highlight: true },
            ] },
        ],
      },
      {
        id: "sim-libero",
        label: "LIBERO-Goal",
        subtitle:
          "A baseline failure next to π<sub>0.5</sub>-base fine-tuned with PrefGeo's adapted reward from 20 target labels. Each task is held out once as the target, with the other nine as sources.",
        aspect: "1/1",
        layout: "picker",
        items: [
          { title: "T1 · Open middle drawer", instruction: "Open the middle drawer of the cabinet",
            variants: [
              { label: "Baseline", src: "static/videos/sim/libero_t01_baseline.mp4", poster: "static/videos/sim/libero_t01_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/libero_t01_prefgeo.mp4", poster: "static/videos/sim/libero_t01_prefgeo.webp", highlight: true },
            ] },
          { title: "T2 · Bowl on stove", instruction: "Put the bowl on the stove",
            variants: [
              { label: "Baseline", src: "static/videos/sim/libero_t02_baseline.mp4", poster: "static/videos/sim/libero_t02_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/libero_t02_prefgeo.mp4", poster: "static/videos/sim/libero_t02_prefgeo.webp", highlight: true },
            ] },
          { title: "T3 · Bottle on cabinet", instruction: "Put the wine bottle on top of the cabinet",
            variants: [
              { label: "Baseline", src: "static/videos/sim/libero_t03_baseline.mp4", poster: "static/videos/sim/libero_t03_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/libero_t03_prefgeo.mp4", poster: "static/videos/sim/libero_t03_prefgeo.webp", highlight: true },
            ] },
          { title: "T4 · Bowl in top drawer", instruction: "Open the top drawer and put the bowl inside",
            variants: [
              { label: "Baseline", src: "static/videos/sim/libero_t04_baseline.mp4", poster: "static/videos/sim/libero_t04_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/libero_t04_prefgeo.mp4", poster: "static/videos/sim/libero_t04_prefgeo.webp", highlight: true },
            ] },
          { title: "T5 · Bowl on cabinet", instruction: "Put the bowl on top of the cabinet",
            variants: [
              { label: "Baseline", src: "static/videos/sim/libero_t05_baseline.mp4", poster: "static/videos/sim/libero_t05_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/libero_t05_prefgeo.mp4", poster: "static/videos/sim/libero_t05_prefgeo.webp", highlight: true },
            ] },
          { title: "T6 · Push plate to stove", instruction: "Push the plate to the front of the stove",
            variants: [
              { label: "Baseline", src: "static/videos/sim/libero_t06_baseline.mp4", poster: "static/videos/sim/libero_t06_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/libero_t06_prefgeo.mp4", poster: "static/videos/sim/libero_t06_prefgeo.webp", highlight: true },
            ] },
          { title: "T7 · Cheese in bowl", instruction: "Put the cream cheese in the bowl",
            variants: [
              { label: "Baseline", src: "static/videos/sim/libero_t07_baseline.mp4", poster: "static/videos/sim/libero_t07_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/libero_t07_prefgeo.mp4", poster: "static/videos/sim/libero_t07_prefgeo.webp", highlight: true },
            ] },
          { title: "T8 · Turn on stove", instruction: "Turn on the stove",
            variants: [
              { label: "Baseline", src: "static/videos/sim/libero_t08_baseline.mp4", poster: "static/videos/sim/libero_t08_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/libero_t08_prefgeo.mp4", poster: "static/videos/sim/libero_t08_prefgeo.webp", highlight: true },
            ] },
          { title: "T9 · Bowl on plate", instruction: "Put the bowl on the plate",
            variants: [
              { label: "Baseline", src: "static/videos/sim/libero_t09_baseline.mp4", poster: "static/videos/sim/libero_t09_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/libero_t09_prefgeo.mp4", poster: "static/videos/sim/libero_t09_prefgeo.webp", highlight: true },
            ] },
          { title: "T10 · Bottle on rack", instruction: "Put the wine bottle on the rack",
            variants: [
              { label: "Baseline", src: "static/videos/sim/libero_t10_baseline.mp4", poster: "static/videos/sim/libero_t10_baseline.webp" },
              { label: "PrefGeo", src: "static/videos/sim/libero_t10_prefgeo.mp4", poster: "static/videos/sim/libero_t10_prefgeo.webp", highlight: true },
            ] },
        ],
      },
    ],
  },
};
