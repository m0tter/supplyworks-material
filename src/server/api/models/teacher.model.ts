import { model, Document, Schema, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Teacher } from 'supplyworks';

let TeacherSchema:Schema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  tchrId: String
});

export var TeacherModel:Model<TeacherDocument> = model<TeacherDocument>('TeacherModel', TeacherSchema);
export interface TeacherDocument extends Teacher, Document { }
