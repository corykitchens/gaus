const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  fname: String,
  lname: String,
  csub_id: Number,
  gender: String,
  created_at: Date,
  evaluations: [
    {
      wais: {
        vc: Number,
        pri: Number,
        wmi: Number,
        ps: Number,
        fsiq: Number,
        gai: Number,
        final_score: Number,
      }
    },
    {
      micro_cog: {
        gcf: Number,
        gcp: Number,
        ips: Number,
        attn: Number,
        reas: Number,
        mem: Number,
        spat: Number,
        final_score: Number,
      }
    },
    {
      wiat: {
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
      }
    }
  ]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
