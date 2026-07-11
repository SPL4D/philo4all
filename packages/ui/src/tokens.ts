export const colors = {
  cream: "#F7F0E4",
  paper: "#FFF9EF",
  parchment: "#EFE2CF",
  ink: "#25211B",
  umber: "#6F6254",
  clay: "#B9633B",
  oxblood: "#6E2E2A",
  linen: "#DED0BC",
  olive: "#687A52"
} as const;

export const radii = {
  sm: 6,
  md: 8,
  lg: 12
} as const;

export const readerThemes = {
  cream: {
    label: "Cream",
    background: colors.cream,
    surface: colors.paper,
    text: colors.ink,
    muted: colors.umber
  },
  sepia: {
    label: "Sepia",
    background: "#EFE2CF",
    surface: "#FBF1DF",
    text: "#30251E",
    muted: "#75614D"
  },
  dark: {
    label: "Dark",
    background: "#1F1B18",
    surface: "#29231F",
    text: "#F6ECDD",
    muted: "#C5B6A1"
  }
} as const;

export type ReaderThemeName = keyof typeof readerThemes;
