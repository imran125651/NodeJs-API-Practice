const fs = require('fs');


const getDbStudents = ()=>{
    return new Promise((resolve, reject)=>{
        fs.readFile('./db.json', 'utf-8', (err, data)=>{
            const students = JSON.parse(data);
            resolve(students);
        })
    })
}

const postNewStudents = (newStudent)=>{
    return new Promise((res, rej)=>{
        fs.readFile('./db.json', 'utf-8', (err, data)=>{
            let students = JSON.parse(data);
            students.push(newStudent);
            fs.writeFile('./db.json', JSON.stringify(students), (err)=>{
                res(newStudent);
            });
        });
    });
}

const insertStudent = (students)=>{
    console.log(students);
    return new Promise((resolve, reject)=>{
        fs.writeFile('./db.json', JSON.stringify(students), (err)=>{
            resolve("Updated successfully");
        })
    })
}


module.exports.getDbStudents = getDbStudents;
module.exports.postNewStudents = postNewStudents;
module.exports.insertStudent = insertStudent;