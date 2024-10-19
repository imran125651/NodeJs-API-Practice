const express = require('express');
const router = express.Router();
const db = require('../db');



const studentList = (req, res)=>{
    db.getDbStudents()
    .then(std => {
        res.send(std);
    });
};

const newStudent = async (req, res)=>{
    const result = await db.postNewStudents(req.body);
    res.send(result);
};

const studentDetail = async (req, res)=>{
    const id = parseInt(req.params.id);
    const studentList = await db.getDbStudents();
    const student = studentList.find(s=> s.id === id);

    if(!student){
        res.status(404).send("No Student Found!");
    }
    else{
        res.send(student);
    }
};

const studentUpdate = (req, res)=>{
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    db.getDbStudents()
    .then(students=>{
        const student = students.find(s=> s.id === id);
        if(!student) {
            res.status(404).send("No student found!");
        }
        else{
            const index = students.findIndex(x=>x.id === id);
            students[index] = updatedData;

            db.insertStudent(students).then(msg=> res.send(msg));
        }
    });
};

const studentDelete = (req, res)=>{
    const id = parseInt(req.params.id);
    db.getDbStudents()
    .then(students=>{
        const student = students.find(s=> s.id === id);
        if(!student) {
            res.status(404).send("No student found!");
        }
        else{
            const filterStudents = students.filter(x=>x.id !== id);

            db.insertStudent(filterStudents).then(msg=> res.send(msg));
        }
    });
};




// app.get('/api/students', (req, res)=>{
//     fs.readFile('./db.json', 'utf-8', (err, data)=>{
//         console.log(data);
//         const students = JSON.parse(data);
//         res.send(students);
//     })
// });

// app.post('/api/students', (req, res)=>{
//     const requestStudent = req.body;
//     fs.readFile('./db.json', 'utf-8', (err, data)=>{
//         const studentList = JSON.parse(data);
//         studentList.push(requestStudent);
//         fs.writeFile('./db.json', JSON.stringify(studentList), (err)=>{
//             res.send(requestStudent);
//         })
//     });
// });


// app.get('/api/students',  studentList)

// app.post('/api/students', newStudent)

// app.get('/api/students/:id', studentDetail);

// app.put('/api/students/:id', studentUpdate);

// app.delete('/api/students/:id', studentDelete);



router.route('/')
    .get(studentList)
    .post(newStudent);


router.route('/:id')
    .get(studentDetail)
    .put(studentUpdate)
    .delete(studentDelete)




module.exports = router;