async function getData(url) {
    const response = await fetch(url);
    return response.json();
}
const CONFIGFILE = await getData('/config.json');
const DEFAULTCOLORS = await getData(CONFIGFILE['global']['colors']['default']);
const DEFAULTFONTS = await getData(CONFIGFILE['global']['fonts']['default']);
const CUSTOMCOLORS = await getData(CONFIGFILE['global']['colors']['custom']);
const CUSTOMFONTS = await getData(CONFIGFILE['global']['fonts']['custom']);

let styleCombine = {colors:{}, fonts:{}};
styleCombine.colors = { ...DEFAULTCOLORS, ...CUSTOMCOLORS}
styleCombine.fonts = { ...DEFAULTFONTS, ...CUSTOMFONTS}
const STYLESKEY = styleCombine;

export default STYLESKEY;



// var str = JSON.stringify(styleSheet, null, 4); // indented with 4 spaces

// Printing the string
// document.getElementById("output").innerHTML = str;
// console.log(str);