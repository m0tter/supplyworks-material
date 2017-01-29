import { model, Document, Schema, Model } from 'mongoose';
import { User } from 'supplyworks';

let UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  tchrId: String,
  schoolId: Number
});

export interface UserDocument extends User, Document { } 
export var UserModel:Model<UserDocument> = model<UserDocument>('Users', UserSchema);
