#!/usr/bin/env python3
"""从 Wikimedia Commons 下载自由许可（公有领域 / CC0 / CC BY / CC BY-SA）的主机照片。

用法：在仓库根目录执行  python tools/fetch_images.py
结果：图片保存到 images/hw-<平台>.<扩展名>，署名信息写入 assets/photos.js（页脚会自动列出来源）。
GitHub Actions 会在本文件变化时自动运行；也可以在 Actions 页面手动触发。
"""
import json, os, re, sys, time, urllib.error, urllib.parse, urllib.request, html

API = "https://commons.wikimedia.org/w/api.php"
UA = {"User-Agent": "NintendoGuideImageFetch/1.1 (https://github.com/infinitytom/nitendo-first-party-for-newcomer)"}
OK = re.compile(r"^(public domain|pd|cc0|cc[ -]by(-sa)?[ -]\d)", re.I)

# 每个平台按顺序尝试的文件名；都不存在时用 search 关键词搜索。
SLOTS = {
 "fc":     (["Nintendo-Famicom-Console-Set-FL.png", "NES-Console-Set.png", "NES-Console-Set.jpg"], "Famicom console Evan-Amos"),
 "gb":     (["Game-Boy-FL.png", "Game-Boy-FL.jpg"], "Evan-Amos Game Boy original"),
 "sfc":    (["Nintendo-Super-Famicom-Set-FL.png", "Super-Famicom-Console-Set.jpg", "SNES-Mod1-Console-Set.png", "SNES-Mod1-Console-Set.jpg"], "Evan-Amos Super Famicom console"),
 "n64":    (["Nintendo-64-wController-L.png", "N64-Console-Set.png", "Nintendo-64-wController-L.jpg"], "Evan-Amos Nintendo 64 console"),
 "gba":    (["Nintendo-Game-Boy-Advance-Purple-FL.png", "Nintendo-Game-Boy-Advance-Purple-FL.jpg", "Game-Boy-Advance-Purple-FL.png"], "Evan-Amos Game Boy Advance"),
 "gc":     (["GameCube-Set.png", "GameCube-Set.jpg", "GameCube-Console-Set.png"], "Evan-Amos GameCube console"),
 "nds":    (["Nintendo-DS-Lite-Black-Open.png", "Nintendo-DS-Lite-Black-Open.jpg", "Nintendo-DS-Fat-Blue.png", "Nintendo-DS-Fat-Blue.jpg"], "Evan-Amos Nintendo DS"),
 "wii":    (["Wii-console.png", "Wii-console.jpg", "Wii-Console.png"], "Evan-Amos Wii console"),
 "3ds":    (["Nintendo-3DS-AquaOpen.png", "Nintendo-3DS-AquaOpen.jpg"], "Evan-Amos Nintendo 3DS"),
 "wiiu":   (["Wii-U-Console-Set-Blk.png", "Wii U Console and Gamepad.png", "Wii-U-Console-Set-Blk.jpg"], "Evan-Amos Wii U console"),
 "switch": (["Nintendo-Switch-Console-Docked-wJoyConRB.jpg", "Nintendo-Switch-wJoyCons-BlRd-Standing-FL.jpg", "Nintendo Switch Console.png"], "Evan-Amos Nintendo Switch console"),
 "switch2":(["Nintendo Switch 2 20250605 HOF4739 RAW-Export.png"], "Nintendo Switch 2 console"),
}

def get(url):
    """带限速与 429 重试的请求。"""
    for attempt in range(5):
        time.sleep(2 + attempt * 15)
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code not in (429, 503) or attempt == 4: raise
            print(f"  {e.code}，稍后重试…")

def api(**params):
    params.update(format="json", prop="imageinfo", iiprop="url|extmetadata", iiurlwidth="500", action="query")
    data = json.loads(get(API + "?" + urllib.parse.urlencode(params)))
    if "error" in data: print("  API 错误：", data["error"].get("info"))
    return data.get("query", {}).get("pages", {})

def clean(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", s or ""))).strip()

def pick(pages, order=None):
    items = [p for p in pages.values() if "imageinfo" in p]
    if order:
        norm = lambda t: t.replace("_", " ").lower()
        items.sort(key=lambda p: order.index(norm(p["title"])) if norm(p["title"]) in order else 99)
    else:
        items.sort(key=lambda p: p.get("index", 0))
    for p in items:
        ii = p["imageinfo"][0]; meta = ii.get("extmetadata", {})
        lic = clean(meta.get("LicenseShortName", {}).get("value"))
        if not OK.match(lic): continue
        if not re.search(r"\.(png|jpe?g)$", ii["url"], re.I): continue
        return {"title": p["title"], "thumb": ii.get("thumburl") or ii["url"], "url": ii["descriptionurl"],
                "artist": clean(meta.get("Artist", {}).get("value"))[:60] or "未署名", "license": lic}
    return None

def main():
    os.makedirs("images", exist_ok=True)
    out = {}
    for slot, (names, query) in SLOTS.items():
        hit = None
        try:
            if names:
                titles = ["File:" + n for n in names]
                hit = pick(api(titles="|".join(titles)), [t.replace("_", " ").lower() for t in titles])
            if not hit:
                hit = pick(api(generator="search", gsrnamespace="6", gsrlimit="15", gsrsearch=query + " filetype:bitmap"))
            if not hit:
                print(f"[{slot}] 没有找到符合许可的图片"); continue
            ext = ".png" if hit["thumb"].lower().endswith(".png") else ".jpg"
            path = f"images/hw-{slot}{ext}"
            with open(path, "wb") as f:
                f.write(get(hit["thumb"]))
            out[slot] = {"file": path, "title": hit["title"], "artist": hit["artist"], "license": hit["license"], "url": hit["url"]}
            print(f"[{slot}] {hit['title']} — {hit['artist']} — {hit['license']}")
        except Exception as e:
            print(f"[{slot}] 失败：{e}", file=sys.stderr)
    with open("assets/photos.js", "w", encoding="utf-8") as f:
        f.write("// 由 tools/fetch_images.py 自动生成，请勿手改。\nwindow.PHOTOS = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
    print(f"完成：{len(out)}/{len(SLOTS)}")

if __name__ == "__main__":
    main()
