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
}

export const FIELD_LOG_DATA: FieldLogItem[] = [
  // 1. ARLAN (IDENTITY / DIGITAL GEOLOGY)
  {
    id: "arlan",
    slug: "arlan",
    index: "01",
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
  },

  // 2. GEOLOGICAL ENGINEERING (ITERA)
  {
    id: "geological-engineering",
    slug: "geological-engineering",
    index: "02",
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
  },

  // 3. UNDERGRADUATE RESEARCHER (PT PHR)
  {
    id: "undergraduate-researcher",
    slug: "undergraduate-researcher",
    index: "03",
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
  },

  // 4. WORK PRACTICE (PT PHR)
  {
    id: "work-practice",
    slug: "work-practice",
    index: "04",
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
  },
];
