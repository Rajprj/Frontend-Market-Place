import  mongoose ,{Schema} from 'mongoose';
// Define the OTP schema
const otpSchema = new Schema({
  userName: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 }, // Auto-delete document after 15 seconds
});

// Compile the OTP model
export const Otp = mongoose.model('Otp', otpSchema);