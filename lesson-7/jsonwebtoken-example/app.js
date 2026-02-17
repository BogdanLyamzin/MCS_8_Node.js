import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    id: 2,
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);
try {
    // setTimeout(()=> {
    //     const {id} = jwt.verify(token, JWT_SECRET)
    // }, 2000);
    const {id} = jwt.verify(token, JWT_SECRET);
    console.log(id);
    // const {id} = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzcxMzU0MzU3LCJleHAiOjE3NzE0NDA3NTd9.Jup9xHMDgyWu65ExVVuY8pGNQ1HG4MzrqXmbAC36eDu", JWT_SECRET);
    
}
catch(error) {
    console.log(error.message);
}
