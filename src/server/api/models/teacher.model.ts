import { model, Document, Schema } from 'mongoose';

let TeacherSchema:Schema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  tchrId: String
});

export var TeacherModel = model('TeacherModel', TeacherSchema);