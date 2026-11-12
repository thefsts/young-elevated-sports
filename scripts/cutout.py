"""Transparent-background cutout for the approved coach portrait.

Uses rembg (U2-Net) on the same 4:5 crop produced by scripts/coach-photos.mjs so
the cutout registers exactly with the JPEG exports. Output keeps the real
subject untouched - only the background is removed.
"""
import os
from rembg import remove, new_session
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public/media/coach/coach-young-portrait.jpg")
OUT = os.path.join(ROOT, "public/media/coach/coach-young-cutout.png")
OUT_SM = os.path.join(ROOT, "public/media/coach/coach-young-cutout-sm.png")

session = new_session("u2net_human_seg")
img = Image.open(SRC).convert("RGBA")
cut = remove(img, session=session, post_process_mask=True)
cut.save(OUT, "PNG", optimize=True)

small = cut.copy()
small.thumbnail((500, 625), Image.LANCZOS)
small.save(OUT_SM, "PNG", optimize=True)

for p in (OUT, OUT_SM):
    print(os.path.basename(p), os.path.getsize(p), Image.open(p).size)
