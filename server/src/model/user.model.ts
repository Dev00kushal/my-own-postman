import {
    DocumentType,
    Severity,
    getModelForClass,
    modelOptions,
    pre,
    prop,
} from "@typegoose/typegoose";
import argon2 from "argon2";
import log from "utils/logger";

let nanoid: ((size?: number | undefined) => string) | (() => any);

(async function () {
  const module = await import("nanoid");
  nanoid = module.nanoid;
})();
@pre<User>("save", async function () {
  if (this.isModified("password")) {
    return;
  }

  const hash = await argon2.hash(this.password);
  this.password = hash;

  return;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  lastname: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;

  @prop({ required: true })
  passwordResetCode: string | null;

  @prop({ default: true })
  verfied: boolean;

  async validatePassword(this: DocumentType<User>, CandiatePassword: string) {
    try {
      return await argon2.verify(this.password, CandiatePassword);
    } catch (error) {
      log.error(error);
    }
  }
}

const UserModelClass = getModelForClass(User);

export default UserModelClass;
