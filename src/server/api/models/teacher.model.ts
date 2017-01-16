import { model, Document, Schema } from 'mongoose';

let TeacherSchema:Schema = new Schema({
  firstName: String,
  surname: String,
  email: String
});

export var TeacherModel = model('Teacher', TeacherSchema);