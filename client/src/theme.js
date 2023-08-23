export const tokensLightCol = {
    grey: {
        100: "#e7f5fc",
        200: "#d0ecf9",
        300: "#b8e2f6",
        400: "#a1d9f3",
        500: "#89cff0",
        600: "#6ea6c0",
        700: "#527c90",
        800: "#375360",
        900: "#1b2930"
    },
    primary: {
        100: "#edf4fa",
        200: "#dce9f5",
        300: "#caddf1",
        400: "#b9d2ec",
        500: "#a7c7e7",
        600: "#869fb9",
        700: "#64778b",
        800: "#43505c",
        900: "#21282e"
    },
    secondary: {
        100: "#d9e1f9",
        200: "#b3c3f3",
        300: "#8da5ed",
        400: "#6787e7",
        500: "#4169e1",
        600: "#3454b4",
        700: "#273f87",
        800: "#1a2a5a",
        900: "#0d152d"
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
        reversedTokens[key] =reversedObject;
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
                main: tokensLightCol.primary[400],
                light: tokensLightCol.primary[400],
              },
              secondary: {
                ...tokensLightCol.secondary,
                main: tokensLightCol.secondary[300],
              },
              neutral: {
                ...tokensLightCol.grey,
                main: tokensLightCol.grey[500],
              },
              background: {
                default: tokensLightCol.primary[600],
                alt: tokensLightCol.primary[500],
              },
            }
          : {
              // palette values for light mode
              primary: {
                ...tokensDarkCol.primary,
                main: tokensLightCol.grey[100],
                light: tokensLightCol.grey[100],
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
                default: tokensLightCol.grey[100],
                alt: tokensLightCol.grey[50],
              },
            }),
      },
      typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };  

