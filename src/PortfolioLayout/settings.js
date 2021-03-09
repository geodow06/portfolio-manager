import { createMuiTheme } from "@material-ui/core";
import { forEach, merge } from "lodash";
import { themeColors } from "PortfolioLayout/Theme/themeColors";
import themeOptions from "PortfolioLayout/Theme/themeOptions";
import SideNavBar from "./SharedComponents/SideNavbar";

function createPortfolioThemes() {
    let themes = {};
  
    forEach(themeColors, (value, key) => {
      themes[key] = createMuiTheme(merge({}, themeOptions, value));
    });
    return themes;
  }
  const themes = createPortfolioThemes();
  
  export const PortfolioLayoutSettings = {
    activeLayout: "layout", // Choose layout configuration
    activeTheme: "blue", // Choose from range in themeColors
    perfectScrollbar: true,

    themes: themes,

    // Footer options
    footer: {
      show: true,
      fixed: false,
      theme: "blue"
    },

    // Topbar options
    topbar: {
      show: true,
      fixed: true,
      theme: "blue"
    },

    // SideNavBar options
    sideNavbar: {
      show: true
    }
  };