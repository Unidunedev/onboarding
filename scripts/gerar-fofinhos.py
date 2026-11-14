"""Gera avatares fofinhos de bichinhos (SVG) para public/avatares/fofinhos/."""
import sys
from pathlib import Path

OUT = Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)
INK = "#3a2a28"
BLUSH = "#ff8fa3"

def olhos(y=64, dx=13, cor=INK):
    return (f'<circle cx="{60-dx}" cy="{y}" r="4.6" fill="{cor}"/><circle cx="{60+dx}" cy="{y}" r="4.6" fill="{cor}"/>'
            f'<circle cx="{60-dx+1.6}" cy="{y-1.8}" r="1.5" fill="#fff"/><circle cx="{60+dx+1.6}" cy="{y-1.8}" r="1.5" fill="#fff"/>')

def bochechas(y=74, dx=22):
    return (f'<ellipse cx="{60-dx}" cy="{y}" rx="6" ry="3.6" fill="{BLUSH}" opacity=".7"/>'
            f'<ellipse cx="{60+dx}" cy="{y}" rx="6" ry="3.6" fill="{BLUSH}" opacity=".7"/>')

def boca(y=74):
    return f'<path d="M54 {y} q3 4 6 0 q3 4 6 0" fill="none" stroke="{INK}" stroke-width="2.2" stroke-linecap="round"/>'

def nariz(y=70, cor=INK):
    return f'<ellipse cx="60" cy="{y}" rx="3.2" ry="2.2" fill="{cor}"/>'

def svg(bg, corpo):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">'
            f'<rect width="120" height="120" rx="24" fill="{bg}"/>{corpo}</svg>')

def coelho(cor="#fff", interno="#ffc2d1", bg="#ffe3ec"):
    return svg(bg, f'<ellipse cx="46" cy="34" rx="9" ry="26" fill="{cor}" stroke="{INK}" stroke-width="2"/>'
        f'<ellipse cx="74" cy="34" rx="9" ry="26" fill="{cor}" stroke="{INK}" stroke-width="2"/>'
        f'<ellipse cx="46" cy="36" rx="4" ry="17" fill="{interno}"/><ellipse cx="74" cy="36" rx="4" ry="17" fill="{interno}"/>'
        f'<ellipse cx="60" cy="74" rx="34" ry="30" fill="{cor}" stroke="{INK}" stroke-width="2"/>'
        + olhos(70) + bochechas(80) + nariz(76, "#ff8fa3") + boca(80))

def gato(cor="#ffb86b", bg="#fff1dc", listras=True, escuro=False):
    traco = "#f3e8ff" if escuro else INK
    l = (f'<path d="M50 48 l3 8 M60 46 v9 M70 48 l-3 8" stroke="{INK}" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>' if listras else "")
    return svg(bg, f'<path d="M30 50 L34 20 L52 40 Z" fill="{cor}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>'
        f'<path d="M90 50 L86 20 L68 40 Z" fill="{cor}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>'
        f'<ellipse cx="60" cy="68" rx="34" ry="30" fill="{cor}" stroke="{INK}" stroke-width="2"/>{l}'
        + olhos(66, cor="#ffd84d" if escuro else INK) + bochechas(76) + nariz(72, "#ff8fa3")
        + boca(76).replace(f'stroke="{INK}"', f'stroke="{traco}"')
        + f'<path d="M24 70 h14 M24 77 h14 M96 70 h-14 M96 77 h-14" stroke="{traco}" stroke-width="1.6" stroke-linecap="round" opacity=".6"/>')

def urso(cor="#c49a6c", focinho="#f1dcc0", bg="#f6ead9"):
    return svg(bg, f'<circle cx="32" cy="38" r="13" fill="{cor}" stroke="{INK}" stroke-width="2"/><circle cx="88" cy="38" r="13" fill="{cor}" stroke="{INK}" stroke-width="2"/>'
        f'<circle cx="32" cy="38" r="6" fill="{focinho}"/><circle cx="88" cy="38" r="6" fill="{focinho}"/>'
        f'<ellipse cx="60" cy="66" rx="36" ry="33" fill="{cor}" stroke="{INK}" stroke-width="2"/>'
        f'<ellipse cx="60" cy="78" rx="15" ry="11" fill="{focinho}"/>'
        + olhos(62, 14) + bochechas(74, 25) + nariz(74) + boca(79))

def panda():
    return svg("#e6f4ea", f'<circle cx="32" cy="38" r="13" fill="{INK}"/><circle cx="88" cy="38" r="13" fill="{INK}"/>'
        f'<ellipse cx="60" cy="66" rx="36" ry="33" fill="#fff" stroke="{INK}" stroke-width="2"/>'
        f'<ellipse cx="45" cy="63" rx="9" ry="11" fill="{INK}" transform="rotate(-20 45 63)"/><ellipse cx="75" cy="63" rx="9" ry="11" fill="{INK}" transform="rotate(20 75 63)"/>'
        + olhos(62, 14, "#fff").replace('fill="#fff"/>', f'fill="{INK}"/>', 0)
        + f'<circle cx="46" cy="62" r="3.4" fill="#fff"/><circle cx="74" cy="62" r="3.4" fill="#fff"/>'
        + bochechas(76, 25) + nariz(74) + boca(79))

def raposa():
    return svg("#fff0e0", f'<path d="M26 54 L30 18 L52 42 Z" fill="#ff8a3d" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>'
        f'<path d="M94 54 L90 18 L68 42 Z" fill="#ff8a3d" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>'
        f'<path d="M33 46 L34 28 L46 42 Z M87 46 L86 28 L74 42 Z" fill="{INK}" opacity=".75"/>'
        f'<path d="M24 60 Q60 30 96 60 Q92 96 60 102 Q28 96 24 60 Z" fill="#ff8a3d" stroke="{INK}" stroke-width="2"/>'
        f'<path d="M30 72 Q46 70 60 92 Q74 70 90 72 Q86 96 60 102 Q34 96 30 72 Z" fill="#fff"/>'
        + olhos(64, 14) + bochechas(76, 24) + nariz(86) + f'<path d="M57 91 q3 3 6 0" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>')

def sapo():
    return svg("#e3f6d8", f'<circle cx="40" cy="42" r="14" fill="#7cc96b" stroke="{INK}" stroke-width="2"/><circle cx="80" cy="42" r="14" fill="#7cc96b" stroke="{INK}" stroke-width="2"/>'
        f'<circle cx="40" cy="42" r="8" fill="#fff"/><circle cx="80" cy="42" r="8" fill="#fff"/>'
        f'<circle cx="41" cy="43" r="4.5" fill="{INK}"/><circle cx="81" cy="43" r="4.5" fill="{INK}"/><circle cx="42.5" cy="41" r="1.4" fill="#fff"/><circle cx="82.5" cy="41" r="1.4" fill="#fff"/>'
        f'<ellipse cx="60" cy="74" rx="38" ry="28" fill="#7cc96b" stroke="{INK}" stroke-width="2"/>'
        + bochechas(78, 26) + f'<path d="M44 78 Q60 92 76 78" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')

def cachorro(cor="#e8c39e", orelha="#9b6a43", bg="#fdf0e2"):
    return svg(bg, f'<ellipse cx="60" cy="66" rx="33" ry="32" fill="{cor}" stroke="{INK}" stroke-width="2"/>'
        f'<ellipse cx="29" cy="60" rx="11" ry="22" fill="{orelha}" stroke="{INK}" stroke-width="2" transform="rotate(18 29 60)"/>'
        f'<ellipse cx="91" cy="60" rx="11" ry="22" fill="{orelha}" stroke="{INK}" stroke-width="2" transform="rotate(-18 91 60)"/>'
        f'<ellipse cx="60" cy="80" rx="15" ry="11" fill="#fff" opacity=".85"/>'
        + olhos(62, 13) + bochechas(76, 23) + f'<ellipse cx="60" cy="74" rx="5" ry="3.6" fill="{INK}"/>' + boca(80)
        + f'<path d="M57 83 q3 7 6 0" fill="#ff8fa3" stroke="{INK}" stroke-width="1.4"/>')

def pinguim():
    return svg("#e0f0ff", f'<ellipse cx="60" cy="64" rx="36" ry="36" fill="#2f3a4a" stroke="{INK}" stroke-width="2"/>'
        f'<path d="M34 66 Q36 40 60 52 Q84 40 86 66 Q84 92 60 94 Q36 92 34 66 Z" fill="#fff"/>'
        + olhos(64, 12) + bochechas(76, 20) + f'<path d="M54 72 L66 72 L60 80 Z" fill="#ffb84d" stroke="{INK}" stroke-width="1.6" stroke-linejoin="round"/>')

def pintinho():
    return svg("#fff8d6", f'<path d="M56 30 q2 -10 6 -2 q4 -8 4 4" fill="#ffd84d" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>'
        f'<circle cx="60" cy="66" r="34" fill="#ffd84d" stroke="{INK}" stroke-width="2"/>'
        + olhos(62, 13) + bochechas(74, 23) + f'<path d="M53 70 L67 70 L60 78 Z" fill="#ff9a3d" stroke="{INK}" stroke-width="1.6" stroke-linejoin="round"/>')

def porquinho():
    return svg("#ffe6ef", f'<path d="M30 46 L32 24 L50 38 Z" fill="#ffb3c7" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>'
        f'<path d="M90 46 L88 24 L70 38 Z" fill="#ffb3c7" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>'
        f'<ellipse cx="60" cy="66" rx="36" ry="32" fill="#ffb3c7" stroke="{INK}" stroke-width="2"/>'
        f'<ellipse cx="60" cy="76" rx="12" ry="8" fill="#ff8fab" stroke="{INK}" stroke-width="2"/>'
        f'<ellipse cx="56" cy="76" rx="2" ry="3" fill="{INK}"/><ellipse cx="64" cy="76" rx="2" ry="3" fill="{INK}"/>'
        + olhos(60, 15) + bochechas(70, 27))

def coala():
    return svg("#e9eef3", f'<circle cx="28" cy="46" r="17" fill="#9aa5b1" stroke="{INK}" stroke-width="2"/><circle cx="92" cy="46" r="17" fill="#9aa5b1" stroke="{INK}" stroke-width="2"/>'
        f'<circle cx="28" cy="46" r="9" fill="#f2e6ee"/><circle cx="92" cy="46" r="9" fill="#f2e6ee"/>'
        f'<ellipse cx="60" cy="68" rx="34" ry="31" fill="#9aa5b1" stroke="{INK}" stroke-width="2"/>'
        + olhos(62, 15) + bochechas(76, 25) + f'<ellipse cx="60" cy="74" rx="7" ry="9" fill="{INK}"/>')

def rato():
    return svg("#f0ecf7", f'<circle cx="34" cy="40" r="16" fill="#c9c3d6" stroke="{INK}" stroke-width="2"/><circle cx="86" cy="40" r="16" fill="#c9c3d6" stroke="{INK}" stroke-width="2"/>'
        f'<circle cx="34" cy="40" r="9" fill="#ffc2d1"/><circle cx="86" cy="40" r="9" fill="#ffc2d1"/>'
        f'<ellipse cx="60" cy="70" rx="32" ry="29" fill="#c9c3d6" stroke="{INK}" stroke-width="2"/>'
        + olhos(66, 12) + bochechas(78, 22) + nariz(76, "#ff8fa3") + boca(80)
        + f'<path d="M30 76 h14 M30 82 h14 M90 76 h-14 M90 82 h-14" stroke="{INK}" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>')

def leao():
    juba = "".join(f'<circle cx="{60+38*__import__("math").cos(a)}" cy="{64+38*__import__("math").sin(a)}" r="13" fill="#d9822b"/>'
                   for a in [i*0.5236 for i in range(12)])
    return svg("#fff2d9", juba + f'<circle cx="60" cy="64" r="32" fill="#ffc96b" stroke="{INK}" stroke-width="2"/>'
        f'<circle cx="38" cy="38" r="7" fill="#ffc96b" stroke="{INK}" stroke-width="2"/><circle cx="82" cy="38" r="7" fill="#ffc96b" stroke="{INK}" stroke-width="2"/>'
        + olhos(60, 12) + bochechas(72, 21) + nariz(70) + boca(75))

def ovelha():
    lã = "".join(f'<circle cx="{x}" cy="{y}" r="12" fill="#fff" stroke="{INK}" stroke-width="2"/>'
                 for x, y in [(38,40),(52,32),(68,32),(82,40),(30,56),(90,56)])
    return svg("#eef6ff", lã + f'<ellipse cx="60" cy="70" rx="26" ry="27" fill="#5b4a46" stroke="{INK}" stroke-width="2"/>'
        f'<ellipse cx="30" cy="70" rx="10" ry="6" fill="#5b4a46" transform="rotate(25 30 70)"/><ellipse cx="90" cy="70" rx="10" ry="6" fill="#5b4a46" transform="rotate(-25 90 70)"/>'
        + "".join(f'<circle cx="{x}" cy="{y}" r="9" fill="#fff"/>' for x, y in [(48,46),(60,42),(72,46)])
        + olhos(68, 11, "#fff").replace(f'r="1.5" fill="#fff"', f'r="1.5" fill="{INK}"')
        + bochechas(80, 18) + f'<path d="M55 84 q5 4 10 0" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>')

def hamster():
    return svg("#fff4e6", f'<circle cx="36" cy="40" r="10" fill="#f0a75b" stroke="{INK}" stroke-width="2"/><circle cx="84" cy="40" r="10" fill="#f0a75b" stroke="{INK}" stroke-width="2"/>'
        f'<ellipse cx="60" cy="70" rx="38" ry="32" fill="#f0a75b" stroke="{INK}" stroke-width="2"/>'
        f'<ellipse cx="60" cy="80" rx="26" ry="18" fill="#fff3e3"/>'
        + olhos(64, 14) + bochechas(76, 27) + nariz(74, "#ff8fa3") + boca(78))

ANIMAIS = [
    coelho(), gato(), urso(), panda(), raposa(), sapo(), cachorro(), pinguim(),
    pintinho(), porquinho(), coala(), rato(), leao(), ovelha(), hamster(),
    coelho("#d9c2a7", "#ffc2d1", "#f3ece4"), gato("#8f8a9e", "#ece9f6", False), urso("#f2f0ea", "#fff", "#e8f1f8"),
    gato("#3a3340", "#f3e8ff", False, True), cachorro("#fff", "#c9a27e", "#eaf6f0"),
]
for i, conteudo in enumerate(ANIMAIS, 1):
    (OUT / f"{i:02d}.svg").write_text(conteudo, encoding="utf-8")
print(len(ANIMAIS))
