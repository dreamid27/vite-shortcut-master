export interface Shortcut {
  id: string;
  keys: string[];
  description: string;
  category: string;
}

export interface ShortcutApp {
  id: string;
  name: string;
  shortcuts: Shortcut[];
}

export const shortcutApps: ShortcutApp[] = [
  {
    id: "figma",
    name: "Figma",
    shortcuts: [
      // Tools
      {
        id: "figma-1",
        keys: ["V"],
        description: "Move tool",
        category: "Tools",
      },
      {
        id: "figma-2",
        keys: ["F"],
        description: "Frame tool",
        category: "Tools",
      },
      {
        id: "figma-3",
        keys: ["P"],
        description: "Pen tool",
        category: "Tools",
      },
      {
        id: "figma-4",
        keys: ["R"],
        description: "Rectangle tool",
        category: "Tools",
      },
      {
        id: "figma-5",
        keys: ["O"],
        description: "Ellipse tool",
        category: "Tools",
      },
      {
        id: "figma-6",
        keys: ["T"],
        description: "Text tool",
        category: "Tools",
      },
      {
        id: "figma-7",
        keys: ["H"],
        description: "Hand tool",
        category: "Tools",
      },
      {
        id: "figma-8",
        keys: ["K"],
        description: "Scale tool",
        category: "Tools",
      },
      {
        id: "figma-9",
        keys: ["C"],
        description: "Add/Show comments",
        category: "Tools",
      },
      {
        id: "figma-10",
        keys: ["S"],
        description: "Slice tool",
        category: "Tools",
      },

      // View
      {
        id: "figma-11",
        keys: ["Cmd", "\\"],
        description: "Show/hide UI",
        category: "View",
      },
      {
        id: "figma-12",
        keys: ["Cmd", "."],
        description: "Show multiplayer cursors",
        category: "View",
      },
      {
        id: "figma-13",
        keys: ["Cmd", "'"],
        description: "Show rulers",
        category: "View",
      },
      {
        id: "figma-14",
        keys: ["Shift", "R"],
        description: "Toggle rulers",
        category: "View",
      },
      {
        id: "figma-15",
        keys: ["Cmd", "Y"],
        description: "Show outlines",
        category: "View",
      },
      {
        id: "figma-16",
        keys: ["Cmd", "P"],
        description: "Pixel preview",
        category: "View",
      },

      // Zoom
      {
        id: "figma-17",
        keys: ["Cmd", "+"],
        description: "Zoom in",
        category: "Zoom",
      },
      {
        id: "figma-18",
        keys: ["Cmd", "-"],
        description: "Zoom out",
        category: "Zoom",
      },
      {
        id: "figma-19",
        keys: ["Cmd", "0"],
        description: "Zoom to 100%",
        category: "Zoom",
      },
      {
        id: "figma-20",
        keys: ["Cmd", "1"],
        description: "Zoom to fit",
        category: "Zoom",
      },
      {
        id: "figma-21",
        keys: ["Cmd", "2"],
        description: "Zoom to selection",
        category: "Zoom",
      },

      // Editing
      {
        id: "figma-22",
        keys: ["Cmd", "C"],
        description: "Copy",
        category: "Editing",
      },
      {
        id: "figma-23",
        keys: ["Cmd", "X"],
        description: "Cut",
        category: "Editing",
      },
      {
        id: "figma-24",
        keys: ["Cmd", "V"],
        description: "Paste",
        category: "Editing",
      },
      {
        id: "figma-25",
        keys: ["Cmd", "D"],
        description: "Duplicate",
        category: "Editing",
      },
      {
        id: "figma-26",
        keys: ["Cmd", "G"],
        description: "Group selection",
        category: "Editing",
      },
      {
        id: "figma-27",
        keys: ["Cmd", "Shift", "G"],
        description: "Ungroup selection",
        category: "Editing",
      },
      {
        id: "figma-28",
        keys: ["Cmd", "E"],
        description: "Flatten selection",
        category: "Editing",
      },
      {
        id: "figma-29",
        keys: ["Cmd", "J"],
        description: "Join selection",
        category: "Editing",
      },
      {
        id: "figma-30",
        keys: ["Delete"],
        description: "Delete selection",
        category: "Editing",
      },

      // Arrangement
      {
        id: "figma-31",
        keys: ["Cmd", "]"],
        description: "Bring forward",
        category: "Arrangement",
      },
      {
        id: "figma-32",
        keys: ["Cmd", "["],
        description: "Send backward",
        category: "Arrangement",
      },
      {
        id: "figma-33",
        keys: ["Cmd", "Option", "]"],
        description: "Bring to front",
        category: "Arrangement",
      },
      {
        id: "figma-34",
        keys: ["Cmd", "Option", "["],
        description: "Send to back",
        category: "Arrangement",
      },
    ],
  },
  {
    id: "vscode",
    name: "VS Code",
    shortcuts: [
      // General
      {
        id: "vscode-1",
        keys: ["Cmd", "Shift", "P"],
        description: "Show command palette",
        category: "General",
      },
      {
        id: "vscode-2",
        keys: ["Cmd", "P"],
        description: "Quick open, go to file",
        category: "General",
      },
      {
        id: "vscode-3",
        keys: ["Cmd", "Shift", "N"],
        description: "New window/instance",
        category: "General",
      },
      {
        id: "vscode-4",
        keys: ["Cmd", "W"],
        description: "Close window/instance",
        category: "General",
      },
      {
        id: "vscode-5",
        keys: ["Cmd", ","],
        description: "User settings",
        category: "General",
      },
      {
        id: "vscode-6",
        keys: ["Cmd", "K", "Cmd", "S"],
        description: "Keyboard shortcuts",
        category: "General",
      },

      // Basic Editing
      {
        id: "vscode-7",
        keys: ["Cmd", "X"],
        description: "Cut line (empty selection)",
        category: "Basic Editing",
      },
      {
        id: "vscode-8",
        keys: ["Cmd", "C"],
        description: "Copy line (empty selection)",
        category: "Basic Editing",
      },
      {
        id: "vscode-9",
        keys: ["Cmd", "V"],
        description: "Paste",
        category: "Basic Editing",
      },
      {
        id: "vscode-10",
        keys: ["Cmd", "Shift", "K"],
        description: "Delete line",
        category: "Basic Editing",
      },
      {
        id: "vscode-11",
        keys: ["Cmd", "Enter"],
        description: "Insert line below",
        category: "Basic Editing",
      },
      {
        id: "vscode-12",
        keys: ["Cmd", "Shift", "Enter"],
        description: "Insert line above",
        category: "Basic Editing",
      },
      {
        id: "vscode-13",
        keys: ["Option", "↓"],
        description: "Move line down",
        category: "Basic Editing",
      },
      {
        id: "vscode-14",
        keys: ["Option", "↑"],
        description: "Move line up",
        category: "Basic Editing",
      },
      {
        id: "vscode-15",
        keys: ["Shift", "Option", "↓"],
        description: "Copy line down",
        category: "Basic Editing",
      },
      {
        id: "vscode-16",
        keys: ["Shift", "Option", "↑"],
        description: "Copy line up",
        category: "Basic Editing",
      },
      {
        id: "vscode-17",
        keys: ["Cmd", "D"],
        description: "Add selection to next find match",
        category: "Basic Editing",
      },
      {
        id: "vscode-18",
        keys: ["Cmd", "/"],
        description: "Toggle line comment",
        category: "Basic Editing",
      },
      {
        id: "vscode-19",
        keys: ["Cmd", "Shift", "/"],
        description: "Toggle block comment",
        category: "Basic Editing",
      },
      {
        id: "vscode-20",
        keys: ["Cmd", "Z"],
        description: "Undo",
        category: "Basic Editing",
      },
      {
        id: "vscode-21",
        keys: ["Cmd", "Shift", "Z"],
        description: "Redo",
        category: "Basic Editing",
      },

      // Navigation
      {
        id: "vscode-22",
        keys: ["Cmd", "T"],
        description: "Show all symbols",
        category: "Navigation",
      },
      {
        id: "vscode-23",
        keys: ["Ctrl", "G"],
        description: "Go to line",
        category: "Navigation",
      },
      {
        id: "vscode-24",
        keys: ["Cmd", "Shift", "O"],
        description: "Go to symbol",
        category: "Navigation",
      },
      {
        id: "vscode-25",
        keys: ["Cmd", "Shift", "M"],
        description: "Show problems panel",
        category: "Navigation",
      },
      {
        id: "vscode-26",
        keys: ["F8"],
        description: "Go to next error or warning",
        category: "Navigation",
      },
      {
        id: "vscode-27",
        keys: ["Shift", "F8"],
        description: "Go to previous error or warning",
        category: "Navigation",
      },

      // Search and Replace
      {
        id: "vscode-28",
        keys: ["Cmd", "F"],
        description: "Find",
        category: "Search and Replace",
      },
      {
        id: "vscode-29",
        keys: ["Cmd", "Option", "F"],
        description: "Replace",
        category: "Search and Replace",
      },
      {
        id: "vscode-30",
        keys: ["Cmd", "Shift", "F"],
        description: "Find in files",
        category: "Search and Replace",
      },
      {
        id: "vscode-31",
        keys: ["Cmd", "Shift", "H"],
        description: "Replace in files",
        category: "Search and Replace",
      },

      // Multi-cursor and Selection
      {
        id: "vscode-32",
        keys: ["Option", "Click"],
        description: "Insert cursor",
        category: "Multi-cursor",
      },
      {
        id: "vscode-33",
        keys: ["Cmd", "Option", "↑"],
        description: "Insert cursor above",
        category: "Multi-cursor",
      },
      {
        id: "vscode-34",
        keys: ["Cmd", "Option", "↓"],
        description: "Insert cursor below",
        category: "Multi-cursor",
      },
      {
        id: "vscode-35",
        keys: ["Cmd", "Shift", "L"],
        description: "Select all occurrences of current selection",
        category: "Multi-cursor",
      },
      {
        id: "vscode-36",
        keys: ["Cmd", "L"],
        description: "Select current line",
        category: "Multi-cursor",
      },

      // Display
      {
        id: "vscode-37",
        keys: ["Cmd", "B"],
        description: "Toggle sidebar visibility",
        category: "Display",
      },
      {
        id: "vscode-38",
        keys: ["Cmd", "Shift", "E"],
        description: "Show explorer / toggle focus",
        category: "Display",
      },
      {
        id: "vscode-39",
        keys: ["Cmd", "Shift", "F"],
        description: "Show search",
        category: "Display",
      },
      {
        id: "vscode-40",
        keys: ["Cmd", "Shift", "D"],
        description: "Show debug",
        category: "Display",
      },
      {
        id: "vscode-41",
        keys: ["Cmd", "Shift", "X"],
        description: "Show extensions",
        category: "Display",
      },
      {
        id: "vscode-42",
        keys: ["Cmd", "J"],
        description: "Toggle panel",
        category: "Display",
      },
    ],
  },
];
