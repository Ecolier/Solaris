import { Document, Model, model, Types, Schema, Query } from 'mongoose';

const UserSchema = new Schema<UserDocument, UserModel>({
  emailAddress: {
    type: String,
    required: true
  }
});

export interface User {
  emailAddress: String;
};

interface UserDocument extends User, Document {
  emailAddress: string;
}

export interface UserModel extends Model<UserDocument> { }
export default model<UserDocument, UserModel>("User", UserSchema)