"use strict";

// Contenido educativo. Puedes editar estas listas sin instalar herramientas.
const ENGLISH_DATA = typeof module !== 'undefined' && module.exports
  ? require('./english-data.js') : globalThis.ENGLISH_DATA;

// Iconos SVG Lucide. Licencias incluidas; ninguna dependencia en ejecución.
const ICONS = {
  "menu": [
    [
      "path",
      {
        "d": "M4 5h16"
      }
    ],
    [
      "path",
      {
        "d": "M4 12h16"
      }
    ],
    [
      "path",
      {
        "d": "M4 19h16"
      }
    ]
  ],
  "home": [
    [
      "path",
      {
        "d": "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
      }
    ],
    [
      "path",
      {
        "d": "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      }
    ]
  ],
  "map": [
    [
      "path",
      {
        "d": "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"
      }
    ],
    [
      "path",
      {
        "d": "M15 5.764v15"
      }
    ],
    [
      "path",
      {
        "d": "M9 3.236v15"
      }
    ]
  ],
  "book-open": [
    [
      "path",
      {
        "d": "M12 5v16"
      }
    ],
    [
      "path",
      {
        "d": "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"
      }
    ]
  ],
  "message-circle": [
    [
      "path",
      {
        "d": "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
      }
    ]
  ],
  "book-text": [
    [
      "path",
      {
        "d": "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    [
      "path",
      {
        "d": "M8 11h8"
      }
    ],
    [
      "path",
      {
        "d": "M8 7h6"
      }
    ]
  ],
  "languages": [
    [
      "path",
      {
        "d": "m5 8 6 6"
      }
    ],
    [
      "path",
      {
        "d": "m4 14 6-6 2-3"
      }
    ],
    [
      "path",
      {
        "d": "M2 5h12"
      }
    ],
    [
      "path",
      {
        "d": "M7 2h1"
      }
    ],
    [
      "path",
      {
        "d": "m22 22-5-10-5 10"
      }
    ],
    [
      "path",
      {
        "d": "M14 18h6"
      }
    ]
  ],
  "mic": [
    [
      "path",
      {
        "d": "M12 19v3"
      }
    ],
    [
      "path",
      {
        "d": "M19 10v2a7 7 0 0 1-14 0v-2"
      }
    ],
    [
      "rect",
      {
        "x": "9",
        "y": "2",
        "width": "6",
        "height": "13",
        "rx": "3"
      }
    ]
  ],
  "headphones": [
    [
      "path",
      {
        "d": "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
      }
    ]
  ],
  "link-2": [
    [
      "path",
      {
        "d": "M9 17H7A5 5 0 0 1 7 7h2"
      }
    ],
    [
      "path",
      {
        "d": "M15 7h2a5 5 0 1 1 0 10h-2"
      }
    ],
    [
      "line",
      {
        "x1": "8",
        "x2": "16",
        "y1": "12",
        "y2": "12"
      }
    ]
  ],
  "hash": [
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "9",
        "y2": "9"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "15",
        "y2": "15"
      }
    ],
    [
      "line",
      {
        "x1": "10",
        "x2": "8",
        "y1": "3",
        "y2": "21"
      }
    ],
    [
      "line",
      {
        "x1": "16",
        "x2": "14",
        "y1": "3",
        "y2": "21"
      }
    ]
  ],
  "pencil-line": [
    [
      "path",
      {
        "d": "M13 21h8"
      }
    ],
    [
      "path",
      {
        "d": "m15 5 4 4"
      }
    ],
    [
      "path",
      {
        "d": "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
      }
    ]
  ],
  "clipboard-check": [
    [
      "rect",
      {
        "width": "8",
        "height": "4",
        "x": "8",
        "y": "2",
        "rx": "1",
        "ry": "1"
      }
    ],
    [
      "path",
      {
        "d": "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
      }
    ],
    [
      "path",
      {
        "d": "m9 14 2 2 4-4"
      }
    ]
  ],
  "settings": [
    [
      "path",
      {
        "d": "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
      }
    ],
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "3"
      }
    ]
  ],
  "folder-heart": [
    [
      "path",
      {
        "d": "M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417"
      }
    ],
    [
      "path",
      {
        "d": "M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"
      }
    ]
  ],
  "folder-plus": [
    [
      "path",
      {
        "d": "M12 10v6"
      }
    ],
    [
      "path",
      {
        "d": "M9 13h6"
      }
    ],
    [
      "path",
      {
        "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ]
  ],
  "sparkles": [
    [
      "path",
      {
        "d": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
      }
    ],
    [
      "path",
      {
        "d": "M20 2v4"
      }
    ],
    [
      "path",
      {
        "d": "M22 4h-4"
      }
    ],
    [
      "circle",
      {
        "cx": "4",
        "cy": "20",
        "r": "2"
      }
    ]
  ],
  "gamepad-2": [
    [
      "line",
      {
        "x1": "6",
        "x2": "10",
        "y1": "11",
        "y2": "11"
      }
    ],
    [
      "line",
      {
        "x1": "8",
        "x2": "8",
        "y1": "9",
        "y2": "13"
      }
    ],
    [
      "line",
      {
        "x1": "15",
        "x2": "15.01",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "18",
        "x2": "18.01",
        "y1": "10",
        "y2": "10"
      }
    ],
    [
      "path",
      {
        "d": "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"
      }
    ]
  ],
  "alarm-clock": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "13",
        "r": "8"
      }
    ],
    [
      "path",
      {
        "d": "M12 9v4l2 2"
      }
    ],
    [
      "path",
      {
        "d": "M5 3 2 6"
      }
    ],
    [
      "path",
      {
        "d": "m22 6-3-3"
      }
    ],
    [
      "path",
      {
        "d": "M6.38 18.7 4 21"
      }
    ],
    [
      "path",
      {
        "d": "M17.64 18.67 20 21"
      }
    ]
  ],
  "calendar-days": [
    [
      "path",
      {
        "d": "M8 2v3"
      }
    ],
    [
      "path",
      {
        "d": "M16 2v3"
      }
    ],
    [
      "rect",
      {
        "x": "3",
        "y": "3",
        "width": "18",
        "height": "18",
        "rx": "2"
      }
    ],
    [
      "path",
      {
        "d": "M3 9h18"
      }
    ],
    [
      "path",
      {
        "d": "M8 13h.01"
      }
    ],
    [
      "path",
      {
        "d": "M12 13h.01"
      }
    ],
    [
      "path",
      {
        "d": "M16 13h.01"
      }
    ],
    [
      "path",
      {
        "d": "M8 17h.01"
      }
    ],
    [
      "path",
      {
        "d": "M12 17h.01"
      }
    ],
    [
      "path",
      {
        "d": "M16 17h.01"
      }
    ]
  ],
  "arrow-right": [
    [
      "path",
      {
        "d": "M5 12h14"
      }
    ],
    [
      "path",
      {
        "d": "m12 5 7 7-7 7"
      }
    ]
  ],
  "arrow-left": [
    [
      "path",
      {
        "d": "m12 19-7-7 7-7"
      }
    ],
    [
      "path",
      {
        "d": "M19 12H5"
      }
    ]
  ],
  "check": [
    [
      "path",
      {
        "d": "M20 6 9 17l-5-5"
      }
    ]
  ],
  "plus": [
    [
      "path",
      {
        "d": "M5 12h14"
      }
    ],
    [
      "path",
      {
        "d": "M12 5v14"
      }
    ]
  ],
  "chevron-right": [
    [
      "path",
      {
        "d": "m9 18 6-6-6-6"
      }
    ]
  ],
  "volume-2": [
    [
      "path",
      {
        "d": "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
      }
    ],
    [
      "path",
      {
        "d": "M16 9a5 5 0 0 1 0 6"
      }
    ],
    [
      "path",
      {
        "d": "M19.364 18.364a9 9 0 0 0 0-12.728"
      }
    ]
  ],
  "lightbulb": [
    [
      "path",
      {
        "d": "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
      }
    ],
    [
      "path",
      {
        "d": "M9 18h6"
      }
    ],
    [
      "path",
      {
        "d": "M10 22h4"
      }
    ]
  ],
  "clock-3": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "10"
      }
    ],
    [
      "path",
      {
        "d": "M12 6v6h4"
      }
    ]
  ],
  "heart": [
    [
      "path",
      {
        "d": "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
      }
    ]
  ],
  "trash-2": [
    [
      "path",
      {
        "d": "M10 11v6"
      }
    ],
    [
      "path",
      {
        "d": "M14 11v6"
      }
    ],
    [
      "path",
      {
        "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
      }
    ],
    [
      "path",
      {
        "d": "M3 6h18"
      }
    ],
    [
      "path",
      {
        "d": "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      }
    ]
  ],
  "pencil": [
    [
      "path",
      {
        "d": "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
      }
    ],
    [
      "path",
      {
        "d": "m15 5 4 4"
      }
    ]
  ],
  "briefcase": [
    [
      "path",
      {
        "d": "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
      }
    ],
    [
      "rect",
      {
        "width": "20",
        "height": "14",
        "x": "2",
        "y": "6",
        "rx": "2"
      }
    ]
  ],
  "map-pin": [
    [
      "path",
      {
        "d": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      }
    ],
    [
      "circle",
      {
        "cx": "12",
        "cy": "10",
        "r": "3"
      }
    ]
  ],
  "users": [
    [
      "path",
      {
        "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      }
    ],
    [
      "path",
      {
        "d": "M16 3.128a4 4 0 0 1 0 7.744"
      }
    ],
    [
      "path",
      {
        "d": "M22 21v-2a4 4 0 0 0-3-3.87"
      }
    ],
    [
      "circle",
      {
        "cx": "9",
        "cy": "7",
        "r": "4"
      }
    ]
  ],
  "utensils": [
    [
      "path",
      {
        "d": "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"
      }
    ],
    [
      "path",
      {
        "d": "M7 2v20"
      }
    ],
    [
      "path",
      {
        "d": "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"
      }
    ]
  ],
  "shirt": [
    [
      "path",
      {
        "d": "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"
      }
    ]
  ],
  "car": [
    [
      "path",
      {
        "d": "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"
      }
    ],
    [
      "circle",
      {
        "cx": "7",
        "cy": "17",
        "r": "2"
      }
    ],
    [
      "path",
      {
        "d": "M9 17h6"
      }
    ],
    [
      "circle",
      {
        "cx": "17",
        "cy": "17",
        "r": "2"
      }
    ]
  ],
  "stethoscope": [
    [
      "path",
      {
        "d": "M11 2v2"
      }
    ],
    [
      "path",
      {
        "d": "M5 2v2"
      }
    ],
    [
      "path",
      {
        "d": "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"
      }
    ],
    [
      "path",
      {
        "d": "M8 15a6 6 0 0 0 12 0v-3"
      }
    ],
    [
      "circle",
      {
        "cx": "20",
        "cy": "10",
        "r": "2"
      }
    ]
  ],
  "graduation-cap": [
    [
      "path",
      {
        "d": "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
      }
    ],
    [
      "path",
      {
        "d": "M22 10v6"
      }
    ],
    [
      "path",
      {
        "d": "M6 12.5V16a6 3 0 0 0 12 0v-3.5"
      }
    ]
  ],
  "laptop": [
    [
      "path",
      {
        "d": "M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"
      }
    ],
    [
      "path",
      {
        "d": "M20.054 15.987H3.946"
      }
    ]
  ],
  "trophy": [
    [
      "path",
      {
        "d": "M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2"
      }
    ],
    [
      "path",
      {
        "d": "M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2"
      }
    ],
    [
      "path",
      {
        "d": "M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3"
      }
    ],
    [
      "path",
      {
        "d": "M4 22h16"
      }
    ],
    [
      "path",
      {
        "d": "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"
      }
    ],
    [
      "path",
      {
        "d": "M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3"
      }
    ]
  ],
  "cloud-sun": [
    [
      "path",
      {
        "d": "M12 2v2"
      }
    ],
    [
      "path",
      {
        "d": "m4.93 4.93 1.41 1.41"
      }
    ],
    [
      "path",
      {
        "d": "M20 12h2"
      }
    ],
    [
      "path",
      {
        "d": "m19.07 4.93-1.41 1.41"
      }
    ],
    [
      "path",
      {
        "d": "M15.947 12.65a4 4 0 0 0-5.925-4.128"
      }
    ],
    [
      "path",
      {
        "d": "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"
      }
    ]
  ],
  "paw-print": [
    [
      "circle",
      {
        "cx": "11",
        "cy": "4",
        "r": "2"
      }
    ],
    [
      "circle",
      {
        "cx": "18",
        "cy": "8",
        "r": "2"
      }
    ],
    [
      "circle",
      {
        "cx": "20",
        "cy": "16",
        "r": "2"
      }
    ],
    [
      "path",
      {
        "d": "M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"
      }
    ]
  ],
  "palette": [
    [
      "path",
      {
        "d": "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"
      }
    ],
    [
      "circle",
      {
        "cx": "13.5",
        "cy": "6.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ],
    [
      "circle",
      {
        "cx": "17.5",
        "cy": "10.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ],
    [
      "circle",
      {
        "cx": "6.5",
        "cy": "12.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ],
    [
      "circle",
      {
        "cx": "8.5",
        "cy": "7.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ]
  ],
  "music": [
    [
      "path",
      {
        "d": "M9 18V5l12-2v13"
      }
    ],
    [
      "circle",
      {
        "cx": "6",
        "cy": "18",
        "r": "3"
      }
    ],
    [
      "circle",
      {
        "cx": "18",
        "cy": "16",
        "r": "3"
      }
    ]
  ],
  "plane": [
    [
      "path",
      {
        "d": "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
      }
    ]
  ],
  "house": [
    [
      "path",
      {
        "d": "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
      }
    ],
    [
      "path",
      {
        "d": "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      }
    ]
  ],
  "flower-2": [
    [
      "path",
      {
        "d": "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"
      }
    ],
    [
      "circle",
      {
        "cx": "12",
        "cy": "8",
        "r": "2"
      }
    ],
    [
      "path",
      {
        "d": "M12 10v12"
      }
    ],
    [
      "path",
      {
        "d": "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"
      }
    ],
    [
      "path",
      {
        "d": "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"
      }
    ]
  ],
  "building-2": [
    [
      "path",
      {
        "d": "M10 12h4"
      }
    ],
    [
      "path",
      {
        "d": "M10 8h4"
      }
    ],
    [
      "path",
      {
        "d": "M14 21v-3a2 2 0 0 0-4 0v3"
      }
    ],
    [
      "path",
      {
        "d": "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"
      }
    ],
    [
      "path",
      {
        "d": "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"
      }
    ]
  ],
  "tree-pine": [
    [
      "path",
      {
        "d": "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"
      }
    ],
    [
      "path",
      {
        "d": "M12 22v-3"
      }
    ]
  ],
  "wheat": [
    [
      "path",
      {
        "d": "M2 22 16 8"
      }
    ],
    [
      "path",
      {
        "d": "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"
      }
    ],
    [
      "path",
      {
        "d": "M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"
      }
    ],
    [
      "path",
      {
        "d": "M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"
      }
    ],
    [
      "path",
      {
        "d": "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"
      }
    ],
    [
      "path",
      {
        "d": "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
      }
    ],
    [
      "path",
      {
        "d": "M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
      }
    ],
    [
      "path",
      {
        "d": "M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
      }
    ]
  ],
  "circle-check": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "10"
      }
    ],
    [
      "path",
      {
        "d": "m9 12 2 2 4-4"
      }
    ]
  ],
  "rotate-ccw": [
    [
      "path",
      {
        "d": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
      }
    ],
    [
      "path",
      {
        "d": "M3 3v5h5"
      }
    ]
  ],
  "bell-ring": [
    [
      "path",
      {
        "d": "M10.268 21a2 2 0 0 0 3.464 0"
      }
    ],
    [
      "path",
      {
        "d": "M22 8c0-2.3-.8-4.3-2-6"
      }
    ],
    [
      "path",
      {
        "d": "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
      }
    ],
    [
      "path",
      {
        "d": "M4 2C2.8 3.7 2 5.7 2 8"
      }
    ]
  ],
  "quote": [
    [
      "path",
      {
        "d": "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"
      }
    ],
    [
      "path",
      {
        "d": "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"
      }
    ]
  ],
  "bell": [
    [
      "path",
      {
        "d": "M10.268 21a2 2 0 0 0 3.464 0"
      }
    ],
    [
      "path",
      {
        "d": "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
      }
    ]
  ],
  "moon": [
    [
      "path",
      {
        "d": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      }
    ]
  ],
  "sun": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "4"
      }
    ],
    [
      "path",
      {
        "d": "M12 2v2"
      }
    ],
    [
      "path",
      {
        "d": "M12 20v2"
      }
    ],
    [
      "path",
      {
        "d": "m4.93 4.93 1.41 1.41"
      }
    ],
    [
      "path",
      {
        "d": "m17.66 17.66 1.41 1.41"
      }
    ],
    [
      "path",
      {
        "d": "M2 12h2"
      }
    ],
    [
      "path",
      {
        "d": "M20 12h2"
      }
    ],
    [
      "path",
      {
        "d": "m6.34 17.66-1.41 1.41"
      }
    ],
    [
      "path",
      {
        "d": "m19.07 4.93-1.41 1.41"
      }
    ]
  ],
  "flame": [
    [
      "path",
      {
        "d": "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"
      }
    ]
  ],
  "x": [
    [
      "path",
      {
        "d": "M18 6 6 18"
      }
    ],
    [
      "path",
      {
        "d": "m6 6 12 12"
      }
    ]
  ],
  "info": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "10"
      }
    ],
    [
      "path",
      {
        "d": "M12 16v-4"
      }
    ],
    [
      "path",
      {
        "d": "M12 8h.01"
      }
    ]
  ]
};

// Iconos de Aula virtual, con el mismo estilo de línea de English.
Object.assign(ICONS, {
  'video': [['rect',{x:3,y:5,width:12,height:14,rx:2}],['path',{d:'m15 10 6-4v12l-6-4'}]],
  'messages-square': [['path',{d:'M8 3H3v14l4-4h10V3H8Z M8 17v4h9l4 3V10h-4'}]],
  'backpack': [['rect',{x:5,y:6,width:14,height:16,rx:3}],['path',{d:'M9 6V4a3 3 0 0 1 6 0v2 M5 14h14 M9 14v3'}]],
  'shield-check': [['path',{d:'M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7Z m-5 9 3 3 6-6'}]],
  'copy': [['rect',{x:8,y:8,width:12,height:12,rx:2}],['path',{d:'M16 8V4H4v12h4'}]],
  'calendar': [['rect',{x:3,y:5,width:18,height:16,rx:2}],['path',{d:'M16 3v4 M8 3v4 M3 11h18'}]],
  'send': [['path',{d:'m22 2-7 20-4-9-9-4Z M22 2 11 13'}]],
  'file-text': [['path',{d:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z M14 2v6h6 M8 13h8 M8 17h6'}]]
});
// ===== Aplicación: JavaScript puro =====
(() => {
  const D = ENGLISH_DATA;
  const KEY = 'english.pure.v1';
  const allWords = D.categories.flatMap(category => category.words);
  const wordMap = Object.fromEntries(allWords.map(word => [word.id, word]));
  const views = new Set(['inicio','guia','grammars','preguntas','lecturas','verbos','vocabularios','speaking','listening','conectores','numeros','practicas','test','sistema','listas','recordatorio','juegos','aula']);
  const categoryIcons = ['house','briefcase','briefcase','map-pin','users','utensils','shirt','car','stethoscope','graduation-cap','laptop','trophy','cloud-sun','paw-print','palette','music','building-2','plane','home','utensils','flower-2','briefcase','graduation-cap','tree-pine','building-2','wheat'];
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clone = value => JSON.parse(JSON.stringify(value));
  const id = () => globalThis.crypto?.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2);
  const dateKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const shiftedDate = (date, days) => new Date(Date.parse(date + 'T12:00:00Z') + days * 86400000).toISOString().slice(0,10);
  const indexFor = (date, length) => Math.floor(Date.parse(date + 'T12:00:00Z') / 86400000) % length;
  const timezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Santo_Domingo';
  function partsAt(time, zone) {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(time)).map(p => [p.type,p.value]));
    return {date:`${parts.year}-${parts.month}-${parts.day}`, time:`${parts.hour}:${parts.minute}`};
  }
  function countStreak(dates, today) {
    const set = new Set(dates);
    let day = set.has(today) ? today : shiftedDate(today,-1), count = 0;
    while(set.has(day)) { count++; day = shiftedDate(day,-1); }
    return count;
  }
  function defaultState() {
    return {version:1,lists:[],reminders:[],studyDays:[],notifications:[],notificationsEnabled:false,lastReminderCheck:Date.now(),palette:'english',dark:false};
  }
  function dueReminders(data, now) {
    const due = [];
    if(data.notificationsEnabled) {
      const known = new Set(data.notifications.map(n => n.id));
      for(const reminder of data.reminders) {
        if(!reminder.enabled) continue;
        const current = partsAt(now,reminder.timezone);
        const since = partsAt(Math.max(data.lastReminderCheck,reminder.createdAt,now-7*86400000),reminder.timezone);
        for(let offset=6;offset>=0;offset--) {
          const date = shiftedDate(current.date,-offset);
          const day = new Date(date+'T12:00:00Z').getUTCDay();
          const slot = date+'T'+reminder.time;
          const noticeId = reminder.id+':'+date;
          if(reminder.days.includes(day) && slot>since.date+'T'+since.time && slot<=current.date+'T'+current.time && !known.has(noticeId)) {
            due.push({id:noticeId,message:reminder.message,createdAt:now,read:false});
            known.add(noticeId);
          }
        }
      }
    }
    data.notifications = [...due.reverse(),...data.notifications].slice(0,100);
    data.lastReminderCheck = now;
    return due;
  }
  // Exportaciones opcionales para comprobar la lógica con Node, sin ejecutar la interfaz.
  if(typeof document === 'undefined') {
    if(typeof module !== 'undefined') module.exports = {dateKey,shiftedDate,indexFor,countStreak,partsAt,dueReminders,defaultState,data:D};
    return;
  }
  const ui = {view:'inicio',detail:'',dailyValue:'',dailyFeedback:null,modal:null,selectedWord:null,editId:null,deleteTarget:null,reading:0,readingValue:'',readingChecked:false,translation:false,speaking:0,listening:0,listeningValue:'',listeningChecked:false,transcript:false,practice:0,practiceValue:'',practiceChecked:false,test:0,testValue:'',testAnswers:[],testFinished:false,mobileMenu:false};
  let state = defaultState(), storageWorks = true, today = dateKey();
  const matchPairs = globalThis.createMatchPairs({data:D,esc,link,action,render,
    isActive:()=>ui.view==='juegos'&&ui.detail==='match-the-pairs'});
  const aula = globalThis.createEnglishAula({icon});
  const modal = $('#app-dialog');
  let modalTrigger = null;
  function storageWarning(message) { const box=$('#storage-warning'); box.textContent=message; box.hidden=false; }
  function readState() {
    const raw = localStorage.getItem(KEY);
    if(!raw) return defaultState();
    const data = JSON.parse(raw);
    if(!data || !Array.isArray(data.lists) || !Array.isArray(data.reminders) || !Array.isArray(data.studyDays) || !Array.isArray(data.notifications)) throw new Error('Los datos guardados no tienen un formato válido.');
    return {...defaultState(),...data};
  }
  try {
    const probe=KEY+'.check'; localStorage.setItem(probe,'1'); localStorage.removeItem(probe);
    state=readState();
  } catch(error) {
    storageWorks=false;
    storageWarning('El navegador no permite leer o guardar tus datos. Abre los archivos en un navegador con almacenamiento habilitado. No sobrescribiremos los datos existentes.');
  }
  async function update(mutator, redraw=true) {
    if(!storageWorks) { toast('No se pudo guardar. Revisa el aviso de almacenamiento.','error'); return {ok:false}; }
    const execute = () => {
      try {
        const next=readState();
        const result=mutator(next);
        localStorage.setItem(KEY,JSON.stringify(next));
        state=next;
        applyAppearance(); updateHeader();
        if(redraw) render();
        return {ok:true,result};
      } catch(error) { toast(error.message || 'No pudimos guardar el cambio.','error'); return {ok:false}; }
    };
    return navigator.locks?.request ? navigator.locks.request('english-save',execute) : execute();
  }
  function icon(name, extra='') {
    const nodes=ICONS[name] || ICONS['book-open'];
    return `<svg class="icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${nodes.map(([tag,attrs])=>`<${tag} ${Object.entries(attrs).map(([k,v])=>`${k}="${esc(v)}"`).join(' ')}></${tag}>`).join('')}</svg>`;
  }
  function paintIcons(root=document) { root.querySelectorAll('[data-icon]').forEach(node=>{node.innerHTML=icon(node.dataset.icon);}); }
  function toast(message,type='success') {
    const node=document.createElement('div'); node.className='toast '+type;
    node.innerHTML=icon(type==='error'?'info':'circle-check')+`<span>${esc(message)}</span>`;
    $('#toasts').append(node); setTimeout(()=>node.remove(),5200);
  }
  function applyAppearance() {
    const palette=D.themes.find(t=>t.id===state.palette)||D.themes[0];
    const root=document.documentElement;
    root.classList.toggle('dark',!!state.dark);
    root.style.setProperty('--primary',palette.color);
    root.style.setProperty('--brand-deep',palette.deep);
    root.style.setProperty('--accent',`color-mix(in srgb, ${palette.color} 12%, var(--card))`);
    root.style.setProperty('--accent-foreground',state.dark?`color-mix(in srgb, ${palette.color} 50%, white)`:palette.deep);
    root.style.setProperty('--secondary','var(--accent)');
    root.style.setProperty('--secondary-foreground','var(--accent-foreground)');
    document.querySelector('meta[name="theme-color"]').content=state.dark?'#131723':palette.color;
    $('#theme-button').innerHTML=icon(state.dark?'sun':'moon');
    $('#theme-button').setAttribute('aria-label',state.dark?'Activar modo claro':'Activar modo oscuro');
  }
  function updateHeader() {
    const count=countStreak(state.studyDays,today);
    $('#streak-count').textContent=count;
    $('#streak-label').textContent=(count===1?'día':'días')+' de racha';
    const unread=state.notifications.filter(n=>!n.read).length;
    $('#notification-dot').hidden=unread===0;
    $('#notifications-button').setAttribute('aria-label',`Notificaciones${unread?', '+unread+' sin leer':''}`);
  }
  function go(view) { location.hash='/'+view; }
  function title(text,subtitle,actions='') { return `<div class="page-heading"><div><div class="eyebrow">TU APRENDIZAJE</div><h1>${esc(text)}</h1><p>${esc(subtitle)}</p></div>${actions}</div>`; }
  function action(label,name,extra='',kind='primary-button',ico='') { return `<button type="button" class="${kind}" data-action="${name}" ${extra}>${ico?icon(ico):''}${label}</button>`; }
  function link(label,route,kind='text-link',ico='arrow-right') { return `<a href="#/${esc(route)}" class="${kind}">${esc(label)}${ico?icon(ico):''}</a>`; }
  function audio(text) { return action('','speak',`data-text="${esc(text)}" aria-label="Escuchar ${esc(text)}"`,'icon-button','volume-2'); }
  function switchControl(name,checked,label,extra='') { return `<label class="switch"><input type="checkbox" data-setting="${name}" ${checked?'checked':''} aria-label="${esc(label)}" ${extra}><span class="switch-track"></span></label>`; }
  function choices(exercise,value,name,disabled=false) { return `<fieldset class="choice-grid"><legend class="sr-only">Elige una respuesta</legend>${exercise.options.map((option,i)=>`<label class="choice"><input type="radio" name="${name}" value="${i}" ${String(i)===value?'checked':''} ${disabled?'disabled':''}><span class="choice-key">${String.fromCharCode(65+i)}</span><span lang="en">${esc(option)}</span></label>`).join('')}</fieldset>`; }
  function feedback(correct,text) { return `<div class="feedback ${correct?'success':''}" role="status">${icon(correct?'circle-check':'lightbulb')}<span>${esc(text)}</span></div>`; }
  function home() {
    const phrase=D.phrases[indexFor(today,D.phrases.length)], fact=D.facts[indexFor(today,D.facts.length)], e=D.exercises[indexFor(today,D.exercises.length)];
    const completed=state.studyDays.includes(today);
    const dateLabel=new Intl.DateTimeFormat('es-DO',{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'}).format(new Date(today+'T12:00:00Z'));
    return `<div class="page-heading"><div><div class="eyebrow">${icon('sparkles')} TU MOMENTO DE APRENDER</div><h1>Un nuevo día, un poco más de inglés.</h1><p>Pequeños pasos que te llevan más lejos.</p></div><div class="date-chip">${icon('calendar-days')}${dateLabel}</div></div>
    <div class="daily-grid"><article class="card phrase-card"><div class="card-top"><div class="card-label">${icon('quote')} Frase del día</div><span class="small-pill">Daily inspiration</span></div><blockquote lang="en">“${esc(phrase[0])}”</blockquote><p class="phrase-translation">${esc(phrase[1])}</p><div class="phrase-footer">${action('Escuchar frase','speak',`data-text="${esc(phrase[0])}"`,'listen-button','volume-2')}<span class="phrase-kind">Una frase nueva cada día</span></div></article><article class="card fact-card"><div class="card-label">${icon('lightbulb')} ¿Sabías que…?</div><h2>${esc(fact[0])}</h2><p>${esc(fact[1])}</p><div class="fact-bottom">${icon('sparkles')} Un pequeño descubrimiento diario</div></article></div>
    <div class="section-label"><h2>Haz espacio para tu inglés</h2><span class="help-text">Hoy cuenta.</span></div><div class="work-grid"><article class="card"><div class="card-top"><div class="card-label">${icon('pencil-line')} Ejercicio del día</div><span class="small-pill">${completed?'✓ Completado':esc(e.topic)}</span></div><h2 class="exercise-question" lang="en">${esc(e.question)}</h2><p class="help-text">Completa la frase con la opción correcta.</p>${choices(e,completed?String(e.answer):ui.dailyValue,'daily',completed)}${completed?feedback(true,'¡Buen trabajo! Tu práctica de hoy ya cuenta para la racha.'):ui.dailyFeedback?feedback(ui.dailyFeedback.correct,ui.dailyFeedback.text):''}<div class="exercise-actions"><span class="exercise-meta">${icon('clock-3')} Solo te tomará un minuto</span>${completed?link('Seguir practicando','practicas','outline-button'):action('Comprobar','daily-answer',ui.dailyValue===''?'disabled':'','primary-button','check')}</div></article>
    <article class="card"><div class="card-top"><div class="card-label">${icon('folder-heart')} Mis listas</div>${link('Ver todas','listas')}</div><div class="list-preview">${state.lists.length?state.lists.slice(0,3).map(list=>`<a class="list-row" href="#/listas/${esc(list.id)}"><span class="list-square">${icon('folder-heart')}</span><span><strong>${esc(list.name)}</strong><small>${list.words.length} palabras</small></span>${icon('chevron-right')}</a>`).join(''):`<div class="empty-list"><div class="empty-icon">${icon('folder-plus')}</div><h3>Tu próxima palabra empieza aquí</h3><p>Crea una lista y guarda lo que quieres aprender.</p>${action('Crear mi primera lista','new-list','','outline-button','plus')}</div>`}</div>${state.lists.length?`<div class="gap-top">${action('Nueva lista','new-list','','text-link','plus')}</div>`:''}</article></div>
    <div class="bottom-grid"><article class="card compact-card"><div class="tile-icon amber">${icon('alarm-clock')}</div><div><h2>Recordatorio</h2><p>${state.reminders.some(r=>r.enabled)?state.reminders.filter(r=>r.enabled).length+' recordatorio(s) activo(s)':'Un momento para ti y tu inglés.'}</p></div>${link('Configurar','recordatorio')}</article><article class="card compact-card"><div class="tile-icon">${icon('gamepad-2')}</div><div><h2>Juegos <span class="tiny-badge">Nuevo</span></h2><p>Corre y salta con English. ¡Consigue 10 aciertos!</p></div>${link('','juegos','icon-button')}</article></div><div class="footer-note">${icon('heart')} La constancia hace la diferencia. Nos vemos mañana.</div>`;
  }
  function wordCards(items,listId='') {
    return `<div class="word-grid">${items.map(word=>{const saved=state.lists.some(list=>list.words.includes(word.id));return `<article class="word-card"><h3 lang="en">${esc(word.en)}</h3><p>${esc(word.es)}</p><div class="word-actions">${audio(word.en)}${listId?action('','remove-word',`data-list="${esc(listId)}" data-word="${word.id}" aria-label="Quitar ${esc(word.en)} de esta lista"`,'icon-button','trash-2'):action('','word-lists',`data-word="${word.id}" aria-label="Guardar ${esc(word.en)} en mis listas"`,saved?'icon-button saved':'icon-button','heart')}</div></article>`;}).join('')}</div>`;
  }
  function groupedListWords(list) {
    const selected=new Set(list.words);
    return D.categories.map(category=>({
      id:category.id,
      name:category.name,
      words:category.words.filter(word=>selected.has(word.id)).slice().sort((a,b)=>a.en.localeCompare(b.en,'en',{sensitivity:'base'}))
    })).filter(group=>group.words.length);
  }
  function printListPdf(list) {
    if(!list.words.length){toast('Añade palabras a la lista antes de crear el PDF.','error');return;}
    const groups=groupedListWords(list);
    const popup=window.open('','_blank','width=900,height=700');
    if(!popup){toast('El navegador bloqueó la ventana de impresión. Permite ventanas emergentes para English.','error');return;}
    const total=groups.reduce((sum,group)=>sum+group.words.length,0);
    const date=new Intl.DateTimeFormat('es-DO',{day:'2-digit',month:'long',year:'numeric'}).format(new Date());
    const sections=groups.map(group=>`<section class="pdf-category"><h2>${esc(group.name)}</h2><table class="pdf-table"><thead><tr><th>English</th><th>Español</th></tr></thead><tbody>${group.words.map(word=>`<tr><td lang="en">${esc(word.en)}</td><td>${esc(word.es)}</td></tr>`).join('')}</tbody></table></section>`).join('');
    const doc=`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(list.name)} - English</title><style>
      @page{size:A4;margin:16mm 14mm 17mm}*{box-sizing:border-box}body{margin:0;color:#172033;font:14px/1.45 Arial,Helvetica,sans-serif;background:#fff}.pdf-header{border-bottom:3px solid #5265dc;padding:0 0 16px;margin-bottom:22px}.brand{display:inline-block;background:#5265dc;color:#fff;font-size:20px;font-weight:800;padding:6px 10px;border-radius:8px;margin-bottom:14px}.pdf-header h1{font-size:28px;line-height:1.1;margin:0 0 7px}.meta{color:#64748b;margin:0}.pdf-category{margin:0 0 22px}.pdf-category h2{font-size:18px;margin:0 0 8px;color:#3346b8;border-left:4px solid #5265dc;padding-left:9px;break-after:avoid}.pdf-table{width:100%;border-collapse:collapse;border:1px solid #dbe1ee}.pdf-table th,.pdf-table td{width:50%;padding:8px 11px;border:1px solid #e8ecf4;text-align:left;vertical-align:top}.pdf-table th{background:#f2f4ff;font-weight:700;color:#334155}.pdf-table thead{display:table-header-group}.pdf-table tr{break-inside:avoid}.pdf-footer{margin-top:28px;padding-top:10px;border-top:1px solid #dbe1ee;color:#64748b;font-size:11px;text-align:center}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.no-print{display:none!important}}
    </style></head><body><header class="pdf-header"><div class="brand">English.</div><h1>${esc(list.name)}</h1><p class="meta">${total} palabras · ${groups.length} categorías · ${esc(date)}</p></header>${sections}<footer class="pdf-footer">Lista de aprendizaje creada en English · Organizada automáticamente por categoría</footer><script>window.addEventListener('load',()=>setTimeout(()=>window.print(),250));window.addEventListener('afterprint',()=>window.close());<\/script></body></html>`;
    popup.opener=null;popup.document.open();popup.document.write(doc);popup.document.close();
  }
  function vocabularies() {
    const category=D.categories.find(c=>c.id===ui.detail);
    if(category) return `<div class="back-link">${link('Todas las categorías','vocabularios','text-link','arrow-left')}</div>${title(category.name,category.words.length+' palabras. Escucha y guarda las que quieres aprender.')}${wordCards(category.words)}`;
    return `${title('Vocabularios','Selecciona una categoría y añade palabras a tus listas de aprendizaje.',link('Mis listas','listas','outline-button','folder-heart'))}<div class="subpage-grid">${D.categories.map((category,i)=>`<a class="category-card" href="#/vocabularios/${category.id}"><div class="card-top"><span class="tile-icon">${icon(categoryIcons[i])}</span>${icon('chevron-right')}</div><h2>${esc(category.name)}</h2><p>${category.words.length} palabras · Inglés / Español</p></a>`).join('')}</div>`;
  }
  function listsPage() {
    if(ui.detail) {
      const list=state.lists.find(l=>l.id===ui.detail);
      if(!list) return title('Lista no encontrada','Puede que se haya eliminado.')+link('Volver a mis listas','listas','outline-button');
      const actions=`<div class="page-actions">${action('PDF','export-list-pdf',`data-id="${esc(list.id)}" ${list.words.length?'': 'disabled'} aria-label="Imprimir ${esc(list.name)} como PDF"`,'outline-button','book-text')}${action('','rename-list',`data-id="${esc(list.id)}" aria-label="Cambiar nombre de la lista"`,'icon-button','pencil')}${link('Añadir palabras','vocabularios','primary-button','plus')}</div>`;
      return `<div class="back-link">${link('Todas mis listas','listas','text-link','arrow-left')}</div>${title(list.name,list.words.length+' palabras que elegiste aprender.',actions)}${list.words.length?wordCards(list.words.map(id=>wordMap[id]).filter(Boolean),list.id):`<div class="card empty-state"><div class="tile-icon">${icon('folder-plus')}</div><h2>Una lista llena de posibilidades</h2><p>Visita un vocabulario y toca el corazón de una palabra para añadirla a esta lista.</p>${link('Explorar vocabularios','vocabularios','primary-button')}</div>`}`;
    }
    return title('Mis listas','Tu vocabulario, organizado a tu manera.',action('Nueva lista','new-list','','primary-button','plus'))+(state.lists.length?`<div class="subpage-grid">${state.lists.map(list=>`<article class="card"><div class="card-top"><span class="tile-icon">${icon('folder-heart')}</span>${action('','delete-list',`data-id="${esc(list.id)}" aria-label="Eliminar ${esc(list.name)}"`,'icon-button','trash-2')}</div><h2 class="settings-title gap-top">${esc(list.name)}</h2><p class="help-text">${list.words.length} palabras guardadas</p><div class="page-actions gap-top">${link('Abrir lista','listas/'+list.id)}${action('PDF','export-list-pdf',`data-id="${esc(list.id)}" ${list.words.length?'': 'disabled'} aria-label="Imprimir ${esc(list.name)} como PDF"`,'outline-button','book-text')}</div></article>`).join('')}</div>`:`<div class="card empty-state"><div class="tile-icon">${icon('folder-plus')}</div><h2>Aprende las palabras que te importan</h2><p>Crea listas para tus viajes, el trabajo o lo que más te guste. Después, llénalas desde los vocabularios.</p>${action('Crear mi primera lista','new-list','','primary-button','plus')}</div>`);
  }
  function remindersPage() {
    return `${title('Recordatorio','Elige la hora, los días y un mensaje que te motive.',action('Nuevo recordatorio','new-reminder','','primary-button','plus'))}<section class="card"><div class="settings-row"><div><strong>Notificaciones de English</strong><p>${state.notificationsEnabled?'Tus avisos están activados.':'Actívalas para recibir los mensajes que programes.'}</p></div>${switchControl('notifications',state.notificationsEnabled,'Activar notificaciones')}</div><p class="settings-note">Mantén English abierta para recibir los avisos. Si la cierras, los recordatorios pendientes de la última semana aparecerán al volver. Los avisos del sistema dependen de los permisos de tu navegador.</p>${state.reminders.length?state.reminders.map(r=>`<div class="reminder-row"><span class="reminder-time">${esc(r.time)}</span><div class="reminder-info"><h3>${esc(r.message)}</h3><p>${r.days.slice().sort((a,b)=>(a+6)%7-(b+6)%7).map(day=>D.dayNames[day].slice(0,3)).join(' · ')} · ${esc(r.timezone.replaceAll('_',' '))}</p></div>${switchControl('reminder',r.enabled,'Activar recordatorio de las '+r.time,`data-id="${esc(r.id)}"`)}${action('','edit-reminder',`data-id="${esc(r.id)}" aria-label="Editar recordatorio"`,'icon-button','pencil')}${action('','delete-reminder',`data-id="${esc(r.id)}" aria-label="Eliminar recordatorio"`,'icon-button','trash-2')}</div>`).join(''):`<div class="empty-state"><div class="tile-icon amber">${icon('alarm-clock')}</div><h2>Haz de aprender un hábito</h2><p>Un mensaje a tiempo puede ser el comienzo de una buena rutina.</p>${action('Crear recordatorio','new-reminder','','outline-button','plus')}</div>`}</section>`;
  }
  function settingsPage() {
    const permission='Notification' in window?Notification.permission:'unsupported';
    return `${title('Sistema','Haz que English se sienta como tu espacio.')}<section class="card settings-card"><h2 class="settings-title">Notificaciones</h2><div class="settings-row"><div><strong>Activar notificaciones de la web</strong><p>Recibe los recordatorios que configures con tus propios mensajes.</p></div>${switchControl('notifications',state.notificationsEnabled,'Activar notificaciones de la web')}</div><div class="page-actions">${action('Enviar prueba','test-notification',state.notificationsEnabled?'':'disabled','outline-button','bell-ring')}${link('Configurar recordatorios','recordatorio')}</div>${permission==='denied'?'<p class="settings-note">El navegador bloquea los avisos del sistema. Puedes permitirlos en los ajustes del sitio. Los avisos dentro de English siguen funcionando.</p>':permission==='unsupported'?'<p class="settings-note">Tu navegador no ofrece avisos del sistema. Los recordatorios aparecerán dentro de English.</p>':''}</section><section class="card settings-card"><h2 class="settings-title">Apariencia</h2><p class="help-text">Elige tus colores y la luz que te acompaña.</p><div class="settings-row"><div><strong>Modo oscuro</strong><p>Una apariencia más suave para estudiar de noche.</p></div>${switchControl('dark',state.dark,'Modo oscuro')}</div><div class="section-label"><h2>Tema de la web</h2><span class="help-text">12 opciones</span></div><fieldset class="theme-grid"><legend class="sr-only">Elige un tema de color</legend>${D.themes.map(t=>`<label class="theme-choice"><input type="radio" name="palette" value="${t.id}" ${state.palette===t.id?'checked':''}><span class="theme-mini" aria-hidden="true"><span class="theme-rail"><i style="background:${t.color}"></i><i style="background:var(--border)"></i><i style="background:var(--border)"></i></span><span class="theme-body"><span class="theme-banner" style="display:block;background:linear-gradient(110deg,${t.deep},${t.color})"></span><span class="theme-lines"><i></i><i></i></span></span></span><span class="theme-label">${t.name}${state.palette===t.id?icon('check'):''}</span></label>`).join('')}</fieldset></section><p class="settings-note">Tus listas, recordatorios y rachas se guardan en este navegador. Conserva los datos del sitio para no perderlos.</p>`;
  }
  function guidePage() {
    const steps=[['Construye tu base','Empieza por el verbo to be, los pronombres y las preguntas más habituales. Lee ejemplos en inglés y en español.','grammars','Explorar grammars'],['Aprende palabras en contexto','Elige una categoría de tu día a día. Guarda las palabras que te interesen y pronúncialas en voz alta.','vocabularios','Abrir vocabularios'],['Escucha, lee y habla','Escucha una frase, repítela y después intenta decirla sin mirar. Alterna la escucha con lecturas cortas.','listening','Practicar listening'],['Convierte la práctica en un hábito','Completa el ejercicio del día para mantener tu racha. Usa las prácticas y el test para repasar.','practicas','Ir a prácticas']];
    return title('Guía de aprendizaje','Un camino sencillo para empezar y seguir avanzando.')+`<div class="lesson-list">${steps.map(([name,body,route,label],i)=>`<article class="card lesson-row"><span class="lesson-number">0${i+1}</span><div><h2>${name}</h2><p>${body}</p>${link(label,route)}</div></article>`).join('')}</div>`;
  }
  function grammarsPage() {
    return title('Grammars','Entiende la estructura. Después, dale tu propia voz.')+`<div class="lesson-list">${D.grammar.map((g,i)=>`<article class="card lesson-row"><span class="lesson-number">0${i+1}</span><div><h2>${esc(g.title)}</h2><p>${esc(g.body)}</p><div class="example-block"><span lang="en">${esc(g.en)}</span><small>${esc(g.es)}</small></div>${action('Escuchar ejemplos','speak',`data-text="${esc(g.en)}"`,'text-link','volume-2')}</div></article>`).join('')}</div>`;
  }
  function questionsPage() {
    return title('Preguntas','Expresiones útiles para empezar una conversación.')+`<div class="split-grid">${D.questions.map(([en,es,answer])=>`<article class="card"><div class="card-top"><h2 class="settings-title" lang="en">${esc(en)}</h2>${audio(en)}</div><p class="help-text">${esc(es)}</p><div class="example-block"><small>Una posible respuesta</small><span lang="en">${esc(answer)}</span></div></article>`).join('')}</div>`;
  }
  function verbTable(items,type) {
    const isIrregular=type==='irregulares';
    return `<div class="card native-table-wrap verb-table-card"><table class="study-table verb-table"><thead><tr><th scope="col">Presente</th><th scope="col">Pasado</th><th scope="col">Participio</th><th scope="col">Español</th><th scope="col"><span class="sr-only">Pronunciación</span></th></tr></thead><tbody>${items.map(([present,past,part,es])=>{const spoken=present==='read'?'I read every day. Yesterday, I read a book. I have read this book.':present==='misread'?'I sometimes misread a word. Yesterday, I misread that sentence. I have misread it before.':present==='proofread'?'I proofread reports. Yesterday, I proofread this document. I have proofread it twice.':`${present}. ${past.replaceAll(' / ',' or ').replaceAll('/',' or ')}. ${part.replaceAll(' / ',' or ').replaceAll('/',' or ')}.`;return `<tr><td lang="en"><strong>${esc(present)}</strong>${isIrregular?'<span class="verb-type-dot" aria-hidden="true"></span>':''}</td><td lang="en">${esc(past)}</td><td lang="en">${esc(part)}</td><td>${esc(es)}</td><td>${audio(spoken)}</td></tr>`;}).join('')}</tbody></table></div>`;
  }
  function verbsPage() {
    if(ui.detail==='regulares') {
      return `<div class="back-link">${link('Tipos de verbos','verbos','text-link','arrow-left')}</div>${title('Verbos regulares',`${D.regularVerbs.length} verbos importantes. El pasado y el participio se forman normalmente con -ed.`)}<div class="card verb-guide"><div class="card-label">${icon('info')} Regla rápida</div><p>En la mayoría de los verbos regulares añadimos <strong>-ed</strong>. Si terminan en consonante + <strong>y</strong>, normalmente cambia a <strong>-ied</strong>; algunos verbos cortos duplican la consonante final.</p><div class="example-block" lang="en">work → worked · study → studied · stop → stopped</div></div>${verbTable(D.regularVerbs,'regulares')}`;
    }
    if(ui.detail==='irregulares') {
      return `<div class="back-link">${link('Tipos de verbos','verbos','text-link','arrow-left')}</div>${title('Verbos irregulares',`${D.irregularVerbs.length} verbos y variantes de uso frecuente. Aprende presente, pasado y participio.`)}<div class="card verb-guide"><div class="card-label">${icon('info')} No siguen una sola regla</div><p>Los verbos irregulares cambian de forma de distintas maneras. Algunos no cambian, otros cambian una vocal y otros tienen una forma completamente diferente.</p><div class="example-block" lang="en">go → went → gone · cut → cut → cut · write → wrote → written</div></div>${verbTable(D.irregularVerbs,'irregulares')}<p class="help-text gap-top"><strong>Read</strong> se escribe igual en las tres formas, pero cambia de pronunciación en pasado y participio. El audio usa una frase completa para distinguirlas.</p>`;
    }
    return `${title('Verbos','Estudia los verbos por tipo y escucha su pronunciación en presente, pasado y participio.')}<div class="subpage-grid verb-type-grid"><a class="category-card verb-type-card" href="#/verbos/regulares"><div class="card-top"><span class="tile-icon">${icon('check')}</span><span class="small-pill">${D.regularVerbs.length}</span></div><h2>Regulares</h2><p>Los verbos más importantes que forman el pasado y el participio principalmente con <strong>-ed</strong>.</p><div class="verb-card-example" lang="en">work · worked · worked</div></a><a class="category-card verb-type-card" href="#/verbos/irregulares"><div class="card-top"><span class="tile-icon amber">${icon('languages')}</span><span class="small-pill">${D.irregularVerbs.length}</span></div><h2>Irregulares</h2><p>Formas que debes aprender porque no siguen una única regla para pasado y participio.</p><div class="verb-card-example" lang="en">go · went · gone</div></a></div>`;
  }
  function connectorsPage() {
    return title('Conectores','Une tus ideas y haz que tus frases fluyan.')+`<div class="subpage-grid">${D.connectors.map(([en,es,example])=>`<article class="card"><div class="card-top"><h2 class="settings-title" lang="en">${en}</h2>${audio(example)}</div><p class="help-text">${es}</p><div class="example-block" lang="en">${esc(example)}</div></article>`).join('')}</div>`;
  }
  function numbersPage() {
    const names=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
    const numbers=[...names.map((name,i)=>[String(i),name]),['30','thirty'],['40','forty'],['50','fifty'],['60','sixty'],['70','seventy'],['80','eighty'],['90','ninety'],['100','one hundred'],['1,000','one thousand']];
    return title('Números','Del cero al mil. Toca un número para escucharlo.')+`<div class="numbers-grid">${numbers.map(([n,en])=>`<button type="button" class="card number-card" data-action="speak" data-text="${en}" aria-label="Escuchar ${n}: ${en}"><strong>${n}</strong><p lang="en">${en}</p></button>`).join('')}</div><div class="card gap-top"><div class="card-label">${icon('lightbulb')} Forma nuevos números</div><div class="example-block"><span lang="en">21 → twenty-one · 48 → forty-eight · 99 → ninety-nine</span><small>Une las decenas y las unidades con un guion cuando el número no sea una decena exacta.</small></div></div>`;
  }
  function readingsPage() {
    const r=D.readings[ui.reading];
    return title('Lecturas','Historias cortas para entender un poco más cada día.')+`<div class="page-actions back-link">${D.readings.map((r,i)=>action(esc(r.title),'select-reading',`data-index="${i}"`,i===ui.reading?'primary-button':'outline-button')).join('')}</div><article class="card reading-card"><div class="card-top"><span class="small-pill">${esc(r.level)}</span>${action('Escuchar lectura','speak',`data-text="${esc(r.text)}"`,'text-link','volume-2')}</div><h2 class="settings-title gap-top" lang="en">${esc(r.title)}</h2><p class="reading-text" lang="en">${esc(r.text)}</p>${action(ui.translation?'Ocultar traducción':'Ver traducción','translation','','text-link')}${ui.translation?`<p class="example-block">${esc(r.translation)}</p>`:''}<div class="section-label"><h2>Comprueba tu comprensión</h2></div><p lang="en">${esc(r.question)}</p>${choices(r,ui.readingValue,'reading')}${ui.readingChecked?feedback(Number(ui.readingValue)===r.answer,Number(ui.readingValue)===r.answer?'¡Correcto! Entendiste la idea.':'Vuelve a leer la historia y prueba otra respuesta.'):''}${action('Comprobar','reading-answer',ui.readingValue===''?'disabled':'','primary-button','check')}</article>`;
  }
  function speakingPage() {
    const q=D.questions[ui.speaking];
    return title('Speaking','Escucha, repite y responde en voz alta a tu ritmo.')+`<article class="card practice-card"><div class="card-top"><div class="card-label">${icon('mic')} Conversación cotidiana</div><span class="small-pill">${ui.speaking+1} de ${D.questions.length}</span></div><h2 class="exercise-question" lang="en">${esc(q[0])}</h2><p class="help-text">${esc(q[1])}</p><div class="page-actions gap-top">${action('Escuchar despacio','speak',`data-text="${esc(q[0])}" data-rate="0.78"`,'primary-button','volume-2')}${action('Velocidad normal','speak',`data-text="${esc(q[0])}" data-rate="1"`,'outline-button')}</div><div class="example-block"><small>Repite la pregunta. Después, responde con tus propios datos:</small><span lang="en">${esc(q[2])}</span></div><p class="help-text gap-top">Imita el ritmo de la frase. Vuelve a decirla sin mirar y cambia una palabra para hacerla tuya.</p><div class="exercise-actions gap-top">${action('Anterior','speaking-prev',ui.speaking===0?'disabled':'','outline-button','arrow-left')}${action(ui.speaking===D.questions.length-1?'Volver al inicio':'Siguiente frase','speaking-next','','primary-button','arrow-right')}</div></article>`;
  }
  const listeningExercises=[{audio:'I usually have breakfast at seven thirty.',question:'¿A qué hora desayuna la persona?',options:['7:00','7:30','8:30'],answer:1,explanation:'Seven thirty significa siete y media.',topic:'Rutinas'},{audio:'The library is next to the supermarket.',question:'¿Dónde está la biblioteca?',options:['Junto al supermercado','Frente al parque','Dentro de la escuela'],answer:0,explanation:'Next to significa al lado de o junto a.',topic:'Lugares'},{audio:'I would like a cup of tea and a sandwich, please.',question:'¿Qué pide la persona?',options:['Café y pan','Agua y ensalada','Té y un sándwich'],answer:2,explanation:'A cup of tea es una taza de té.',topic:'Comida'}];
  function listeningPage() {
    const e=listeningExercises[ui.listening];
    return title('Listening','Entrena tu oído con frases cortas y claras.')+`<article class="card practice-card"><div class="card-top"><div class="card-label">${icon('headphones')} ${e.topic}</div><span class="small-pill">${ui.listening+1} de ${listeningExercises.length}</span></div><div class="empty-state"><div class="tile-icon">${icon('headphones')}</div>${action('Escuchar frase','speak',`data-text="${esc(e.audio)}" data-rate="0.8"`,'primary-button','volume-2')}</div><h2 class="exercise-question">${e.question}</h2>${choices(e,ui.listeningValue,'listening')}${ui.listeningChecked?feedback(Number(ui.listeningValue)===e.answer,Number(ui.listeningValue)===e.answer?'¡Correcto! '+e.explanation:'Escucha otra vez y vuelve a intentarlo.'):''}<div class="exercise-actions">${action(ui.transcript?'Ocultar transcripción':'Ver transcripción','transcript','','text-link')}${action('Comprobar','listening-answer',ui.listeningValue===''?'disabled':'','primary-button','check')}</div>${ui.transcript?`<div class="example-block" lang="en">${esc(e.audio)}</div>`:''}<div class="gap-top">${action('Siguiente audio','listening-next','','outline-button','arrow-right')}</div></article>`;
  }
  function practicePage(isTest) {
    const index=isTest?ui.test:ui.practice, value=isTest?ui.testValue:ui.practiceValue, count=isTest?10:D.exercises.length;
    const e=D.exercises[index];
    const heading=title(isTest?'Test':'Prácticas',isTest?'10 preguntas para comprobar tu base de inglés. Sin límite de tiempo.':'Practica sin presión. Cada respuesta es una oportunidad para aprender.');
    if(isTest && ui.testFinished) {
      const score=ui.testAnswers.reduce((n,a,i)=>n+(a===D.exercises[i].answer?1:0),0);
      return heading+`<article class="card practice-card"><div class="test-result"><div class="score-ring">${score}/10</div><h2 class="settings-title">${score>=8?'¡Muy buen trabajo!':'Cada intento te ayuda a avanzar.'}</h2><p class="help-text">Repasa las respuestas y vuelve a intentarlo cuando quieras.</p><div class="gap-top">${action('Repetir test','restart-test','','primary-button','rotate-ccw')}</div></div>${ui.testAnswers.map((a,i)=>feedback(a===D.exercises[i].answer,`${i+1}. ${D.exercises[i].question.replace('___',D.exercises[i].options[D.exercises[i].answer])} ${D.exercises[i].explanation}`)).join('')}</article>`;
    }
    return heading+`<article class="card practice-card"><div class="card-top"><span class="card-label">${icon('book-open')} ${esc(e.topic)}</span><span class="small-pill">${index+1} / ${count}</span></div><progress max="${count}" value="${index}" aria-label="Avance de las preguntas"></progress><h2 class="exercise-question" lang="en">${esc(e.question)}</h2><p class="help-text">Elige la opción que completa la oración.</p>${choices(e,value,isTest?'test':'practice')}${!isTest&&ui.practiceChecked?feedback(Number(value)===e.answer,(Number(value)===e.answer?'¡Correcto! ':`Respuesta: ${e.options[e.answer]}. `)+e.explanation):''}<div class="exercise-actions"><span class="exercise-meta">${icon('clock-3')} A tu ritmo</span>${isTest?action(index===count-1?'Ver resultado':'Siguiente','test-next',value===''?'disabled':'','primary-button','arrow-right'):ui.practiceChecked?action('Siguiente','practice-next','','primary-button','arrow-right'):action('Comprobar','practice-answer',value===''?'disabled':'','primary-button','check')}</div></article>`;
  }
  function gamesPage() {
    if(ui.detail==='match-the-pairs')return matchPairs.page();
    return title('Juegos','Elige tu próximo reto y pon tu inglés en movimiento.')+`
    <div class="games-library">
      <article class="game-cover">
        <div class="game-cover-art guess-cover" aria-hidden="true">
          <span class="cover-status">Coming soon</span>
          <div class="guess-symbol">?</div>
          <span class="guess-label">LOOK · THINK · GUESS</span>
        </div>
        <div class="game-cover-body"><h2 lang="en">Guess the image</h2><p>Una imagen, una palabra. Un nuevo reto visual está por llegar.</p>
          <button type="button" class="outline-button game-cover-button" disabled>Coming soon</button>
        </div>
      </article>
      <article class="game-cover game-cover-ready">
        <div class="game-cover-art runner-cover" aria-hidden="true">
          <span class="cover-status cover-status-ready">Easy disponible</span>
          <span class="cover-word word-chair">chair</span><span class="cover-word word-police">police officer</span><span class="cover-word word-tree">tree</span>
          <img src="english-mascot.png" class="cover-mascot" width="180" height="180" alt="">
          <div class="cover-track"></div>
        </div>
        <div class="game-cover-body"><h2 lang="en">English game</h2><p>Salta y toca las palabras de tu vocabulario. Diez aciertos, tres strikes y tú al mando.</p>
          <a href="english-game.html" target="_blank" rel="noopener" class="primary-button game-cover-button" aria-label="Jugar English game en una ventana nueva">Jugar ahora ${icon('arrow-right')}</a>
          <small class="game-window-note">Se abre en otra ventana o pestaña.</small>
        </div>
      </article>
      <article class="game-cover game-cover-ready match-cover-card">
        <div class="game-cover-art match-game-cover" aria-hidden="true">
          <div class="match-cover-grid"><span>EN</span><span>?</span><span>ES</span><span>?</span><span>?</span><span>EN</span><span>?</span><span>ES</span></div>
          <div class="match-cover-pair pair-a"><b>chair</b><small>silla</small></div><div class="match-cover-pair pair-b"><b>nurse</b><small>enfermero/a</small></div>
          <span class="match-cover-badge">Nuevo</span>
        </div>
        <div class="game-cover-body"><h2 lang="en">Match the Pairs</h2><p>Encuentra las 10 parejas Inglés ↔ Español antes de quedarte sin movimientos.</p>
          <div class="match-cover-features"><span>Memoria</span><span>20 movimientos</span><span>4 × 5</span></div>
          ${link('Jugar ahora','juegos/match-the-pairs','primary-button game-cover-button','arrow-right')}
        </div>
      </article>
    </div>`;
  }
  function render() {
    if(ui.view!=='juegos'||ui.detail!=='match-the-pairs')matchPairs.leave();
    const pages={inicio:home,guia:guidePage,grammars:grammarsPage,preguntas:questionsPage,lecturas:readingsPage,verbos:verbsPage,vocabularios:vocabularies,speaking:speakingPage,listening:listeningPage,conectores:connectorsPage,numeros:numbersPage,practicas:()=>practicePage(false),test:()=>practicePage(true),sistema:settingsPage,listas:listsPage,recordatorio:remindersPage,juegos:gamesPage};
    const node=$('#view');
    if(ui.view==='aula')aula.mount(node,ui.detail);
    else {aula.leave();node.innerHTML=(pages[ui.view]||home)();}
    document.querySelectorAll('[data-route]').forEach(link=>{if(link.dataset.route===ui.view)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
    const h1=node.querySelector('h1');
    document.title=`${h1?.textContent || 'Aprende a tu ritmo'} · English`;
    updateHeader();
  }
  function setMenu(open) {
    const mobile=matchMedia('(max-width:767px)').matches;
    if(mobile) { ui.mobileMenu=open;document.body.classList.toggle('mobile-menu-open',open);$('#sidebar-shade').hidden=!open;$('#contenido').inert=open; }
    else { document.body.classList.toggle('sidebar-closed',!open);$('#contenido').inert=false; }
    $('#sidebar').inert=!open;
    $('#menu-button').setAttribute('aria-expanded',String(open));
  }
  function navigate() {
    if(location.hash && !location.hash.startsWith('#/')) return;
    let hash='inicio';try { hash=decodeURIComponent(location.hash.replace(/^#\/?/,''))||'inicio'; } catch {}
    const [view,detail='']=hash.split('/');
    ui.view=views.has(view)?view:'inicio'; ui.detail=detail;
    if(matchMedia('(max-width:767px)').matches) setMenu(false);
    render(); window.scrollTo({top:0});
  }
  function showDialog(type, heading, description, body) {
    ui.modal=type; if(!modal.open)modalTrigger=document.activeElement;
    $('#dialog-title').textContent=heading;$('#dialog-description').textContent=description;$('#dialog-body').innerHTML=body;
    if(!modal.open) modal.showModal();
    const focus=modal.querySelector('input:not([type="checkbox"]):not([type="radio"]),textarea');
    if(focus) focus.focus();
  }
  function closeDialog() { modal.close(); ui.modal=null; if(modalTrigger?.isConnected)modalTrigger.focus(); }
  function listDialog(word=null,list=null) {
    ui.selectedWord=word;ui.editId=list?.id||null;
    showDialog('list',list?'Cambiar nombre':'Una nueva lista','Organiza las palabras que quieres aprender.',`<form id="list-form" class="form-stack"><div><label for="list-name" class="field-label">Nombre de la lista</label><input id="list-name" name="name" class="text-input" maxlength="60" required autofocus placeholder="Por ejemplo, Inglés para viajar" value="${esc(list?.name||'')}"></div>${word?`<p class="help-text">Incluiremos la palabra <strong>${esc(word.en)}</strong>.</p>`:''}<div class="modal-footer">${action('Cancelar','close-dialog','','outline-button')}<button type="submit" class="primary-button">${icon('check')}${list?'Guardar nombre':'Crear lista'}</button></div></form>`);
  }
  function wordDialog(word) {
    ui.selectedWord=word;
    showDialog('word','Añadir a mis listas',`Elige dónde guardar “${word.en}” (${word.es}).`,`<div class="form-stack">${state.lists.length?state.lists.map(list=>`<label class="list-row"><input class="modal-list-check" type="checkbox" data-setting="word-list" data-list="${esc(list.id)}" data-word="${word.id}" ${list.words.includes(word.id)?'checked':''}><span><strong>${esc(list.name)}</strong><small>${list.words.length} palabras</small></span></label>`).join(''):'<p class="help-text">Crea tu primera lista para empezar a guardar palabras.</p>'}${action('Crear una lista nueva','new-list-with-word','','outline-button','plus')}<div class="modal-footer">${action('Listo','close-dialog','','primary-button','check')}</div></div>`);
  }
  function reminderDialog(reminder=null) {
    ui.editId=reminder?.id||null;
    showDialog('reminder',reminder?'Editar recordatorio':'Tu momento para aprender','Elige los días, la hora y el mensaje de tu recordatorio.',`<form id="reminder-form" class="form-stack"><div><label for="reminder-time" class="field-label">¿A qué hora?</label><input id="reminder-time" class="text-input" name="time" type="time" value="${esc(reminder?.time||'19:00')}" required></div><fieldset><legend class="field-label">¿Qué días?</legend><div class="days-grid">${[1,2,3,4,5,6,0].map(day=>`<label class="day-choice"><input type="checkbox" name="days" value="${day}" ${(reminder?.days||[1,2,3,4,5]).includes(day)?'checked':''} aria-label="${D.dayNames[day]}">${D.dayNames[day].slice(0,3)}</label>`).join('')}</div></fieldset><div><label for="reminder-message" class="field-label">Tu mensaje</label><textarea id="reminder-message" class="text-input" name="message" maxlength="180" required>${esc(reminder?.message||'¡Es tu momento! Dedica unos minutos a aprender inglés.')}</textarea><p class="help-text">Hasta 180 caracteres.</p></div><p class="settings-note">Mantén English abierta para recibir los avisos.${state.notificationsEnabled?'':' Activa las notificaciones para recibirlos.'}</p><div class="modal-footer">${action('Cancelar','close-dialog','','outline-button')}<button type="submit" class="primary-button">${icon('check')} Guardar recordatorio</button></div></form>`);
  }
  function deleteDialog(type,id) {
    const record=(type==='list'?state.lists:state.reminders).find(r=>r.id===id);if(!record)return;
    ui.deleteTarget={type,id};
    showDialog('delete',type==='list'?'¿Eliminar esta lista?':'¿Eliminar este recordatorio?',`Se eliminará “${record.name||record.message}”. ${type==='list'?'Las palabras seguirán disponibles en los vocabularios.':'Dejarás de recibir este aviso.'}`,`<div class="modal-footer">${action('Cancelar','close-dialog','','outline-button')}${action('Eliminar','confirm-delete','','primary-button danger-button','trash-2')}</div>`);
  }
  function notificationsDialog() {
    showDialog('notifications','Notificaciones','Tus recordatorios y avisos de English.',`<div class="notifications-panel">${state.notifications.some(n=>!n.read)?action('Marcar todas como leídas','read-notifications','','text-link','check'):''}${state.notifications.length?state.notifications.map(n=>`<article class="notification-item ${n.read?'':'unread'}"><span class="tile-icon">${icon('bell')}</span><div><h3>${esc(n.message)}</h3><p>${new Intl.DateTimeFormat('es-DO',{dateStyle:'medium',timeStyle:'short'}).format(new Date(n.createdAt))}</p></div></article>`).join(''):`<div class="empty-state"><div class="tile-icon">${icon('bell')}</div><h2>Todo al día</h2><p>Cuando llegue la hora de aprender, tus recordatorios aparecerán aquí.</p>${action('Configurar recordatorios','go-reminders','','outline-button','arrow-right')}</div>`}</div>`);
  }
  function speak(text,rate=0.85) {
    if(!('speechSynthesis' in window)) { toast('Tu navegador no permite reproducir la pronunciación.','error');return; }
    speechSynthesis.cancel();
    const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-US';utterance.rate=rate;
    const voices=speechSynthesis.getVoices();const voice=voices.find(v=>v.lang==='en-US')||voices.find(v=>v.lang.startsWith('en'));
    if(voice)utterance.voice=voice;
    utterance.onerror=event=>{if(!['interrupted','canceled'].includes(event.error))toast('No se pudo reproducir el audio. Comprueba las voces disponibles en tu navegador.','error');};
    speechSynthesis.speak(utterance);
  }
  async function nativeNotice(notice) {
    if(!('Notification' in window)||Notification.permission!=='granted')return false;
    try {
      const registration='serviceWorker' in navigator && location.protocol!=='file:'?await navigator.serviceWorker.getRegistration():null;
      if(registration?.active) await registration.showNotification('English · Tu momento de aprender',{body:notice.message,tag:notice.id,data:{url:new URL('index.html#/recordatorio',document.baseURI).href}});
      else new Notification('English · Tu momento de aprender',{body:notice.message,tag:notice.id});
      return true;
    } catch { return false; }
  }
  async function notificationSetting(enabled) {
    if(enabled && 'Notification' in window && Notification.permission==='default') {
      try { await Notification.requestPermission(); } catch { /* Los avisos internos siguen disponibles. */ }
    }
    const result=await update(d=>{d.notificationsEnabled=enabled;d.lastReminderCheck=Date.now();});
    if(result.ok)toast(enabled?'Avisos de English activados.':'Avisos desactivados.');else render();
  }
  async function checkReminders() {
    if(dateKey()!==today) { today=dateKey();ui.dailyValue='';ui.dailyFeedback=null;render(); }
    if(!storageWorks)return;
    const result=await update(d=>dueReminders(d,Date.now()),false);
    if(!result.ok || !result.result.length)return;
    const due=result.result;
    const notice=due.length>1?{id:'pending-'+Date.now(),message:`Tienes ${due.length} recordatorios pendientes. Abre las notificaciones para verlos.`,createdAt:Date.now(),read:false}:due[0];
    toast(notice.message);void nativeNotice(notice);
    if(ui.modal==='notifications')notificationsDialog();
  }
  const tabId=id();
  let serverAvailable=false;
  const presenceEndpoint=location.protocol==='file:'?null:new URL('api/presence',document.baseURI).href;
  function showLocalPresence() {
    $('#presence-count').textContent=document.visibilityState==='visible'?'1':'0';$('#presence-label').textContent='local';
    $('#presence').title='Actividad en esta página. Para contar visitantes de distintos dispositivos, usa el servidor opcional incluido.';
  }
  async function presence() {
    if(!presenceEndpoint){showLocalPresence();return;}
    const controller=new AbortController(), timeout=setTimeout(()=>controller.abort(),5000);
    try {
      const response=await fetch(presenceEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({tabId,visible:document.visibilityState==='visible'}),signal:controller.signal,credentials:'same-origin'});
      if(!response.ok)throw new Error('Unavailable');const result=await response.json();
      if(!Number.isInteger(result.online)||result.online<0)throw new Error('Invalid count');
      serverAvailable=true;$('#presence-count').textContent=result.online;$('#presence-label').textContent='en línea';
      $('#presence').title='Sesiones con al menos una pestaña visible durante los últimos 100 segundos.';
    } catch {serverAvailable=false;showLocalPresence();}
    finally {clearTimeout(timeout);}
  }
  async function handleAction(button) {
    const type=button.dataset.action;
    switch(type) {
      case 'menu':setMenu($('#menu-button').getAttribute('aria-expanded')!=='true');break;
      case 'match-card':matchPairs.flip(Number(button.dataset.index));break;
      case 'match-new':matchPairs.newGame();break;
      case 'match-sound':matchPairs.toggleSound(button);break;
      case 'toggle-theme':await update(d=>{d.dark=!d.dark;});break;
      case 'notifications':notificationsDialog();break;
      case 'close-dialog':closeDialog();break;
      case 'speak':speak(button.dataset.text,Number(button.dataset.rate)||0.85);break;
      case 'new-list':listDialog();break;
      case 'new-list-with-word':listDialog(ui.selectedWord);break;
      case 'word-lists':{const word=wordMap[button.dataset.word];if(word)wordDialog(word);break;}
      case 'rename-list':{const list=state.lists.find(l=>l.id===button.dataset.id);if(list)listDialog(null,list);break;}
      case 'delete-list':deleteDialog('list',button.dataset.id);break;
      case 'export-list-pdf':{const list=state.lists.find(l=>l.id===button.dataset.id);if(list)printListPdf(list);else toast('No encontramos esa lista.','error');break;}
      case 'remove-word':{
        const result=await update(d=>{const list=d.lists.find(l=>l.id===button.dataset.list);if(list)list.words=list.words.filter(w=>w!==button.dataset.word);});
        if(result.ok)toast('Palabra quitada de la lista.');break;
      }
      case 'daily-answer':{
        if(ui.dailyValue==='')return;
        if(today!==dateKey()){await checkReminders();toast('Ya comenzó un nuevo día. Resuelve el nuevo ejercicio.');return;}
        const exercise=D.exercises[indexFor(today,D.exercises.length)],correct=Number(ui.dailyValue)===exercise.answer;
        ui.dailyFeedback={correct,text:(correct?'¡Correcto! ':'Inténtalo otra vez. ')+exercise.explanation};
        if(correct)await update(d=>{if(!d.studyDays.includes(today))d.studyDays.push(today);});else render();
        break;
      }
      case 'new-reminder':reminderDialog();break;
      case 'edit-reminder':{const r=state.reminders.find(r=>r.id===button.dataset.id);if(r)reminderDialog(r);break;}
      case 'delete-reminder':deleteDialog('reminder',button.dataset.id);break;
      case 'confirm-delete':{
        if(!ui.deleteTarget)return;const target=clone(ui.deleteTarget);
        const result=await update(d=>{if(target.type==='list')d.lists=d.lists.filter(l=>l.id!==target.id);else d.reminders=d.reminders.filter(r=>r.id!==target.id);});
        if(result.ok){closeDialog();toast('Eliminado.');}break;
      }
      case 'go-reminders':closeDialog();go('recordatorio');break;
      case 'read-notifications':{
        const result=await update(d=>{d.notifications.forEach(n=>{n.read=true;});});if(result.ok)notificationsDialog();break;
      }
      case 'test-notification':{
        if(!state.notificationsEnabled)return;
        const notice={id:'test-'+id(),message:'¡Todo listo! Es tu momento de aprender inglés.',createdAt:Date.now(),read:false};
        const result=await update(d=>{d.notifications.unshift(notice);d.notifications=d.notifications.slice(0,100);});
        if(result.ok){const sent=await nativeNotice(notice);toast(sent?'Aviso de prueba enviado.':'Aviso de prueba añadido a la campana de English.');}break;
      }
      case 'select-reading':ui.reading=Number(button.dataset.index);ui.readingValue='';ui.readingChecked=false;ui.translation=false;render();break;
      case 'translation':ui.translation=!ui.translation;render();break;
      case 'reading-answer':if(ui.readingValue!==''){ui.readingChecked=true;render();}break;
      case 'speaking-prev':ui.speaking=Math.max(0,ui.speaking-1);render();break;
      case 'speaking-next':ui.speaking=(ui.speaking+1)%D.questions.length;render();break;
      case 'transcript':ui.transcript=!ui.transcript;render();break;
      case 'listening-answer':if(ui.listeningValue!==''){ui.listeningChecked=true;render();}break;
      case 'listening-next':ui.listening=(ui.listening+1)%listeningExercises.length;ui.listeningValue='';ui.listeningChecked=false;ui.transcript=false;render();break;
      case 'practice-answer':if(ui.practiceValue!==''){ui.practiceChecked=true;render();}break;
      case 'practice-next':ui.practice=(ui.practice+1)%D.exercises.length;ui.practiceValue='';ui.practiceChecked=false;render();break;
      case 'test-next':
        if(ui.testValue==='')return;
        ui.testAnswers.push(Number(ui.testValue));
        if(ui.test===9)ui.testFinished=true;else ui.test++;
        ui.testValue='';render();break;
      case 'restart-test':ui.test=0;ui.testValue='';ui.testAnswers=[];ui.testFinished=false;render();break;
    }
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-action]');
    if(button && !button.disabled)void handleAction(button).catch(error=>toast(error.message||'No se pudo completar la acción.','error'));
  });
  document.addEventListener('change',async event=>{
    const input=event.target;
    if(input.matches('input[type="radio"]') && ['daily','reading','listening','practice','test'].includes(input.name)) {
      const keys={daily:'dailyValue',reading:'readingValue',listening:'listeningValue',practice:'practiceValue',test:'testValue'};
      ui[keys[input.name]]=input.value;
      if(input.name==='daily')ui.dailyFeedback=null;
      if(input.name==='reading')ui.readingChecked=false;
      if(input.name==='listening')ui.listeningChecked=false;
      if(input.name==='practice')ui.practiceChecked=false;
      const name=input.name,value=input.value;render();
      document.querySelector(`input[name="${name}"][value="${value}"]`)?.focus({preventScroll:true});return;
    }
    if(input.name==='palette') {const result=await update(d=>{d.palette=input.value;});if(!result.ok)render();return;}
    if(input.dataset.setting==='dark') {const result=await update(d=>{d.dark=input.checked;});if(!result.ok)render();return;}
    if(input.dataset.setting==='notifications') {await notificationSetting(input.checked);return;}
    if(input.dataset.setting==='reminder') {
      const result=await update(d=>{const r=d.reminders.find(r=>r.id===input.dataset.id);if(r){r.enabled=input.checked;if(r.enabled)r.createdAt=Date.now();}});
      if(!result.ok)render();return;
    }
    if(input.dataset.setting==='word-list') {
      const wanted=input.checked;
      const result=await update(d=>{
        const list=d.lists.find(l=>l.id===input.dataset.list);if(!list)throw new Error('No encontramos esa lista.');
        const wordId=input.dataset.word;if(!wordMap[wordId])throw new Error('No encontramos esa palabra.');
        if(wanted&&!list.words.includes(wordId))list.words.push(wordId);
        if(!wanted)list.words=list.words.filter(w=>w!==wordId);
      });
      if(result.ok){const list=state.lists.find(l=>l.id===input.dataset.list);input.closest('label').querySelector('small').textContent=list.words.length+' palabras';toast(wanted?'Palabra guardada.':'Palabra quitada de la lista.');}
      else input.checked=!wanted;
    }
  });
  document.addEventListener('submit',async event=>{
    const form=event.target;
    if(!['list-form','reminder-form'].includes(form.id))return;
    event.preventDefault();
    const submit=form.querySelector('[type="submit"]');submit.disabled=true;
    try {
      const values=new FormData(form);
      if(form.id==='list-form') {
        const name=String(values.get('name')||'').trim();if(!name || name.length>60)throw new Error('Escribe un nombre de entre 1 y 60 caracteres.');
        const editId=ui.editId, wordId=ui.selectedWord?.id;
        const result=await update(d=>{
          if(d.lists.some(l=>l.id!==editId&&l.name.toLocaleLowerCase()===name.toLocaleLowerCase()))throw new Error('Ya tienes una lista con ese nombre.');
          if(editId){const list=d.lists.find(l=>l.id===editId);if(!list)throw new Error('No encontramos esa lista.');list.name=name;}
          else {if(d.lists.length>=50)throw new Error('Puedes crear hasta 50 listas.');d.lists.push({id:id(),name,words:wordId&&wordMap[wordId]?[wordId]:[]});}
        });
        if(result.ok){closeDialog();ui.selectedWord=null;toast(editId?'Nombre actualizado.':'Lista creada.');}
      } else {
        const time=String(values.get('time')||''),message=String(values.get('message')||'').trim();
        const days=[...new Set(values.getAll('days').map(Number))];
        if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))throw new Error('Elige una hora válida.');
        if(!days.length||days.some(d=>!Number.isInteger(d)||d<0||d>6))throw new Error('Elige al menos un día de la semana.');
        if(!message||message.length>180)throw new Error('Escribe un mensaje de entre 1 y 180 caracteres.');
        const editId=ui.editId;
        const result=await update(d=>{
          if(editId){const r=d.reminders.find(r=>r.id===editId);if(!r)throw new Error('No encontramos ese recordatorio.');Object.assign(r,{time,message,days,createdAt:Date.now()});}
          else {if(d.reminders.length>=20)throw new Error('Puedes crear hasta 20 recordatorios.');d.reminders.push({id:id(),time,message,days,enabled:true,timezone:timezone(),createdAt:Date.now()});}
        });
        if(result.ok){closeDialog();toast('Recordatorio guardado.');}
      }
    } catch(error){toast(error.message||'Revisa los datos del formulario.','error');}
    finally {submit.disabled=false;}
  });
  $('#sidebar-shade').addEventListener('click',()=>{setMenu(false);$('#menu-button').focus();});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&ui.mobileMenu&&!modal.open){setMenu(false);$('#menu-button').focus();}
    if(event.key==='Tab'&&ui.mobileMenu&&!modal.open){
      const focusable=[$('#menu-button'),...$('#sidebar').querySelectorAll('a[href],button:not([disabled])')];
      const first=focusable[0],last=focusable.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  modal.addEventListener('close',()=>{ui.modal=null;});
  window.addEventListener('hashchange',navigate);
  const media=matchMedia('(max-width:767px)');
  media.addEventListener('change',()=>{document.body.classList.remove('mobile-menu-open','sidebar-closed');ui.mobileMenu=false;$('#sidebar-shade').hidden=true;setMenu(!media.matches);});
  window.addEventListener('storage',event=>{
    if(event.key!==KEY)return;
    try {const previous=JSON.stringify([state.lists,state.reminders,state.studyDays,state.notifications,state.palette,state.dark,state.notificationsEnabled]);state=readState();applyAppearance();updateHeader();const next=JSON.stringify([state.lists,state.reminders,state.studyDays,state.notifications,state.palette,state.dark,state.notificationsEnabled]);if(previous!==next)render();}catch{storageWarning('No pudimos leer un cambio guardado en otra pestaña. Recarga la página.');}
  });
  document.addEventListener('visibilitychange',()=>{void presence();if(document.visibilityState==='visible')void checkReminders();});
  window.addEventListener('pagehide',()=>{if(serverAvailable&&presenceEndpoint)navigator.sendBeacon(presenceEndpoint,JSON.stringify({tabId,visible:false}));});
  if('serviceWorker' in navigator && location.protocol!=='file:' && window.isSecureContext) navigator.serviceWorker.register(new URL('sw.js',document.baseURI).href).catch(()=>{});
  paintIcons();applyAppearance();setMenu(!media.matches);navigate();
  void presence();void checkReminders();
  setInterval(()=>{void presence();void checkReminders();},30000);
})();
