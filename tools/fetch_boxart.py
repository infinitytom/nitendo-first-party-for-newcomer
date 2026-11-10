#!/usr/bin/env python3
"""下载每部推荐游戏的封面图（取自英文维基百科对应条目的主图）。

用法：在仓库根目录执行  pip install pillow && python tools/fetch_boxart.py
游戏列表来自 assets/data.js 里每个入坑作品的 w 字段（英文维基百科条目名）。
结果：图片保存为 images/box/<条目名转写>.jpg，来源信息写入 assets/boxart.js。
GitHub Actions 会在 data.js 或本脚本变化时自动运行。
"""
import io, unicodedata, json, os, re, sys, time, urllib.error, urllib.parse, urllib.request
from PIL import Image

API = "https://en.wikipedia.org/w/api.php"
UA = {"User-Agent": "NintendoGuideBoxart/1.0 (https://github.com/infinitytom/nitendo-first-party-for-newcomer)"}

def slug(t):
    t = "".join(c for c in unicodedata.normalize("NFD", t.lower()) if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-")

def get(url):
    for attempt in range(5):
        time.sleep(1.5 + attempt * 15)
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code not in (429, 503) or attempt == 4: raise
            print(f"  {e.code}，稍后重试…")

def main():
    src = open("assets/data.js", encoding="utf-8").read()
    titles = list(dict.fromkeys(re.findall(r'\bw:"((?:[^"\\]|\\.)+)"', src)))
    titles = [t.replace('\\"', '"') for t in titles]
    os.makedirs("images/box", exist_ok=True)
    out = {}
    for i in range(0, len(titles), 40):
        batch = titles[i:i + 40]
        q = dict(action="query", format="json", prop="pageimages|info", inprop="url", piprop="thumbnail|name",
                 pithumbsize="480", pilicense="any", redirects="1", titles="|".join(batch))
        d = json.loads(get(API + "?" + urllib.parse.urlencode(q)))["query"]
        alias = {x["from"]: x["to"] for x in d.get("normalized", []) + d.get("redirects", [])}
        pages = {p["title"]: p for p in d.get("pages", {}).values()}
        for t in batch:
            final = t
            for _ in range(3):
                final = alias.get(final, final)
            p = pages.get(final)
            if not p or "thumbnail" not in p:
                print(f"[跳过] {t}：没有找到主图"); continue
            try:
                im = Image.open(io.BytesIO(get(p["thumbnail"]["source"])))
                if im.mode in ("RGBA", "LA", "P"):
                    im = im.convert("RGBA"); bg = Image.new("RGB", im.size, "white"); bg.paste(im, mask=im.split()[-1]); im = bg
                path = f"images/box/{slug(t)}.jpg"
                im.convert("RGB").save(path, "JPEG", quality=86, optimize=True)
                out[slug(t)] = {"file": path, "title": final, "url": p.get("fullurl", "")}
                print(f"[完成] {t} → {p.get('pageimage')}")
            except Exception as e:
                print(f"[失败] {t}：{e}", file=sys.stderr)
    with open("assets/boxart.js", "w", encoding="utf-8") as f:
        f.write("// 由 tools/fetch_boxart.py 自动生成，请勿手改。\nwindow.BOXART = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
    print(f"共 {len(out)}/{len(titles)}")

if __name__ == "__main__":
    main()
