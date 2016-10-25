const Student = require('../models/student.model');


/**
* @name  list
* Returns a list of all studnets
*/
module.exports.list = (cb) => {
  Student.find({}, (err, students) => {
    if (err) return cb(err, null);
    return cb(null, students);
  });
}
//create new student
module.exports.create = (student, cb) => {
  let wais = {},
      wiat = {},
      mircocog = {};

  Student.create({
    fname: student.fname,
    lname: student.lname,
    csub_id: student.csub_id,
    created_at: Date.now(),
    evaluations: {
      wais: wais,
      wiat: wiat,
      microcog: mircocog
    }
  }, (err, student) => {
    if (err) return cb(err, null);
    return cb(null, student);
  })

}
// get single student
module.exports.show = (student_id, cb) => {
  Student.findOne({
    _id: student_id
  }, (err, student) => {
    if (err) return cb(err, null);
    return cb(null, student);
  });
}
// Update student
module.exports.update = (student, cb) => {

}
// delete single student
module.exports.delete = (student_id, cb) => {

}

module.exports.updateMicrocog = (student_id, mc, cb) => {
  console.log(mc);
  Student.findOne({
    _id: student_id
  }, (err, student) => {
    if (err) return cb(err, null);
    student.evaluations.microcog = mc;
    student.save();
    return cb(null, student.evaluations.mircocog);
  })
}
