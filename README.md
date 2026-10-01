# PrefGeo project page

Source for **https://prefgeo.github.io**, the anonymous project page for
*PrefGeo: Generalizing Preference Learning Across Contexts via Geometric Reward Factorization*.

Plain HTML/CSS/JS, no build step. GitHub Pages serves `main` as-is.

```
index.html              page content (text, figures, tables, BibTeX)
static/js/config.js     ← edit this to add rollout videos, the overview, and the Paper/Code links
static/js/main.js       renders the demos from config.js (no need to edit)
static/css/style.css    styles
static/images/          figures (converted from the paper's PDFs)
static/videos/real/     put real-robot clips here
static/videos/sim/      put simulation clips here
```

## Adding a demo video or GIF

1. Copy the file into `static/videos/real/` or `static/videos/sim/`.
2. In `static/js/config.js`, find the slot and set its `src`:
   ```js
   { label: "+ PrefGeo", src: "static/videos/real/toast_prefgeo.mp4", note: "7/10 successes", highlight: true },
   ```
3. Commit and push. The site updates within a minute or two (browsers may
   cache the old version for up to 10 minutes).

The type is detected from the extension: `.mp4/.webm/.mov` play as muted,
looping videos while on screen; `.gif/.webp/.png/.jpg` show as images; a
YouTube/Vimeo link embeds a player. Empty `src` shows a "Demo coming soon"
placeholder. Set `showPlaceholders: false` in `config.js` to hide every empty
slot (and any tab or section left with nothing to show).

Other per-clip options: `poster` (still frame shown while loading), `badge`
(e.g. `"4×"` playback speed), `note` (text under the clip), `highlight`.
Per tab: `aspect` sets the clip frame shape (`"16/9"`, `"4/3"`, `"1/1"`).

### Recommended encoding

MP4 is far smaller than GIF at the same quality. Aim for < 10 MB per clip
(GitHub rejects files over 100 MB).

```bash
# web-friendly MP4: H.264, 720p, no audio, metadata stripped
ffmpeg -i input.mov -an -map_metadata -1 -vf "scale=-2:720,fps=30" \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart out.mp4

# speed up 4× (then set badge: "4×")
ffmpeg -i input.mp4 -an -map_metadata -1 -vf "setpts=PTS/4,scale=-2:720" \
  -c:v libx264 -crf 26 -pix_fmt yuv420p -movflags +faststart out_4x.mp4

# GIF -> MP4
ffmpeg -i input.gif -an -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
  -c:v libx264 -crf 24 -pix_fmt yuv420p -movflags +faststart out.mp4
```

## Adding the narrated overview (e.g. NotebookLM Video/Audio Overview)

1. Strip metadata and put the file in `static/overview/`:
   ```bash
   ffmpeg -i overview.mp4 -map_metadata -1 -c copy static/overview/prefgeo_overview.mp4
   ```
2. In `static/js/config.js`, set `overview.video` (or `overview.audio` for an
   .mp3/.m4a) and optionally `duration`. With both empty, the Walkthrough section
   and its links are hidden.

## Keeping the page anonymous (double-blind review)

- Blur participant faces; check backgrounds for lab names, logos, posters, badges.
- Strip file metadata (`-map_metadata -1` above); don't name files after people.
- Avoid YouTube/Vimeo embeds from personal or lab channels.
- Don't add analytics or tracking scripts.
- Commits are authored with the account's GitHub noreply address.

## Preview locally

```bash
python3 -m http.server 8000
```
Then open http://localhost:8000.
