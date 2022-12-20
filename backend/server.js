import express from "express";
//import triple_des from "node_triple_des";
import crypto from "crypto-js";
import pkg from "@bpe/one-time-pad";
const {OneTimePad} = pkg;

const app = express();
app.use(express.json());

let key = "";
const base64ToUint8 = str => Uint8Array.from(atob(str), c => c.charCodeAt(0));

//OTP encryption
app.post("/otp-encryption", (req, res, next) => {
  try {
    const plainTextBuffer = Buffer.from(req.body.message, "utf8");
    key = OneTimePad.generatePad(req.body.key);
    const encrypted = OneTimePad.encrypt(key, plainTextBuffer);
    return res.status(200).json({encrypted: Buffer.from(encrypted).toString("base64")});
  } catch (error) {
    next(error);
  }
});

//OTP decryption
app.post("/otp-decryption", (req, res, next) => {
  try {
    if (key !== req.body.key) return res.status(200).json({decrypted: ""});
    const decrypted = OneTimePad.decrypt(key, base64ToUint8(req.body.encrypted));
    return res.status(200).json({decrypted: Buffer.from(decrypted).toString("utf8")});
  } catch (error) {
    next(error);
  }
});

//3DES encryption
app.post("/3des-encryption", (req, res, next) => {
  try {
    let encrypted = crypto.TripleDES.encrypt(req.body.message, req.body.key).toString();
    //let encrypted = triple_des.encrypt(req.body.key, req.body.message);
    return res.status(200).json({encrypted});
  } catch (error) {
    next(error);
  }
});

//3DES decryption
app.post("/3des-decryption", (req, res, next) => {
  try {
    let bytes = crypto.TripleDES.decrypt(req.body.encrypted, req.body.key);
    let decrypted = bytes.toString(crypto.enc.Utf8);
    //let decrypted = triple_des.decrypt(req.body.key, req.body.encrypted);
    return res.status(200).json({decrypted});
  } catch (error) {
    next(error);
  }
});

//AES encryption
app.post("/aes-encryption", (req, res, next) => {
  try {
    let encrypted = crypto.AES.encrypt(req.body.message, req.body.key).toString();
    return res.status(200).json({encrypted});
  } catch (error) {
    next(error);
  }
});

//AES decryption
app.post("/aes-decryption", (req, res, next) => {
  try {
    let bytes = crypto.AES.decrypt(req.body.encrypted, req.body.key);
    let decrypted = bytes.toString(crypto.enc.Utf8);
    return res.status(200).json({decrypted});
  } catch (error) {
    next(error);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
