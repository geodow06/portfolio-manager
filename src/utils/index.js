export * from "utils/auth/oAuthUtils";
export * from "utils/auth/tokenUtils";

export const redirectTo = (props, pathname) => {
    props.pushTo({
        pathname: pathname
    })
}

export const classList = classes => {
    return Object.entries(classes)
      .filter(entry => entry[1])
      .map(entry => entry[0])
      .join(" ");
};

