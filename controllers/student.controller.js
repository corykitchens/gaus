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
  console.log(student);
  Student.create({
    fname: student.fname,
    lname: student.lname,
    csub_id: student.csub_id,
    created_at: Date.now()
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
