import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // replace with your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // replace with your Razorpay Secret
});

export const createOrder = async (req, res) => {
  const { treeCount } = req.body;
  const totalAmount = Math.floor(treeCount * 110);

  const options = {
    // amount: totalAmount * 100, // amount in smallest currency unit
    amount: 1 * 100,
    currency: "INR",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    let hmac = crypto.createHmac("sha256", key_secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");
    if (razorpay_signature === generated_signature) {
      res
        .status(200)
        .json({ success: true, message: "Payment has been verified" });
    } else res.json({ success: false, message: "Payment verification failed" });
  } catch (err) {
    console.log(err);
  }
};
