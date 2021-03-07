import {
    SET_LAYOUT_SETTINGS,
    SET_DEFAULT_LAYOUT_SETTINGS
  } from "redux/actions/LayoutActions";
  import { PortfolioLayoutSettings } from "PortfolioLayout/settings";
  
  const initialState = {
    settings: {
      ...PortfolioLayoutSettings
    },
    defaultSettings: {
      ...PortfolioLayoutSettings
    }
  };
  
  const LayoutReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_LAYOUT_SETTINGS:
        return {
          ...state,
          settings: { ...action.data }
        };
      case SET_DEFAULT_LAYOUT_SETTINGS:
        return {
          ...state,
          defaultSettings: { ...action.data }
        };
      default:
        return { ...state };
    }
  };
  
  export default LayoutReducer;
  