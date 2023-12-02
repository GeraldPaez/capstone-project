export const tokensLightCol = {
  grey: {
    100: "#cdd7e2",
    150: "#FFFFFF",
    200: "#9ab0c4",
    300: "#6888a7",
    400: "#356189",
    500: "#03396c",
    600: "#022e56",
    700: "#022241",
    800: "#01172b",
    900: "#010b16",
  },
  primary: {
    100: "#e0eaef",
    160: "#FFFFFF",
    200: "#c1d5e0",
    300: "#a2c1d0",
    400: "#83acc1",
    500: "#6497b1",
    600: "#50798e",
    700: "#3c5b6a",
    800: "#283c47",
    900: "#141e23",
  },
  secondary: {
    90: "#cdd7e2",
    100: "#ccdeea",
    200: "#99bdd5",
    300: "#669dc0",
    400: "#337cab",
    500: "#005b96",
    600: "#004978",
    700: "#00375a",
    800: "#00243c",
    900: "#00121e",
  },
  yellow: {
    100: "#f6eecf",
    200: "#eede9e",
    300: "#e5cd6e",
    400: "#ddbd3d",
    500: "#d4ac0d",
    600: "#aa8a0a",
    700: "#7f6708",
    800: "#554505",
    900: "#2a2203",
  },
  green: {
    100: "#d5f5e3",
    200: "#abebc6",
    300: "#82e0aa",
    400: "#58d68d",
    500: "#2ecc71",
    600: "#25a35a",
    700: "#1c7a44",
    800: "#12522d",
    900: "#092917",
  },
  red: {
    100: "#f2d7d5",
    200: "#e6b0aa",
    300: "#d98880",
    400: "#cd6155",
    500: "#c0392b",
    600: "#9a2e22",
    700: "#73221a",
    800: "#4d1711",
    900: "#260b09",
  },
};

// This function reverses the color palette
function reverseTokens(tokensLightCol) {
  const reversedTokens = {};
  Object.entries(tokensLightCol).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObject = {};
    for (let i = 0; i < length; i++) {
      reversedObject[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObject;
  });
  return reversedTokens;
}
export const tokensDarkCol = reverseTokens(tokensLightCol);

// MUI Theme Settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensLightCol.primary,
              main: tokensLightCol.primary[500],
              light: tokensLightCol.primary[500],
            },
            secondary: {
              ...tokensLightCol.secondary,
              main: tokensLightCol.secondary[500],
            },
            neutral: {
              ...tokensLightCol.grey,
              main: tokensLightCol.grey[500],
            },
            background: {
              default: tokensLightCol.primary[900],
              alt: tokensLightCol.primary[700],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensDarkCol.primary,
              main: tokensLightCol.grey[400],
              light: tokensLightCol.grey[400],
            },
            secondary: {
              ...tokensDarkCol.secondary,
              main: tokensLightCol.secondary[600],
              light: tokensLightCol.secondary[700],
            },
            neutral: {
              ...tokensDarkCol.grey,
              main: tokensLightCol.grey[500],
            },
            background: {
              default: tokensLightCol.grey[150],
              alt: tokensLightCol.grey[200],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "Source Sans Pro"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "Source Sans Pro"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "Source Sans Pro"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "Source Sans Pro"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "Source Sans Pro"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "Source Sans Pro"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "Source Sans Pro"].join(","),
        fontSize: 14,
      },
    },
  };
};
