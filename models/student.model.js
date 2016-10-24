const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* TODO
* use 0 as default value for each individual test score?
* use setdefaultsonInsert to true so that a json object
* can be returned from the frontend
*/

const waisSchema = new Schema({
  vc:   Number,
  pri:  Number,
  wmi:  Number,
  ps:   Number,
  fsiq: Number,
  gai:  Number,
  final_score: Number,
});

const microcogSchema = new Schema({
  gcf:    Number,
  gcp:    Number,
  ips:    Number,
  attn:   Number,
  reas:   Number,
  mem:    Number,
  spat:   Number,
  final_score: Number,
});

const wiatSchema = new Schema({
  lc: Number,
  oe: Number,
  rc: Number,
  wr: Number,
  pd: Number,
  orf: Number,
  sc: Number,
  ec: Number,
  sp: Number,
  mps: Number,
  no: Number,
  mfa: Number,
  mfs: Number,
  mfm: Number,
  final_score: Number,
})

const studentSchema = new Schema({
  fname: String,
  lname: String,
  csub_id: Number,
  gender: String,
  created_at: Date,
  evaluations: {
    wais: [waisSchema],
    micro_cog: [microcogSchema],
    wiat: [wiatSchema],
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
