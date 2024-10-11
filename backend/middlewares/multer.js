import multer from "multer"; 
//Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files in Node.js applications
//It is commonly used with Express.js to manage file uploads easily.


//This line initializes a storage engine provided by multer
//The memoryStorage() method tells multer to store uploaded files in memory as a Buffer. 
//This is useful for small files and when you need to process them directly without saving them to the filesystem.
const storage=multer.memoryStorage();



export const singleUpload =multer({storage}).single("file");//The .single("file") method indicates that this middleware will handle a single file upload