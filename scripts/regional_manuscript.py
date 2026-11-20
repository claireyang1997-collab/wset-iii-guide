"""Compile the shared Markdown structure for regional chapters."""

import json
from pathlib import Path


def build_regional_manuscript(source, variable):
    root = Path(__file__).resolve().parents[1]
    content = root / "content"
    manuscript = (content / f"{source}.md").read_text(encoding="utf-8")
    units = []
    for block in manuscript.strip().removeprefix("# ").split("\n# "):
        header, body = block.split("\n", 1)
        route, title, desc, pages = header.split(" | ")
        chapter, slug = route.split("/")
        intro, *sections = body.strip().split("\n## ")
        compiled = []
        for section in sections:
            heading, lines = section.split("\n", 1)
            items = []
            for line in lines.splitlines():
                if line.startswith("| "):
                    row = [cell.strip() for cell in line.strip("|").split("|")]
                    if items and "table" in items[-1]:
                        items[-1]["table"]["rows"].append(row)
                    else:
                        items.append({"table": {"headers": row, "rows": []}})
                elif line.startswith("@"):
                    items.append({"figure": line[1:]})
                elif line:
                    items.append({"text": line})
            compiled.append({"title": heading, "items": items})
        units.append(dict(chapter=int(chapter), id=slug, title=title, desc=desc,
                          pages=pages, intro=intro, sections=compiled))

    record = json.loads((content / f"{source}-sources.json").read_text(encoding="utf-8"))
    record["units"] = units
    data = json.dumps(record, ensure_ascii=False, indent=1)
    (root / f"dist/{source}-data.js").write_text(f"const {variable} = {data};\n", encoding="utf-8")
