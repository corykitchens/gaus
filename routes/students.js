const express = require('express');
const router = express.Router();
const Student = require('../models/student.model');
const studentController = require('../controllers/student.controller');
//============= GET ALL STUDENTS ==============//
router.get('/', (req, res) => {
  studentController.list((err, students) => {
    if (err) {
      res.status(500).json({ msg: err });
    }
    res.status(200).json({students: students});
  });
});

//============= GET SINGLE STUDENT ==============//
router.get('/:id', (req, res) => {
  studentController.show(req.params.id, (err, student) => {
    if (err) res.status(500).json({msg: err});
    res.status(200).json({student: student});
  })
});

//============= UPDATE SINGLE STUDENT ==============//
router.put('/:id', (req, res) => {
  res.json({ msg: 'Update Single Student'});
});

//============= DELETE SINGLE STUDENT ==============//
router.delete('/:id', (req, res) => {
  res.json({ msg: 'Delete Single Student'});
});

//============= GET NEW STUDENT ==============//
router.get('/new', (req, res) => {
  res.json({ msg: 'Create new Student Page'});
});

//============= CREATE NEW STUDENT  ==============//
router.post('/new', (req, res) => {
  if (!req.body) {
    res.status(500).json({ msg: "Error no payload sent" });
  }
  let student = req.body;
  studentController.create(student, (err, student) => {
    if (err) {
      res.status(500).json({ msg: err });
    }
    res.status(200).json({ msg: student.fname + ' created!'});
  });
});

//============= GET STUDENT'S EVALUATION ==============//
router.get('/:id/evaluation', (req, res) => {
  res.json({ msg: 'Single Students Evaluation'});
});

//============= GET STUDENT'S MICROCOG ASSESSMENT ==============//
router.get('/:id/microcog', (req, res) => {
  res.json({ msg: 'Get Single Students MicroCog'})
})

//============= CREATE STUDENT'S MICROCOG ASSESSMENT ==============//
router.post('/:id/microcog', (req, res) => {
  res.json({ msg: 'Submit new Microcog Assessment'})
});
//============= UPDATE STUDENT'S MICROCOG ASSESSMENT ==============//
router.put('/:id/microcog', (req, res) => {
  let student_id = req.params.id;
  let mc = req.body;
  studentController.updateTest(student_id, "microcog", mc, (err, updated_mc) => {
    if (err) return res.status(500).json({ msg: err });
    return res.status(200).json({ msg: updated_mc});
  })
});

//============= DELETE STUDENT'S MICROCOG ASSESSMENT ==============//
router.delete('/:id/microcog', (req, res) => {
  res.json({ msg: 'Delete MicroCog Assessment'});
});

//============= GET STUDENT'S WIAT ASSESSMENT ==============//
router.get('/:id/wiat', (req, res) => {
  res.json({ msg: 'Get Single Students WIAT'})
})

//============= CREATE STUDENT'S WIAT ASSESSMENT ==============//
router.post('/:id/wiat', (req, res) => {
  res.json({ msg: 'Submit new WIAT Assessment'})
});
//============= UPDATE STUDENT'S WIAT ASSESSMENT ==============//
router.put('/:id/wiat', (req, res) => {
  let student_id = req.params.id;
  let wiat = req.body;
  studentController.updateTest(student_id, "wiat", wiat, (err, updated_wiat) => {
    if (err) return res.status(500).json({ msg: err });
    return res.status(200).json({ msg: updated_wiat});
  })
});

//============= DELETE STUDENT'S WIAT ASSESSMENT ==============//
router.delete('/:id/wiat', (req, res) => {
  res.json({ msg: 'Delete WIAT Assessment'});
});

//============= GET STUDENT'S WAIS ASSESSMENT ==============//
router.get('/:id/wais', (req, res) => {
  res.json({ msg: 'Get Single Students WAIS'})
})

//============= CREATE STUDENT'S WAIS ASSESSMENT ==============//
router.post('/:id/wais', (req, res) => {
  res.json({ msg: 'Submit new WAIS Assessment'})
});
//============= UPDATE STUDENT'S WAIS ASSESSMENT ==============//
router.put('/:id/wais', (req, res) => {
  let student_id = req.params.id;
  let wais = req.body;
  studentController.updateTest(student_id, "wais", wais, (err, updated_wais) => {
    if (err) return res.status(500).json({ msg: err });
    return res.status(200).json({ msg: updated_wais});
  })
});

//============= DELETE STUDENT'S WAIS ASSESSMENT ==============//
router.delete('/:id/wais', (req, res) => {
  res.json({ msg: 'Delete WAIS Assessment'});
});


module.exports = router;
