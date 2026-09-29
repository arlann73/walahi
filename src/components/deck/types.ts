export type ChapterId =
  | "journey"
  | "about"
  | "what-i-do"
  | "our-vibe"
  | "core-values"
  | "toolkit"
  | "the-work"
  | "certifications"
  | "the-roots"
  | "lets-talk";

export interface ChapterMeta {
  id: ChapterId;
  index: string; // e.g. "01"
  label: string; // e.g. "JOURNEY"
  thumbGradient: string;
  themeColor: string;
}

export const CHAPTERS: ChapterMeta[] = [
  {
    id: "journey",
    index: "01",
    label: "JOURNEY",
    thumbGradient: "from-red-600 via-rose-900 to-black",
    themeColor: "#E03426",
  },
  {
    id: "about",
    index: "02",
    label: "ABOUT",
    thumbGradient: "from-blue-950 via-slate-900 to-black",
    themeColor: "#0A0A0A",
  },
  {
    id: "what-i-do",
    index: "03",
    label: "WHAT I DO",
    thumbGradient: "from-amber-900 via-neutral-900 to-black",
    themeColor: "#0A0A0A",
  },
  {
    id: "our-vibe",
    index: "04",
    label: "OUR VIBE",
    thumbGradient: "from-orange-950 via-stone-900 to-black",
    themeColor: "#0A0A0A",
  },
  {
    id: "core-values",
    index: "05",
    label: "CORE VALUES",
    thumbGradient: "from-emerald-950 via-zinc-900 to-black",
    themeColor: "#0A0A0A",
  },
  {
    id: "toolkit",
    index: "06",
    label: "TOOLKIT",
    thumbGradient: "from-stone-700 via-neutral-900 to-black",
    themeColor: "#0A0A0A",
  },
  {
    id: "the-work",
    index: "07",
    label: "THE WORK",
    thumbGradient: "from-purple-950 via-slate-900 to-black",
    themeColor: "#0A0A0A",
  },
  {
    id: "certifications",
    index: "08",
    label: "CERTIFICATIONS",
    thumbGradient: "from-indigo-950 via-neutral-900 to-black",
    themeColor: "#0A0A0A",
  },
  {
    id: "the-roots",
    index: "09",
    label: "THE ROOTS",
    thumbGradient: "from-pink-950 via-stone-900 to-black",
    themeColor: "#0A0A0A",
  },
  {
    id: "lets-talk",
    index: "10",
    label: "LET'S TALK",
    thumbGradient: "from-cyan-950 via-slate-900 to-black",
    themeColor: "#0A0A0A",
  },
];
