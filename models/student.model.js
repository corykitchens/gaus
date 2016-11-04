const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const waisSchema = new Schema({
  vc: {
    value: { type: Number, default: 0 },
    toStr: { type: String, default: "Verbal Comprehension"  }
  },
  pri:  {
    value: { type: Number, default: 0 },
    toStr: { type: String, default: "Perceptual Reasoning"  }
  },
  wmi:  {
    value: {  type: Number, default: 0},
    toStr: {  type: String, default: "Working Memory" }
  },
  ps: {
    value: { type: Number, default: 0 },
    toStr: { type: String, default: "Processing Speed" }
  },
  fsiq: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Full Scale IQ" }
  },
  gai:  {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "General Ability" }
  },
  final_score: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Final Score" }
  },
  toStr: {  type: String, default: "WAIS IV"  }
});

const microcogSchema = new Schema({
  gcf: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "General Cognitive Functioning"  }
  },
  gcp: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "General Cognitive Proficiency"  }
  },
  ips: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Information Processing Speed"  }
  },
  ipa: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Information Processing Accuracy"  }
  },
  attn: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Attention/Mental Control"  }
  },
  reas: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Reasoning/Calculation"  }
  },
  mem: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Memory"  }
  },
  spat: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Spatial Processing"  }
  },
  rt: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Reaction Time"  }
  },
  final_score: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Final Score"  }
  },
  toStr: {  type: String, default: "MicroCog Assessment"  }
});

const wiatSchema = new Schema({
  lc: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Listening Comprehension"  }
  },
  oe: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Oral Expressing"  }
  },
  rc: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Reading Comprehension"  }
  },
  wr: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Word Reading"  }
  },
  orf: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Oral Reading Fluency"  }
  },
  sc: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Sentence Composition"  }
  },
  ec: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Essay Composition"  }
  },
  sp: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Spelling"  }
  },
  mps: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Math Problem Solving"  }
  },
  no: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Numerical Operations"  }
  },
  mfa: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Math Fluency Addition"  }
  },
  mfs: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Math Fluency Substraction"  }
  },
  mfm: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Math Fluency Multiplcation"  }
  },
  final_score: {
    value: {  type: Number, default: 0  },
    toStr: {  type: String, default: "Final Score"  }
  },
  toStr: { type: String, default: "WIAT-III"  }
});

const studentSchema = new Schema({
  fname: String,
  lname: String,
  csub_id: Number,
  gender: String,
  created_at: Date,
  evaluations: {
    wais: waisSchema,
    microcog: microcogSchema,
    wiat: wiatSchema,
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
