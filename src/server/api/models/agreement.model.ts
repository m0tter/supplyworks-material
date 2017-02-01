import { model, Document, Schema, Model } from 'mongoose';
import { AgreementBase } from 'supplyworks';

let AgreementSchema = new Schema({
  startDate: Schema.Types.Date,
  rollingStart: Schema.Types.Boolean,
  maxLessons: Schema.Types.Boolean
});

export interface AgreementDocument extends AgreementBase, Document { }
export var AgreementModel = model<AgreementDocument>('Agreements', AgreementSchema);