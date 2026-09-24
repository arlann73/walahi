export interface CameraShotPreset {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

export interface JourneyMilestone {
  id: string;
  stepNumber: string; // e.g. "01"
  year: string;
  badge: string; // e.g. "ACADEMIC COMMENCEMENT"
  title: string;
  narrative: string;
  camera: CameraShotPreset;
}

export interface TimelineItem {
  id: string;
  year: string;
  company: string;
  role: string;
  title?: string;
  description: string;
  image?: string;
  aspect?: string;
}

// Initial Hero Camera (Step 0) & Reset Target
export const INITIAL_CAMERA_PRESET: CameraShotPreset = {
  position: [0, 1.16, 5.0],
  lookAt: [0, 0.88, -0.6],
  fov: 32,
};

// Cinema Timeline Camera Default (Step 1) — Starting waypoint of continuous camera journey
export const TIMELINE_CAMERA_PRESET: CameraShotPreset = {
  position: [-0.18, 1.37, 4.40],
  lookAt: [-0.18, 1.02, -0.6],
  fov: 42,
};

// 8 Continuous Camera Waypoints along one uninterrupted trajectory:
// Strictly designed within the front-to-side hemispherical arc (z >= 2.6m) to GUARANTEE zero model clipping,
// while delivering dramatic Technocrane & Steadicam variations (Elevated High-Angle, Low Floor-Skimming, Wide Flank, Intimate Push-In).
export const JOURNEY_CAMERA_WAYPOINTS: CameraShotPreset[] = [
  // Waypoint 0 (Row 0: 2025 ITERA / Graduation) — Frontal establishing, wide calm opening (azimuth: 0°, elev: +5°, dist: 5.0m)
  { position: [-0.15, 1.34, 4.38], lookAt: [-0.15, 1.02, -0.6], fov: 42 },

  // Waypoint 1 (Row 1: 2023 Pertamina Research) — Front-Left 3/4 orbital transition (azimuth: -28°, elev: +6°, dist: 4.6m)
  { position: [-2.15, 1.38, 3.44], lookAt: [-0.12, 1.02, -0.6], fov: 39 },

  // Waypoint 2 (Row 2: 2023 ITERA Geology Lab) — Elevated High-Angle Crane (azimuth: +20°, elev: +22°, dist: 4.8m, looking down from above)
  { position: [1.52, 2.70, 3.58], lookAt: [-0.10, 0.95, -0.6], fov: 40 },

  // Waypoint 3 (Row 3: 2022 Pertamina Work Practice) — Low-Angle Floor-Skimming Hero (azimuth: -25°, elev: -8°, dist: 4.3m, near floor looking up)
  { position: [-1.80, 0.30, 3.26], lookAt: [-0.12, 1.08, -0.6], fov: 36 },

  // Waypoint 4 (Row 4: 2022 Way Krui Mapping) — Dynamic Wide Flank Exploration (azimuth: +45°, elev: +5°, dist: 4.8m, broad stride view)
  { position: [3.38, 1.32, 2.78], lookAt: [-0.08, 1.02, -0.6], fov: 41 },

  // Waypoint 5 (Row 5: 2022 MGEI SC-ITERA) — Floating High Steadicam (azimuth: -18°, elev: +15°, dist: 4.5m)
  { position: [-1.34, 2.06, 3.53], lookAt: [-0.12, 0.98, -0.6], fov: 38 },

  // Waypoint 6 (Row 6: 2021 HMGL Avanindra ITERA) — Intimate Medium Push-In 3/4 (azimuth: +16°, elev: +3°, dist: 3.4m)
  { position: [0.94, 1.08, 2.66], lookAt: [-0.12, 1.02, -0.6], fov: 33 },

  // Waypoint 7 (Row 7: 2019 ITERA Start) — Frontal Low-Hero Culmination (azimuth: 0°, elev: -6°, dist: 3.9m)
  { position: [-0.15, 0.49, 3.28], lookAt: [-0.15, 1.10, -0.6], fov: 35 },
];

// Backwards-compatible dictionary
export const TIMELINE_CAMERA_PRESETS: Record<number, CameraShotPreset> = {
  0: JOURNEY_CAMERA_WAYPOINTS[0],
  1: JOURNEY_CAMERA_WAYPOINTS[1],
  2: JOURNEY_CAMERA_WAYPOINTS[2],
  3: JOURNEY_CAMERA_WAYPOINTS[3],
  4: JOURNEY_CAMERA_WAYPOINTS[4],
  5: JOURNEY_CAMERA_WAYPOINTS[5],
  6: JOURNEY_CAMERA_WAYPOINTS[6],
  7: JOURNEY_CAMERA_WAYPOINTS[7],
};

// 8 Minimalist Cinema Timeline Experiences (Chronological 2019 -> 2025, First-Person Narrative in English)
export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: "2025-graduate",
    year: "2025",
    company: "ITERA",
    role: "BACHELOR OF GEOLOGICAL ENG",
    title: "GRADUATE",
    description: "“Completing my geological engineering degree with solid subsurface competence. Ready to channel analytical precision into impactful professional work.”",
  },
  {
    id: "2023-undergraduate-research",
    year: "2023",
    company: "PT PERTAMINA HULU ROKAN",
    role: "RESEARCH INTERN",
    title: "UNDERGRADUATE RESEARCH",
    description: "“Diving deep into sequence stratigraphy and T-R cycles, analyzing ancient basins that trapped millions of barrels in subsurface reservoirs.”",
  },
  {
    id: "2023-lab-assistant",
    year: "2023",
    company: "ITERA GEOLOGY LAB",
    role: "LABORATORY ASSISTANT",
    title: "LABORATORY ASSISTANT",
    description: "“Instructing geomorphology and hydrogeology laboratory sessions pushed me to stay disciplined, precise, and ready for critical inquiries.”",
  },
  {
    id: "2022-work-practice",
    year: "2022",
    company: "PT PERTAMINA HULU ROKAN",
    role: "WORK PRACTICE",
    title: "WORK PRACTICE",
    description: "“Touching live oilfield data for the first time. Reading resistivity curves and gamma-ray logs felt like deciphering Earth's hidden subsurface script.”",
  },
  {
    id: "2022-mapping",
    year: "2022",
    company: "WAY KRUI REGENCY",
    role: "GEOLOGICAL MAPPING",
    title: "GEOLOGICAL MAPPING",
    description: "“Mapping outcrop structures across the rugged West Coast of Lampung. This is where my fieldwork instincts were forged by the open terrain.”",
  },
  {
    id: "2022-mgei",
    year: "2022",
    company: "MGEI SC-ITERA",
    role: "DEPUTY HEAD OF DIVISION",
    title: "MGEI SC-ITERA",
    description: "“Leading the seminar and field trip division gave me the platform to bridge academic theories with real-world energy industry dynamics.”",
  },
  {
    id: "2021-hmgl",
    year: "2021",
    company: "HMGL AVANINDRA ITERA",
    role: "ACADEMIC STAFF",
    title: "HMGL AVANINDRA ITERA",
    description: "“Inside the student association, I realized knowledge matters most when shared. Mentoring peers through geological concepts shaped how I communicate.”",
  },
];

// 8 Cinematic Opening Credit Film Milestones with bespoke camera choreography
export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "2019-start",
    stepNumber: "01",
    year: "2019",
    badge: "ACADEMIC COMMENCEMENT",
    title: "START",
    narrative:
      "Began my undergraduate studies in the Geological Engineering Program at ITERA.",
    camera: {
      // Shot 1: Wide Contemplative Establishing Shot
      position: [0.35, 1.05, 5.3],
      lookAt: [0, 1.25, 0],
      fov: 35,
    },
  },
  {
    id: "2021-hmgl",
    stepNumber: "02",
    year: "2021",
    badge: "DEPARTMENT LEADERSHIP",
    title: "HMGL AVANINDRA ITERA",
    narrative:
      "Served as a Staff Member of the Academic Department.",
    camera: {
      // Shot 2: Dynamic Low-Angle Pan (Authoritative, rising leadership)
      position: [-0.75, 0.65, 4.4],
      lookAt: [0.1, 1.35, 0],
      fov: 36,
    },
  },
  {
    id: "2022-mgei",
    stepNumber: "03",
    year: "2022",
    badge: "ECONOMIC GEOLOGY CHAPTER",
    title: "MGEI SC-ITERA",
    narrative:
      "Served as Deputy Head of the Seminar and Field Trip Division.",
    camera: {
      // Shot 3: Dutch / Medium Side Shot (Dynamic energy, division leadership)
      position: [0.85, 0.85, 4.3],
      lookAt: [-0.1, 1.20, 0],
      fov: 33,
    },
  },
  {
    id: "2022-mapping",
    stepNumber: "04",
    year: "2022",
    badge: "REGIONAL FIELD SURVEY",
    title: "GEOLOGICAL MAPPING",
    narrative:
      "Conducted geological mapping as a student field mapping project at Way Krui, West Coast Regency, Lampung.",
    camera: {
      // Shot 4: Wide Low-Horizon Exploration Shot (Vast terrain mapping)
      position: [0.0, 0.45, 4.9],
      lookAt: [0, 1.15, 0],
      fov: 38,
    },
  },
  {
    id: "2022-work-practice",
    stepNumber: "05",
    year: "2022",
    badge: "SUBSURFACE INDUSTRY INTERNSHIP",
    title: "WORK PRACTICE",
    narrative:
      "Conducted well log analysis as part of a work practice internship at PT Pertamina Hulu Rokan.",
    camera: {
      // Shot 5: Focused Medium-Close Angle (Subsurface data precision)
      position: [-0.55, 1.10, 3.8],
      lookAt: [0.1, 1.30, 0],
      fov: 30,
    },
  },
  {
    id: "2023-undergraduate-research",
    stepNumber: "06",
    year: "2023",
    badge: "HONORS STRATIGRAPHIC RESEARCH",
    title: "UNDERGRADUATE RESEARCH",
    narrative:
      "Conducted sequence stratigraphic analysis at PT Pertamina Hulu Rokan as part of an undergraduate research internship.",
    camera: {
      // Shot 6: Sleek Tracking Shot (Sequence stratigraphy research depth)
      position: [0.65, 1.15, 3.9],
      lookAt: [-0.1, 1.32, 0],
      fov: 31,
    },
  },
  {
    id: "2023-lab-assistant",
    stepNumber: "07",
    year: "2023",
    badge: "ACADEMIC MENTORSHIP",
    title: "LABORATORY ASSISTANT",
    narrative:
      "Served as a Laboratory Assistant for Geomorphology, Geotechnics, and Hydrogeology.",
    camera: {
      // Shot 7: Eye-Level Academic Profile Shot (Mentorship & rigor)
      position: [-0.85, 0.95, 4.2],
      lookAt: [0.15, 1.25, 0],
      fov: 32,
    },
  },
  {
    id: "2025-graduate",
    stepNumber: "08",
    year: "2025",
    badge: "BACHELOR OF ENGINEERING",
    title: "GRADUATE",
    narrative:
      "Completed my Bachelor's degree in Geological Engineering.",
    camera: {
      // Shot 8: Heroic Low-Angle Triumphant Shot (Looking upward into future)
      position: [0.1, 0.40, 4.1],
      lookAt: [0, 1.45, 0],
      fov: 35,
    },
  },
];
