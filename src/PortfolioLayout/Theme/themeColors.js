const textLight = {
    primary: "rgba(74, 70, 109, 0.87)",
    secondary: "rgba(74, 70, 109, 0.54)",
    disabled: "rgba(74, 70, 109, 0.38)",
    hint: "rgba(74, 70, 109, 0.38)"
};

export const themeColors = {
    blue: {
        palette: {
            type: "light",
            primary: {
                main: "#3366FF",
                contrastText: "#ffffff"
            },
            secondary: {
                main: "#FFAF38",
                contrastText: textLight.primary
            },
            navbar: {
                background: "#ffffff",
                navigation: {
                    background:"#ffffff",
                    text: "#000000",
                    icon: "#000000",
                },
                brand: {
                    text: "#3366FF",
                }
            },
            text: textLight
        }
    },
};