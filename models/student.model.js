const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* TODO
* use 0 as default value for each individual test score?
* use setdefaultsonInsert to true so that a json object
* can be returned from the frontend
*/

const waisSchema = new Schema({
  vc:   {type: Number, default: 0},
  pri:  {type: Number, default: 0},
  wmi:  {type: Number, default: 0},
  ps:   {type: Number, default: 0},
  fsiq: {type: Number, default: 0},
  gai:  {type: Number, default: 0},
  final_score: {type: Number, default: 0},
});

const microcogSchema = new Schema({
  gcf:    {type: Number, default: 0},
  gcp:    {type: Number, default: 0},
  ips:    {type: Number, default: 0},
  attn:   {type: Number, default: 0},
  reas:   {type: Number, default: 0},
  mem:    {type: Number, default: 0},
  spat:   {type: Number, default: 0},
  final_score: {type: Number, default: 0},
});

const wiatSchema = new Schema({
  lc: {type: Number, default: 0},
  oe: {type: Number, default: 0},
  rc: {type: Number, default: 0},
  wr: {type: Number, default: 0},
  pd: {type: Number, default: 0},
  orf: {type: Number, default: 0},
  sc: {type: Number, default: 0},
  ec: {type: Number, default: 0},
  sp: {type: Number, default: 0},
  mps: {type: Number, default: 0},
  no: {type: Number, default: 0},
  mfa: {type: Number, default: 0},
  mfs: {type: Number, default: 0},
  mfm: {type: Number, default: 0},
  final_score: {type: Number, default: 0},
})

const studentSchema = new Schema({
  fname: String,
  lname: String,
  csub_id: Number,
  gender: String,
  created_at: Date,
  evaluations: {
    wais: waisSchema,
    micro_cog: microcogSchema,
    wiat: wiatSchema,
  }
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
