export const parseCallBackUri = href => {
    // Return code parameter from callback uri
    return href.slice(href.lastIndexOf('=') + 1);
}
