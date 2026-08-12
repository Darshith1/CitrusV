#!/usr/bin/env python3
"""Generate CitrusV company overview PDF with branded layout."""

import json
import re
from collections import defaultdict
from datetime import datetime
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "CitrusV-Company-Overview.pdf"

# Brand colors
NAVY = colors.HexColor("#0D2240")
BLUE = colors.HexColor("#1E90FF")
ORANGE = colors.HexColor("#FF8C00")
SLATE = colors.HexColor("#475569")
LIGHT_BG = colors.HexColor("#F8FAFC")
WHITE = colors.white


def load_json(name: str):
    with open(ROOT / "src" / "content" / name, encoding="utf-8") as f:
        return json.load(f)


def parse_tools_manifest():
    text = (ROOT / "src" / "content" / "tools-manifest.ts").read_text(encoding="utf-8")
    categories = []
    for m in re.finditer(
        r'\{ id: "([^"]+)", name: "([^"]+)", description: "([^"]+)"',
        text,
    ):
        categories.append({"id": m.group(1), "name": m.group(2), "desc": m.group(3)})

    tools = []
    for m in re.finditer(
        r'\{ slug: "([^"]+)", title: "([^"]+)", description: "[^"]*", categoryId: "([^"]+)", status: "([^"]+)" \}',
        text,
    ):
        tools.append(
            {
                "slug": m.group(1),
                "title": m.group(2),
                "category": m.group(3),
                "status": m.group(4),
            }
        )
    return categories, tools


class BrandedDoc(BaseDocTemplate):
    def __init__(self, filename, **kwargs):
        super().__init__(filename, pagesize=letter, **kwargs)
        self.page_count = 0

        cover_frame = Frame(
            0.75 * inch, 0.75 * inch, letter[0] - 1.5 * inch, letter[1] - 1.5 * inch, id="cover"
        )
        content_frame = Frame(
            0.75 * inch, 1.0 * inch, letter[0] - 1.5 * inch, letter[1] - 1.75 * inch, id="content"
        )

        self.addPageTemplates(
            [
                PageTemplate(id="Cover", frames=[cover_frame], onPage=self._cover_page),
                PageTemplate(id="Content", frames=[content_frame], onPage=self._content_page),
            ]
        )

    def _cover_page(self, canvas, doc):
        canvas.saveState()
        w, h = letter
        canvas.setFillColor(NAVY)
        canvas.rect(0, h - 2.4 * inch, w, 2.4 * inch, fill=1, stroke=0)
        canvas.setFillColor(ORANGE)
        canvas.rect(0, h - 2.55 * inch, w, 0.15 * inch, fill=1, stroke=0)
        canvas.setFillColor(BLUE)
        canvas.circle(w - 1.2 * inch, h - 1.2 * inch, 0.9 * inch, fill=1, stroke=0)
        canvas.setFillColor(ORANGE)
        canvas.circle(w - 0.55 * inch, h - 0.55 * inch, 0.45 * inch, fill=1, stroke=0)
        canvas.setFillColor(WHITE)
        canvas.setFont("Helvetica-Bold", 36)
        canvas.drawString(0.85 * inch, h - 1.35 * inch, "CitrusV")
        canvas.setFont("Helvetica", 13)
        canvas.drawString(0.85 * inch, h - 1.75 * inch, "Company & Product Overview")
        canvas.restoreState()

    def _content_page(self, canvas, doc):
        canvas.saveState()
        w, h = letter
        canvas.setFillColor(NAVY)
        canvas.rect(0, h - 0.55 * inch, w, 0.55 * inch, fill=1, stroke=0)
        canvas.setFillColor(ORANGE)
        canvas.rect(0, h - 0.6 * inch, w, 0.05 * inch, fill=1, stroke=0)
        canvas.setFillColor(WHITE)
        canvas.setFont("Helvetica-Bold", 10)
        canvas.drawString(0.75 * inch, h - 0.38 * inch, "CitrusV")
        canvas.setFont("Helvetica", 9)
        canvas.drawRightString(w - 0.75 * inch, h - 0.38 * inch, f"Page {doc.page}")
        canvas.setStrokeColor(colors.HexColor("#E2E8F0"))
        canvas.line(0.75 * inch, 0.65 * inch, w - 0.75 * inch, 0.65 * inch)
        canvas.setFillColor(SLATE)
        canvas.setFont("Helvetica", 8)
        canvas.drawCentredString(
            w / 2,
            0.45 * inch,
            f"Generated {datetime.now().strftime('%B %d, %Y')}  |  hello@citrusv.com",
        )
        canvas.restoreState()


def build_styles():
    base = getSampleStyleSheet()
    return {
        "cover_title": ParagraphStyle(
            "cover_title",
            parent=base["Title"],
            fontSize=32,
            textColor=NAVY,
            spaceAfter=12,
            alignment=TA_LEFT,
            fontName="Helvetica-Bold",
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub",
            parent=base["Normal"],
            fontSize=14,
            textColor=SLATE,
            spaceAfter=8,
            leading=20,
        ),
        "cover_meta": ParagraphStyle(
            "cover_meta",
            parent=base["Normal"],
            fontSize=11,
            textColor=BLUE,
            spaceAfter=6,
        ),
        "h1": ParagraphStyle(
            "h1",
            parent=base["Heading1"],
            fontSize=20,
            textColor=NAVY,
            spaceBefore=18,
            spaceAfter=10,
            fontName="Helvetica-Bold",
        ),
        "h2": ParagraphStyle(
            "h2",
            parent=base["Heading2"],
            fontSize=14,
            textColor=BLUE,
            spaceBefore=14,
            spaceAfter=6,
            fontName="Helvetica-Bold",
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontSize=10,
            textColor=SLATE,
            leading=15,
            alignment=TA_JUSTIFY,
            spaceAfter=8,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            parent=base["Normal"],
            fontSize=10,
            textColor=SLATE,
            leading=14,
            leftIndent=14,
            bulletIndent=0,
            spaceAfter=4,
        ),
        "toc": ParagraphStyle(
            "toc",
            parent=base["Normal"],
            fontSize=10,
            textColor=NAVY,
            leading=16,
            spaceAfter=2,
        ),
        "small": ParagraphStyle(
            "small",
            parent=base["Normal"],
            fontSize=8,
            textColor=SLATE,
            leading=11,
        ),
    }


def section_bar(title: str, styles) -> list:
    data = [[Paragraph(f"<b>{title}</b>", styles["h1"])]]
    t = Table(data, colWidths=[6.5 * inch])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), LIGHT_BG),
                ("LINEBEFORE", (0, 0), (0, -1), 4, ORANGE),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return [t, Spacer(1, 10)]


def status_badge(status: str) -> str:
    colors_map = {"live": "#16a34a", "beta": "#2563eb", "comingSoon": "#94a3b8"}
    c = colors_map.get(status, "#64748b")
    label = {"live": "Live", "beta": "Beta", "comingSoon": "Soon"}.get(status, status)
    return f'<font color="{c}"><b>{label}</b></font>'


def main():
    services = load_json("services.json")
    partners = load_json("partners.json")
    careers = load_json("careers.json")
    tool_categories, tools = parse_tools_manifest()

    by_cat = defaultdict(list)
    for t in tools:
        by_cat[t["category"]].append(t)

    cat_names = {c["id"]: c["name"] for c in tool_categories}
    live = sum(1 for t in tools if t["status"] == "live")
    beta = sum(1 for t in tools if t["status"] == "beta")
    soon = sum(1 for t in tools if t["status"] == "comingSoon")

    styles = build_styles()
    story = []

    # Cover content (uses Cover template first)
    story.append(Spacer(1, 2.6 * inch))
    story.append(Paragraph("Complete Digital Partner", styles["cover_title"]))
    story.append(
        Paragraph(
            "Websites &middot; Custom Software &middot; IT Solutions &middot; Digital Marketing",
            styles["cover_sub"],
        )
    )
    story.append(Spacer(1, 0.3 * inch))
    story.append(
        Paragraph(
            "<b>Citrus AI</b> &nbsp;|&nbsp; <b>Citrus Playzone</b> &nbsp;|&nbsp; <b>88+ Free Online Tools</b>",
            styles["cover_meta"],
        )
    )
    story.append(Spacer(1, 0.5 * inch))
    story.append(
        Paragraph(
            "This document summarizes the CitrusV company website, services, products, "
            "tool library, technology stack, and how to run and configure the platform.",
            styles["body"],
        )
    )

    story.append(NextPageTemplate("Content"))
    story.append(PageBreak())

    # TOC
    story.extend(section_bar("Table of Contents", styles))
    toc_items = [
        "1. Company Overview",
        "2. What We Do — Services",
        "3. Partners & Clients",
        "4. Careers",
        "5. Website Pages & Navigation",
        "6. Citrus AI",
        "7. Citrus Playzone",
        "8. Online Tools Library (88 tools)",
        "9. Technology Stack",
        "10. Setup & Configuration",
        "11. Contact & Book a Call",
    ]
    for item in toc_items:
        story.append(Paragraph(item, styles["toc"]))
    story.append(PageBreak())

    # 1. Overview
    story.extend(section_bar("1. Company Overview", styles))
    story.append(
        Paragraph(
            "<b>CitrusV</b> is a modern technology company that builds websites and web applications, "
            "delivers custom software, and provides end-to-end IT solutions—from design and development "
            "to hosting, maintenance, security, and digital marketing.",
            styles["body"],
        )
    )
    story.append(Paragraph("<b>Our mission</b>", styles["h2"]))
    story.append(
        Paragraph(
            "Empower businesses with beautiful digital products, reliable IT infrastructure, "
            "and practical AI—so teams can focus on growth while we handle the technology.",
            styles["body"],
        )
    )
    story.append(Paragraph("<b>Core values</b>", styles["h2"]))
    for v in [
        "<b>Quality first</b> — Polished design, clean code, and dependable delivery.",
        "<b>Client partnership</b> — Transparent communication from discovery through support.",
        "<b>Innovation</b> — Citrus AI, free tools, and modern stacks that keep you ahead.",
        "<b>Accessibility</b> — Inclusive, responsive experiences for every user.",
    ]:
        story.append(Paragraph(f"• {v}", styles["bullet"]))

    # 2. Services
    story.append(PageBreak())
    story.extend(section_bar("2. What We Do — Services", styles))
    story.append(
        Paragraph(
            "CitrusV helps customers build any software solution and grow through digital marketing. "
            "Our process: <b>Discover → Design → Build → Launch → Support</b>.",
            styles["body"],
        )
    )
    svc_data = [["Service", "Description"]]
    for s in services:
        svc_data.append([s["title"], s["description"]])
    svc_table = Table(svc_data, colWidths=[1.8 * inch, 4.7 * inch], repeatRows=1)
    svc_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT_BG]),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(svc_table)

    # 3. Partners
    story.append(Spacer(1, 16))
    story.extend(section_bar("3. Partners & Clients", styles))
    for p in partners:
        story.append(
            Paragraph(
                f"<b>{p['name']}</b> <font color='#94a3b8'>({p['industry']})</font><br/>"
                f"<i>\"{p['testimonial']}\"</i>",
                styles["body"],
            )
        )

    # 4. Careers
    story.append(PageBreak())
    story.extend(section_bar("4. Careers", styles))
    story.append(Paragraph("<b>Why join CitrusV</b>", styles["h2"]))
    story.append(
        Paragraph(
            "We build meaningful products, use a modern stack, and invest in people who want to grow.",
            styles["body"],
        )
    )
    story.append(Paragraph("<b>Benefits</b>", styles["h2"]))
    for b in careers["benefits"]:
        story.append(Paragraph(f"• {b}", styles["bullet"]))

    story.append(Paragraph("<b>Open positions</b>", styles["h2"]))
    if careers["jobs"]:
        job_data = [["Role", "Location", "Type", "Department"]]
        for j in careers["jobs"]:
            job_data.append([j["title"], j["location"], j["type"], j["department"]])
        job_table = Table(job_data, colWidths=[1.6 * inch, 1.6 * inch, 1.1 * inch, 1.2 * inch])
        job_table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                    ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, -1), 8),
                    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT_BG]),
                    ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
                    ("TOPPADDING", (0, 0), (-1, -1), 6),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ]
            )
        )
        story.append(job_table)
        story.append(Spacer(1, 10))
        for j in careers["jobs"]:
            story.append(Paragraph(f"<b>{j['title']}</b> — {j['description']}", styles["body"]))
    else:
        story.append(
            Paragraph("We are always open to talent. Send your resume via the Contact page.", styles["body"])
        )

    # 5. Site map
    story.append(PageBreak())
    story.extend(section_bar("5. Website Pages & Navigation", styles))
    pages = [
        ("/", "Home", "Animated hero, services bento, featured tools, partner marquee, CTAs"),
        ("/about", "About", "Mission, values, team"),
        ("/what-we-do", "What We Do", "Full services, IT solutions, how we work timeline"),
        ("/partners", "Partners", "Client logos and testimonials"),
        ("/careers", "Careers", "Benefits, open roles, apply flow"),
        ("/contact", "Contact", "Form with interest dropdown"),
        ("/book", "Book a Call", "Google Calendar appointment + Google Meet"),
        ("/citrus-ai", "Citrus AI", "Streaming AI chat assistant"),
        ("/playzone", "Playzone", "Browser games hub"),
        ("/tools", "Tools Hub", "Search + 17 categories, 88 tools"),
        ("/privacy", "Privacy", "Privacy policy"),
        ("/terms", "Terms", "Terms of service"),
    ]
    page_data = [["Route", "Page", "Description"]]
    for row in pages:
        page_data.append(list(row))
    page_table = Table(page_data, colWidths=[1.1 * inch, 1.2 * inch, 4.2 * inch], repeatRows=1)
    page_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT_BG]),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(page_table)
    story.append(Spacer(1, 12))
    story.append(
        Paragraph(
            "<b>Header navigation:</b> About · What we do · Tools · Citrus AI · Playzone · Careers · Book a call",
            styles["body"],
        )
    )

    # 6. Citrus AI
    story.extend(section_bar("6. Citrus AI", styles))
    story.append(
        Paragraph(
            "Citrus AI is a capable general-purpose assistant integrated into the CitrusV website. "
            "It supports streaming chat, powers AI tools (rephraser, captions, hashtags, bios), "
            "and helps visitors explore ideas while showcasing CitrusV's AI integration expertise.",
            styles["body"],
        )
    )
    for item in [
        "Real-time streaming responses via /api/chat",
        "Configurable OpenAI or compatible API (OPENAI_API_KEY)",
        "Graceful handling when API key is not configured",
        "Safety disclaimers and responsible-use messaging",
    ]:
        story.append(Paragraph(f"• {item}", styles["bullet"]))

    # 7. Playzone
    story.extend(section_bar("7. Citrus Playzone", styles))
    games = [
        ("Snake", "/playzone/snake", "Classic arcade snake — keyboard controls"),
        ("Memory Match", "/playzone/memory", "Flip cards and find matching pairs"),
        ("Tic-Tac-Toe", "/playzone/tic-tac-toe", "Play against the computer"),
        ("Number Puzzle", "/playzone/number-puzzle", "Slide tiles to solve the puzzle"),
    ]
    for name, route, desc in games:
        story.append(Paragraph(f"<b>{name}</b> ({route}) — {desc}", styles["bullet"]))

    # 8. Tools
    story.append(PageBreak())
    story.extend(section_bar("8. Online Tools Library", styles))
    story.append(
        Paragraph(
            f"<b>{len(tools)} tools</b> across <b>{len(tool_categories)} categories</b> — "
            f"<font color='#16a34a'>{live} live</font>, "
            f"<font color='#2563eb'>{beta} beta</font>, "
            f"<font color='#94a3b8'>{soon} coming soon</font>. "
            "Most tools run in the browser for privacy. Status labels are honest: coming-soon tools "
            "show a clear roadmap page instead of fake functionality.",
            styles["body"],
        )
    )

    for cat in tool_categories:
        cat_tools = by_cat.get(cat["id"], [])
        if not cat_tools:
            continue
        story.append(Paragraph(f"<b>{cat['name']}</b> ({len(cat_tools)} tools)", styles["h2"]))
        story.append(Paragraph(cat["desc"], styles["small"]))
        rows = [["Tool", "Status", "Slug"]]
        for t in cat_tools:
            rows.append(
                [
                    t["title"],
                    Paragraph(status_badge(t["status"]), styles["small"]),
                    t["slug"],
                ]
            )
        tt = Table(rows, colWidths=[2.4 * inch, 0.7 * inch, 3.4 * inch], repeatRows=1)
        tt.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E2E8F0")),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, -1), 8),
                    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT_BG]),
                    ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#CBD5E1")),
                    ("TOPPADDING", (0, 0), (-1, -1), 4),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                    ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ]
            )
        )
        story.append(tt)
        story.append(Spacer(1, 8))

    # 9. Tech stack
    story.append(PageBreak())
    story.extend(section_bar("9. Technology Stack", styles))
    stack = [
        ("Framework", "Next.js 15 (App Router)"),
        ("UI", "React 19 + TypeScript"),
        ("Styling", "Tailwind CSS v4"),
        ("Animation", "Framer Motion"),
        ("Icons", "Lucide React"),
        ("AI", "OpenAI-compatible streaming API"),
        ("Fonts", "Montserrat (Google Fonts)"),
    ]
    stack_data = [["Layer", "Technology"]] + stack
    st = Table(stack_data, colWidths=[1.5 * inch, 5.0 * inch])
    st.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 10),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT_BG]),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(st)
    story.append(Spacer(1, 12))
    story.append(Paragraph("<b>Brand colors</b>", styles["h2"]))
    story.append(
        Paragraph(
            "Navy <font color='#0D2240'><b>#0D2240</b></font> &nbsp;|&nbsp; "
            "Blue <font color='#1E90FF'><b>#1E90FF</b></font> &nbsp;|&nbsp; "
            "Orange <font color='#FF8C00'><b>#FF8C00</b></font>",
            styles["body"],
        )
    )

    # 10. Setup
    story.extend(section_bar("10. Setup & Configuration", styles))
    story.append(Paragraph("<b>Local development</b>", styles["h2"]))
    story.append(Paragraph("npm install → npm run dev → open http://localhost:3000", styles["body"]))
    story.append(Paragraph("<b>Environment variables (.env.local)</b>", styles["h2"]))
    env_data = [
        ["Variable", "Purpose"],
        ["OPENAI_API_KEY", "Powers Citrus AI chat and AI-powered tools"],
        ["OPENAI_BASE_URL", "Optional compatible API base URL"],
        ["NEXT_PUBLIC_GOOGLE_APPOINTMENTS_URL", "Google Calendar booking link (includes Meet)"],
        ["NEXT_PUBLIC_CONTACT_EMAIL", "Contact email for mailto links"],
    ]
    et = Table(env_data, colWidths=[2.8 * inch, 3.7 * inch], repeatRows=1)
    et.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT_BG]),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(et)
    story.append(Spacer(1, 10))
    story.append(
        Paragraph(
            "<b>Google Meet booking setup:</b> Google Calendar → Create → Appointment schedule → "
            "enable Google Meet → copy shareable link into NEXT_PUBLIC_GOOGLE_APPOINTMENTS_URL.",
            styles["body"],
        )
    )

    # 11. Contact
    story.extend(section_bar("11. Contact & Book a Call", styles))
    story.append(
        Paragraph(
            "<b>Book a call</b> — Schedule a business conversation via Google Calendar. "
            "Each booking can include an automatic Google Meet link.",
            styles["body"],
        )
    )
    story.append(
        Paragraph(
            "<b>Contact</b> — Use the website contact form for project inquiries: websites, "
            "software, IT support, marketing, or careers.",
            styles["body"],
        )
    )
    story.append(
        Paragraph(
            "<b>Email:</b> hello@citrusv.com &nbsp;|&nbsp; <b>Website:</b> citrusv.com (when deployed)",
            styles["body"],
        )
    )
    story.append(Spacer(1, 20))
    closing = Table([[Paragraph("<b>Thank you for choosing CitrusV.</b><br/>We build. We support. We innovate.", styles["body"])]], colWidths=[6.5 * inch])
    closing.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), NAVY),
                ("TEXTCOLOR", (0, 0), (-1, -1), WHITE),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("TOPPADDING", (0, 0), (-1, -1), 20),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 20),
            ]
        )
    )
    story.append(closing)

    doc = BrandedDoc(str(OUT))
    doc.build(story)
    print(f"Created: {OUT}")
    print(f"Pages: {doc.page}")


if __name__ == "__main__":
    main()
