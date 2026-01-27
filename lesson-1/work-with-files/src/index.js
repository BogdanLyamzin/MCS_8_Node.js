// import fs from "node:fs";
import fs from "node:fs/promises";
import DetectFileEncodingAndLanguage from "detect-file-encoding-and-language";

const fileOperations = async ()=> {
    // const buffer = await fs.readFile("./files/file.txt");
    // const text = buffer.toString();
    // console.log(text)
    // const text = await fs.readFile("./files/file.txt", "utf-8");
    // console.log(text);
    // const {encoding} = await DetectFileEncodingAndLanguage("./files/file.txt");
    // const text = await fs.readFile("./files/file.txt", encoding);
    // console.log(text);
    // await fs.appendFile("./files/file.txt", "\nPHP the best");
    // await fs.writeFile("./files/file.txt", "Mojo forever");
    // fs.appendFile("./files/file2.txt", "\nPHP the best");
    // await fs.writeFile("./files/file3.txt", "Mojo forever");
    // await fs.unlink("./files/file3.txt");
}

fileOperations();

// const data = await fs.readFile("./files/file.txt");
// console.log(data);

// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

// fs.readFile("./files/file.txt", (error, data)=> {
//     console.log(error);
//     console.log(data);
// });