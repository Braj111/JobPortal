// install datauri through npm

// A Data URI parser is a tool or library that processes Data URIs, which are a way to include data directly within a URL. 
// Data URIs allow you to embed small files, like images or text, directly in HTML or CSS without needing separate HTTP requests.

import DataUriParser from "datauri/parser.js"

import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default getDataUri;