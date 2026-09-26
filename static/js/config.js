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
 *                        clips), items
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

  showPlaceholders: true,

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
        label: "Assistive Feeding User Study",
        subtitle:
          "Kinova Jaco arm. Each participant gives only 10 preference labels; policies are shown in a blind, randomized order.",
        aspect: "16/9",
        items: [
          {
            title: "Robot-assisted feeding",
            caption: "Participants' faces are blurred.",
            variants: [
              { label: "Base", src: "" },
              { label: "LoRe", src: "" },
              { label: "PrefGeo", src: "", highlight: true },
            ],
          },
        ],
      },
    ],

    /* ------------------------------------------------------------------ */
    sim: [
      {
        id: "sim-metaworld",
        label: "Meta-World",
        subtitle:
          "Unseen target tasks; neither the target object nor the target action appears in the source tasks. Policies trained from scratch with the adapted reward.",
        aspect: "1/1",
        cover: "static/images/metaworld_tasks.webp",
        items: [
          { title: "Coffee Button", instruction: "Press the button on a coffee machine",
            variants: [ { label: "LoRe", src: "" }, { label: "PrefGeo", src: "", highlight: true } ] },
          { title: "Drawer Open", instruction: "Grasp the handle and pull a drawer open",
            variants: [ { label: "LoRe", src: "" }, { label: "PrefGeo", src: "", highlight: true } ] },
          { title: "Handle Pull", instruction: "Pull a handle upward",
            variants: [ { label: "LoRe", src: "" }, { label: "PrefGeo", src: "", highlight: true } ] },
          { title: "Sweep Into", instruction: "Sweep a puck into a hole on the table",
            variants: [ { label: "LoRe", src: "" }, { label: "PrefGeo", src: "", highlight: true } ] },
          { title: "Window Close", instruction: "Push a sliding window closed",
            variants: [ { label: "LoRe", src: "" }, { label: "PrefGeo", src: "", highlight: true } ] },
        ],
      },
      {
        id: "sim-libero",
        label: "LIBERO-Goal",
        subtitle:
          "Each task is held out once as the target, with the other nine as sources. π<sub>0.5</sub>-base fine-tuned with 20 target labels.",
        aspect: "1/1",
        cover: "static/images/libero_tasks.webp",
        items: [
          { title: "T1 · Open middle drawer", instruction: "Open the middle drawer of the cabinet",
            variants: [ { label: "π0.5-base", src: "" }, { label: "+ PrefGeo", src: "", highlight: true } ] },
          { title: "T2 · Bowl on stove", instruction: "Put the bowl on the stove",
            variants: [ { label: "π0.5-base", src: "" }, { label: "+ PrefGeo", src: "", highlight: true } ] },
          { title: "T3 · Bottle on cabinet", instruction: "Put the wine bottle on top of the cabinet",
            variants: [ { label: "π0.5-base", src: "" }, { label: "+ PrefGeo", src: "", highlight: true } ] },
          { title: "T4 · Bowl in top drawer", instruction: "Open the top drawer and put the bowl inside",
            variants: [ { label: "π0.5-base", src: "" }, { label: "+ PrefGeo", src: "", highlight: true } ] },
          { title: "T5 · Bowl on cabinet", instruction: "Put the bowl on top of the cabinet",
            variants: [ { label: "π0.5-base", src: "" }, { label: "+ PrefGeo", src: "", highlight: true } ] },
          { title: "T6 · Push plate to stove", instruction: "Push the plate to the front of the stove",
            variants: [ { label: "π0.5-base", src: "" }, { label: "+ PrefGeo", src: "", highlight: true } ] },
          { title: "T7 · Cheese in bowl", instruction: "Put the cream cheese in the bowl",
            variants: [ { label: "π0.5-base", src: "" }, { label: "+ PrefGeo", src: "", highlight: true } ] },
          { title: "T8 · Turn on stove", instruction: "Turn on the stove",
            variants: [ { label: "π0.5-base", src: "" }, { label: "+ PrefGeo", src: "", highlight: true } ] },
          { title: "T9 · Bowl on plate", instruction: "Put the bowl on the plate",
            variants: [ { label: "π0.5-base", src: "" }, { label: "+ PrefGeo", src: "", highlight: true } ] },
          { title: "T10 · Bottle on rack", instruction: "Put the wine bottle on the rack",
            variants: [ { label: "π0.5-base", src: "" }, { label: "+ PrefGeo", src: "", highlight: true } ] },
        ],
      },
      {
        id: "sim-feeding",
        label: "Assistive Gym Feeding",
        subtitle:
          "Unseen simulated users, each adapted with 20 preference labels. From the same starting state, each method's adapted reward picks its best of 10 base-policy rollouts.",
        aspect: "4/3",
        items: [
          { title: "Unseen user A", caption: "",
            variants: [ { label: "LoRe's pick", src: "" }, { label: "PrefGeo's pick", src: "", highlight: true } ] },
          { title: "Unseen user B", caption: "",
            variants: [ { label: "LoRe's pick", src: "" }, { label: "PrefGeo's pick", src: "", highlight: true } ] },
        ],
      },
    ],
  },
};
