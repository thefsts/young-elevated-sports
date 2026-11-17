#!/usr/bin/env python3
"""
Trace the client-approved raster artwork into editable SVG vector masters.

The approved logo is supplied as raster PNG. Rather than hand-drawing an
approximation, this script separates the artwork into its gold and silver
layers and auto-traces each with potrace, producing genuine editable vector
paths that follow the approved concept.

Output SVGs are labelled as traced masters pending client sign-off.
"""

import os
import re
import subprocess
import sys
import tempfile

from PIL import Image

KIT = "/workspace/brandkit/YESP_Approved_Brand_Kit"
OUT = "/workspace/young-elevated-sports/public/brand"

GOLD = "#D6A73B"
SILVER = "#C5C8CE"


def classify(r, g, b, a):
    """Return 'gold', 'light', or None for a pixel."""
    if a < 100:
        return None
    if (r + g + b) < 90:
        return None
    # gold: warm, red clearly above blue
    if r > 120 and g > 85 and (r - b) > 45 and b < 150:
        return "gold"
    return "light"


def build_masks(path, threshold=100):
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    px = im.load()
    gold = [[0] * w for _ in range(h)]
    light = [[0] * w for _ in range(h)]
    for y in range(h):
        for x in range(w):
            c = classify(*px[x, y])
            if c == "gold":
                gold[y][x] = 1
            elif c == "light":
                light[y][x] = 1
    return w, h, gold, light


def write_pbm(mask, w, h, dest):
    """Write a binary PBM (P4). 1 = black = traced shape."""
    with open(dest, "wb") as f:
        f.write(b"P4\n")
        f.write(f"{w} {h}\n".encode())
        row_bytes = (w + 7) // 8
        for y in range(h):
            row = bytearray(row_bytes)
            for x in range(w):
                if mask[y][x]:
                    row[x >> 3] |= 0x80 >> (x & 7)
            f.write(bytes(row))


def trace(mask, w, h, tmpdir, name):
    pbm = os.path.join(tmpdir, f"{name}.pbm")
    svg = os.path.join(tmpdir, f"{name}.svg")
    write_pbm(mask, w, h, pbm)
    subprocess.run(
        [
            "potrace",
            pbm,
            "-s",
            "-o",
            svg,
            "--flat",
            "--turdsize",
            "6",
            "--alphamax",
            "1.0",
            "--opttolerance",
            "0.25",
        ],
        check=True,
        capture_output=True,
    )
    with open(svg) as f:
        data = f.read()
    paths = re.findall(r'<path[^>]*\sd="([^"]+)"', data)
    return paths


def trace_file(src, out_name, title, viewbox_pad=0.0):
    w, h, gold, light = build_masks(src)
    with tempfile.TemporaryDirectory() as td:
        gpaths = trace(gold, w, h, td, "gold")
        lpaths = trace(light, w, h, td, "light")

    # potrace emits paths in a 10x, y-flipped coordinate space. Preserve that
    # transform on each colour group so the geometry lands correctly.
    xf = f'translate(0,{h}) scale(0.1,-0.1)'

    body = []
    body.append(f'<title>{title}</title>')
    body.append(
        f'<desc>Traced vector master derived from the client-approved raster artwork. '
        f'Editable paths; pending final client vector sign-off.</desc>'
    )
    body.append(f'<g transform="{xf}" fill="{SILVER}">')
    for d in lpaths:
        body.append(f'<path d="{d}"/>')
    body.append("</g>")
    body.append(f'<g transform="{xf}" fill="{GOLD}">')
    for d in gpaths:
        body.append(f'<path d="{d}"/>')
    body.append("</g>")

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'role="img" aria-label="{title}">\n'
        + "\n".join(body)
        + "\n</svg>\n"
    )
    dest = os.path.join(OUT, out_name)
    with open(dest, "w") as f:
        f.write(svg)
    print(f"wrote {dest}  (light paths: {len(lpaths)}, gold paths: {len(gpaths)})")
    return dest


def main():
    jobs = [
        (
            f"{KIT}/logos/YE_runner_arrow_transparent.png",
            "ye-runner-mark.svg",
            "YE runner mark",
        ),
        (
            f"{KIT}/logos/YESP_full_logo_transparent_approx.png",
            "ye-runner-lockup.svg",
            "Young and Elevated full logo",
        ),
    ]
    for src, out, title in jobs:
        if not os.path.exists(src):
            print(f"missing {src}", file=sys.stderr)
            continue
        trace_file(src, out, title)


if __name__ == "__main__":
    main()
