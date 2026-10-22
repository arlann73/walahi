export interface GalleryPhoto {
  url: string;
  title: string;
  caption: string;
  isWide?: boolean;
}

export interface FieldLogItem {
  id: string;
  slug: string;
  index: string;
  name: string;
  titlePart1: string;
  badge: string;
  titlePart2: string;
  company: string;
  location: string;
  role: string;
  project: string;
  period: string;
  since: string;
  duration?: string;
  tools: string[];
  scopeTitle?: string;
  responsibilities?: string[];
  organizations?: string[];
  majorEvents?: string[];
  categoryTag: "SUBSURFACE" | "EXPLORATION" | "ENGINEERING" | "IDENTITY";
  presentationImage?: string;
  presentationTitle?: string;
  presentationCaption?: string;
  galleryPhotos?: GalleryPhoto[];
}

export const FIELD_LOG_DATA: FieldLogItem[] = [
  // 1. FESCO (BRAND IDENTITY & PACKAGING DESIGN)
  {
    id: "fesco",
    slug: "fesco",
    index: "01",
    name: "Fesco",
    titlePart1: "Fesco",
    badge: "BRAND",
    titlePart2: "Design",
    company: "FESCO Bakery (Founder: Ibu Syahrini)",
    location: "Indonesia",
    role: "Brand & Packaging Designer",
    project: "Brand Identity, Typography & Visual Packaging Suite",
    period: "2024 – 2025",
    since: "2024",
    tools: ["Adobe Illustrator", "Photoshop", "Brand Architecture", "Packaging Design", "Creative Direction"],
    scopeTitle: "Brand Story & Guidelines",
    presentationImage: "/projects/fesco-brand-presentation.png",
    presentationTitle: "FESCO Brand Identity & Packaging Guidelines",
    presentationCaption: "Official brand dossier: brand origin story, custom fluid logotype system, color hierarchy, and confectionery product presentation.",
    responsibilities: [
      "About The Brand: FESCO dibangun dari hobi langsung oleh founder Ibu Syahrini dengan perhatian, rasa, dan ketulusan mendalam pada cokelat & brownies",
      "Naming: FES (inisial founder & pembuat, Ibu Syahrini) + CO (Company & Chocolate) — usaha yang tumbuh dari kecintaan pada cokelat",
      "Brand Philosophy: Menghadirkan kebahagiaan sederhana lewat brownies pekat dan lembut untuk menghangatkan momen berbagi di sekitar meja",
      "Color Palette: Vermilion Red (#FF1313) · Cocoa Brown (#76332D) · Warm Ivory (#FFFBEC) · Deep Chocolate (#373130)",
      "Visual Deliverables: Fluid ligature logotype, dynamic typography wrapping, sweet-treat packaging system & campaign collateral",
    ],
    categoryTag: "IDENTITY",
    galleryPhotos: [
      {
        url: "/projects/fesco-01-logotype.png",
        title: "Fesco Fluid Brandmark Logotype",
        caption: "Custom bold red logotype and fluid ligature design for modern confectionery branding.",
        isWide: true,
      },
      {
        url: "/projects/fesco-02-pastry-treat.png",
        title: "Pastry Campaign & Packaging Palette",
        caption: "Warm cocoa backdrop paired with chocolate chip almond pastry and brand messaging.",
        isWide: true,
      },
      {
        url: "/projects/fesco-03-brownie-special.png",
        title: "Fudgy Brownie Product Reveal",
        caption: "High-contrast dynamic typographic wrap showcasing premium almond chocolate brownies.",
        isWide: true,
      },
      {
        url: "/projects/fesco-04-product-showcase.png",
        title: "Duo Confectionery Split-Wave Showcase",
        caption: "Dual product hero composition featuring signature wavy color-blocked backdrop.",
        isWide: true,
      },
    ],
  },

  // 2. ARLAN (IDENTITY / DIGITAL GEOLOGY)
  {
    id: "arlan",
    slug: "arlan",
    index: "02",
    name: "Arlan",
    titlePart1: "Prastyo",
    badge: "CREATIVE",
    titlePart2: "Arlan",
    company: "Personal Practice & Technical Archive",
    location: "Sumatra, Indonesia",
    role: "Junior Geologist & Creative Technologist",
    project: "Interactive 3D Subsurface & Digital Geological Archive",
    period: "2024 – Present",
    since: "2024",
    tools: ["Three.js", "WebGL", "Next.js 16", "Tailwind CSS v4", "Blender"],
    scopeTitle: "Key Scope",
    responsibilities: [
      "Integrating geological subsurface datasets with real-time 3D WebGL visualization",
      "Designing responsive brutalist editorial design systems and kinetic shaders",
      "Digital archiving of geological fieldwork, certifications, and technical credentials",
    ],
    categoryTag: "IDENTITY",
    galleryPhotos: [
      {
        url: "/projects/arlan-01-hero-3d.jpg",
        title: "Hero 3D Stage & Kinetic Typography",
        caption: "Real-time 3D character viewport with interactive kinetic floor shader, status coordinates, and brutalist header.",
        isWide: true,
      },
      {
        url: "/projects/arlan-02-ascii-shader.jpg",
        title: "Optical Matrix ASCII Text Shader",
        caption: "Dynamic optical canvas shader decomposing photographic portraits into live interactive ASCII characters.",
        isWide: true,
      },
      {
        url: "/projects/arlan-03-subsurface-architecture.jpg",
        title: "Torn-Paper Dither Editorial Suite",
        caption: "Procedural torn-paper SVG dither masks paired with bold brutalist subsurface engineering capabilities.",
        isWide: true,
      },
      {
        url: "/projects/arlan-04-field-log-dossier.jpg",
        title: "Technical Field Log Dossier Modal",
        caption: "Minimalist archive modal with Locomotive-inspired typography, trapezoid outline badge, and 3D subsurface block.",
        isWide: true,
      },
    ],
  },

  // 3. GEOLOGICAL ENGINEERING (ITERA)
  {
    id: "geological-engineering",
    slug: "geological-engineering",
    index: "03",
    name: "Geological Engineering",
    titlePart1: "Geological",
    badge: "ENG",
    titlePart2: "Engineering",
    company: "Institut Teknologi Sumatera (ITERA)",
    location: "South Lampung, Indonesia",
    role: "Bachelor Graduate (S.T. · GPA 3.62 / 4.00)",
    project: "Undergraduate Degree & Geological Engineering Training",
    period: "Aug 2019 – May 2025",
    since: "2019",
    tools: ["Minescape 5.7", "Spry Scheduler", "ArcGIS 10.8", "RockWorks", "Global Mapper"],
    organizations: [
      "Laboratory Assistant: Hydrogeology, Geomorphology, and Geotechnics Labs",
      "Head of External Relations — MGEI Student Chapter ITERA (2022–2023)",
      "Member — HMGL Avanindra ITERA",
    ],
    majorEvents: [
      "Regional Geological Mapping & Structural Cross-Sections (Sumatra)",
      "Coal Mine Planning Certification (Initambang Course)",
      "Pengawas Operasional Pertama (Pra POP) Training",
      "Annual Geological Field Excursions & Industry Company Visits",
    ],
    categoryTag: "ENGINEERING",
    galleryPhotos: [
      {
        url: "/projects/geological-engineering-01-riverbed-mapping.jpg",
        title: "Regional Geological Mapping & Outcrop Analysis",
        caption: "Field orientation, lithological outcrop observation, and structural data collection along Sumatra river transects.",
        isWide: false,
      },
      {
        url: "/projects/geological-engineering-02-rapids-fieldwork.jpg",
        title: "Sumatra Rainforest Field Excursion",
        caption: "Field mapping campaign, stratigraphy measurement, and sedimentological fieldwork in South Sumatra terrain.",
        isWide: false,
      },
    ],
  },

  // 4. UNDERGRADUATE RESEARCHER (PT PHR)
  {
    id: "undergraduate-researcher",
    slug: "undergraduate-researcher",
    index: "04",
    name: "Undergraduate Researcher",
    titlePart1: "Undergraduate",
    badge: "RES",
    titlePart2: "Researcher",
    company: "PT Pertamina Hulu Rokan",
    location: "Pekanbaru, Indonesia",
    role: "Student Intern",
    project: "Subsurface Stratigraphy Analysis",
    period: "Feb 2023 – Apr 2023",
    since: "2023",
    tools: ["Interactive Petrophysics", "ArcGIS 10.8", "Global Mapper", "Biostratigraphic Charts"],
    scopeTitle: "Key Responsibilities",
    responsibilities: [
      "Rock age zoning identification in Central Sumatra Basin wells using planktonic foraminifera (Blow, 1969) & nannoplankton (Martini, 1971)",
      "Biostratigraphic and electrofacies analyses to determine depositional environments and subsurface stratigraphy",
      "Transgressive-regressive sequence stratigraphy analysis (Embry, 1993) and correlation across 14 exploration wells",
      "Reconstruction of paleogeographic and depositional history of the Central Sumatra Basin",
      "Stratigraphic correlation and basin evolution interpretation to support exploration studies",
    ],
    categoryTag: "SUBSURFACE",
    galleryPhotos: [
      {
        url: "/projects/undergraduate-01-microscope.jpg",
        title: "Biostratigraphic Laboratory Research",
        caption: "Microscopic inspection of planktonic foraminifera & nannoplankton for relative age zonation (Blow, 1969; Martini, 1971).",
        isWide: false,
      },
      {
        url: "/projects/undergraduate-02-landmark.jpg",
        title: "PT Pertamina Hulu Rokan Base",
        caption: "Field orientation & research assignment at PT Pertamina Hulu Rokan, Rumbai, Central Sumatra Basin.",
        isWide: false,
      },
      {
        url: "/projects/undergraduate-03-core-team.jpg",
        title: "Subsurface Core Repository Team",
        caption: "Sedimentological & sequence stratigraphic evaluation with geological mentorship team across 14 exploration well cores.",
        isWide: true,
      },
      {
        url: "/projects/undergraduate-04-core-facility.jpg",
        title: "Core Warehouse & Stratigraphic Inspection",
        caption: "Direct subsurface core examination and reservoir rock sampling with laboratory technical specialists.",
        isWide: false,
      },
    ],
  },

  // 5. WORK PRACTICE (PT PHR)
  {
    id: "work-practice",
    slug: "work-practice",
    index: "05",
    name: "Work Practice",
    titlePart1: "Exploration",
    badge: "EXP",
    titlePart2: "Work Practice",
    company: "PT Pertamina Hulu Rokan",
    location: "Pekanbaru, Indonesia",
    role: "Student Intern",
    project: "Well Log Petrophysics & Core Reservoir Evaluation",
    period: "Nov 2022 – Dec 2022",
    since: "2022",
    tools: ["Well Log Analysis", "Core Description Suite", "RockWorks", "ArcGIS", "Optical Microscopy"],
    scopeTitle: "Key Responsibilities",
    responsibilities: [
      "Well log data analysis focusing on porosity, water saturation, and permeability parameters for hydrocarbon zones",
      "Core description and macroscopic measurements to support reservoir quality evaluation",
      "Preparation of core microfossil samples (foraminifera and nannoplankton) for laboratory inspection",
      "Biostratigraphic relative age zonation methods (Blow, 1969; Martini, 1971)",
      "Sedimentary environment interpretation based on fossil assemblages and electrofacies patterns",
      "Stratigraphic correlation and paleogeographic reconstruction for exploration studies",
    ],
    categoryTag: "EXPLORATION",
    galleryPhotos: [
      {
        url: "/projects/work-practice-01-core-logging.jpg",
        title: "Core Logging & Reservoir Evaluation",
        caption: "Direct macroscopic core description, lithology logging, and sample measurements at PT PHR core repository.",
        isWide: false,
      },
      {
        url: "/projects/work-practice-02-pertamina-lobby.jpg",
        title: "PT Pertamina Hulu Rokan Headquarters",
        caption: "Exploration work practice internship assignment in Pekanbaru, Central Sumatra Basin.",
        isWide: false,
      },
    ],
  },
];
