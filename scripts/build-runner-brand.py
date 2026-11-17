#!/usr/bin/env python3
"""
Build the production logo variant set from the traced runner-mark masters.

Sources of truth:
  public/brand/ye-runner-mark.svg    (traced from approved icon)
  public/brand/ye-runner-lockup.svg  (traced from approved full logo)

potrace emits path data in a 10x, y-flipped coordinate space. Every emitted
variant must preserve that transform, otherwise the artwork renders zoomed and
cropped. All variants keep the runner silhouette and upward arrow intact.
"""

import os
import re

OUT = "/workspace/young-elevated-sports/public/brand"

BLACK = "#080808"
GOLD = "#D6A73B"
SILVER = "#C5C8CE"
WHITE = "#FFFFFF"
GRAPHITE = "#191919"


def load_layers(path):
    """Return (width, height, silver_paths, gold_paths) from a traced SVG."""
    data = open(path).read()
    vb = re.search(r'viewBox="([^"]+)"', data).group(1)
    parts = vb.split()
    w, h = float(parts[2]), float(parts[3])
    layers = {}
    # Format A: paths carry their own fill attribute.
    for fill, d in re.findall(r'<path\s+fill="([^"]+)"\s+d="([^"]+)"', data):
        layers.setdefault(fill.upper(), []).append(d)
    # Format B: paths grouped under a fill-bearing <g>.
    for fill, body in re.findall(r'<g transform="[^"]*" fill="([^"]+)">(.*?)</g>', data, re.S):
        layers.setdefault(fill.upper(), []).extend(re.findall(r'<path d="([^"]+)"', body))
    return w, h, layers.get(SILVER.upper(), []), layers.get(GOLD.upper(), [])


def potrace_group(paths, fill, h):
    """Wrap paths in potrace's 10x y-flipped coordinate transform."""
    inner = "\n".join(f'<path d="{d}"/>' for d in paths)
    return (
        f'<g transform="translate(0,{h}) scale(0.1,-0.1)" fill="{fill}">\n'
        f"{inner}\n</g>"
    )


def write(name, content):
    open(os.path.join(OUT, name), "w").write(content)
    print("wrote", name)


def main():
    mw, mh, ms, mg = load_layers(os.path.join(OUT, "ye-runner-mark.svg"))
    lw, lh, ls, lg = load_layers(os.path.join(OUT, "ye-runner-lockup.svg"))

    def mark_doc(silver_fill, gold_fill, title):
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {mw:g} {mh:g}" '
            f'role="img" aria-label="{title}">\n<title>{title}</title>\n'
            f"{potrace_group(ms, silver_fill, mh)}\n"
            f"{potrace_group(mg, gold_fill, mh)}\n</svg>\n"
        )

    # --- Mark, single-colour variants -------------------------------------
    write("ye-runner-mark.svg", mark_doc(SILVER, GOLD, "YE runner mark"))
    write("ye-runner-mark-black.svg", mark_doc(BLACK, BLACK, "YE runner mark, black"))
    write("ye-runner-mark-white.svg", mark_doc(WHITE, WHITE, "YE runner mark, white"))
    write("ye-runner-mark-gold.svg", mark_doc(GOLD, GOLD, "YE runner mark, gold"))
    write("ye-runner-mark-silver.svg", mark_doc(SILVER, SILVER, "YE runner mark, silver"))
    # Transparent variant for light backgrounds: graphite letterforms, gold runner.
    write("ye-runner-mark-on-light.svg",
          mark_doc(GRAPHITE, GOLD, "YE runner mark for light backgrounds"))

    # --- Mark on backgrounds ----------------------------------------------
    pad = 0.14
    bx, by = -mw * pad, -mh * pad
    bw, bh = mw * (1 + pad * 2), mh * (1 + pad * 2)

    def mark_bg(bg, title, fs, fg, radius=28):
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{bx:.1f} {by:.1f} '
            f'{bw:.1f} {bh:.1f}" role="img" aria-label="{title}">\n<title>{title}</title>\n'
            f'<rect x="{bx:.1f}" y="{by:.1f}" width="{bw:.1f}" height="{bh:.1f}" '
            f'rx="{radius}" fill="{bg}"/>\n'
            f"{potrace_group(ms, fs, mh)}\n{potrace_group(mg, fg, mh)}\n</svg>\n"
        )

    write("ye-runner-mark-dark-bg.svg",
          mark_bg(BLACK, "YE runner mark on black", SILVER, GOLD))
    write("ye-runner-mark-light-bg.svg",
          mark_bg(WHITE, "YE runner mark on white", GRAPHITE, GOLD))

    # --- Full lockup variants ---------------------------------------------
    def lockup_doc(silver_fill, gold_fill, title):
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {lw:g} {lh:g}" '
            f'role="img" aria-label="{title}">\n<title>{title}</title>\n'
            f"{potrace_group(ls, silver_fill, lh)}\n"
            f"{potrace_group(lg, gold_fill, lh)}\n</svg>\n"
        )

    write("ye-runner-lockup.svg", lockup_doc(SILVER, GOLD, "Young and Elevated full logo"))
    write("ye-runner-lockup-black.svg",
          lockup_doc(BLACK, BLACK, "Young and Elevated full logo, black"))
    write("ye-runner-lockup-white.svg",
          lockup_doc(WHITE, WHITE, "Young and Elevated full logo, white"))
    write("ye-runner-lockup-gold.svg",
          lockup_doc(GOLD, GOLD, "Young and Elevated full logo, gold"))

    lpad = 0.06
    lbx, lby = -lw * lpad, -lh * lpad
    lbw, lbh = lw * (1 + lpad * 2), lh * (1 + lpad * 2)

    def lockup_bg(bg, title, fs, fg):
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{lbx:.1f} {lby:.1f} '
            f'{lbw:.1f} {lbh:.1f}" role="img" aria-label="{title}">\n<title>{title}</title>\n'
            f'<rect x="{lbx:.1f}" y="{lby:.1f}" width="{lbw:.1f}" height="{lbh:.1f}" fill="{bg}"/>\n'
            f"{potrace_group(ls, fs, lh)}\n{potrace_group(lg, fg, lh)}\n</svg>\n"
        )

    write("ye-runner-lockup-dark-bg.svg",
          lockup_bg(BLACK, "Young and Elevated full logo on black", SILVER, GOLD))
    write("ye-runner-lockup-light-bg.svg",
          lockup_bg(WHITE, "Young and Elevated full logo on white", GRAPHITE, GOLD))

    # --- Square social avatar ---------------------------------------------
    side = max(mw, mh) * 1.55
    ox, oy = (side - mw) / 2, (side - mh) / 2
    write(
        "ye-runner-social.svg",
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {side:.1f} {side:.1f}" '
        f'role="img" aria-label="Young and Elevated social avatar">\n'
        f'<title>Young and Elevated social avatar</title>\n'
        f'<rect width="{side:.1f}" height="{side:.1f}" fill="{BLACK}"/>\n'
        f'<g transform="translate({ox:.1f},{oy:.1f})">\n'
        f"{potrace_group(ms, SILVER, mh)}\n{potrace_group(mg, GOLD, mh)}\n</g>\n</svg>\n",
    )

    # --- Favicon (square, safe-area padded) --------------------------------
    fside, inner = 64.0, 52.0
    scale = inner / mw
    fx, fy = (fside - mw * scale) / 2, (fside - mh * scale) / 2
    write(
        "favicon.svg",
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fside:g} {fside:g}" '
        f'role="img" aria-label="Young and Elevated favicon">\n'
        f'<title>Young and Elevated favicon</title>\n'
        f'<rect width="{fside:g}" height="{fside:g}" rx="12" fill="{BLACK}"/>\n'
        f'<g transform="translate({fx:.2f},{fy:.2f}) scale({scale:.5f})">\n'
        f"{potrace_group(ms, SILVER, mh)}\n{potrace_group(mg, GOLD, mh)}\n</g>\n</svg>\n",
    )

    # --- Watermark ---------------------------------------------------------
    write(
        "ye-runner-watermark.svg",
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {mw:g} {mh:g}" '
        f'role="img" aria-label="Young and Elevated watermark">\n'
        f"<title>Young and Elevated watermark</title>\n"
        f"{potrace_group(ms, WHITE, mh)}\n{potrace_group(mg, WHITE, mh)}\n</svg>\n",
    )

    # --- Apparel / embroidery ---------------------------------------------
    write(
        "ye-runner-apparel.svg",
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {mw:g} {mh:g}" '
        f'role="img" aria-label="Young and Elevated apparel mark">\n'
        f"<title>Young and Elevated apparel mark</title>\n"
        f"{potrace_group(ms, GOLD, mh)}\n{potrace_group(mg, GOLD, mh)}\n</svg>\n",
    )


if __name__ == "__main__":
    main()
