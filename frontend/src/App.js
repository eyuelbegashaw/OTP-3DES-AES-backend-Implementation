import "./App.css";
import {useState} from "react";
import axios from "axios";

function App() {
  let URL = "http://localhost:5000";

  const [encKey, setEncKey] = useState("");
  const [message, setMessage] = useState("");

  const [decKey, setDecKey] = useState("");
  const [decMessage, setDecMessage] = useState("");

  const [encryptedText, setEncyptedText] = useState("");
  const [decryptedText, setDecyptedText] = useState("");

  const [selected, setSelected] = useState("OTP");

  let handleEncrypt = async () => {
    let result = "";
    if (selected == "OTP") {
      if (encKey.length !== message.length) alert("key and message must have equal length");
      else result = await axios.post(`${URL}/otp-encryption`, {key: encKey, message});
    } else if (selected == "3DES") {
      result = await axios.post(`${URL}/3des-encryption`, {
        key: encKey,
        message,
      });
    } else if (selected == "AES") {
      result = await axios.post(`${URL}/aes-encryption`, {key: encKey, message});
    }
    if (result !== "") setEncyptedText(result.data.encrypted);
  };

  let handleDecrypt = async () => {
    let result = "";

    if (selected == "OTP") {
      result = await axios.post(`${URL}/otp-decryption`, {key: decKey, encrypted: encryptedText});
    } else if (selected == "3DES") {
      result = await axios.post(`${URL}/3des-decryption`, {key: decKey, encrypted: encryptedText});
    } else if (selected == "AES") {
      result = await axios.post(`${URL}/aes-decryption`, {key: decKey, encrypted: encryptedText});
    }
    console.log(result);
    setDecyptedText(result.data.decrypted);
  };

  return (
    <div className="d-sm-flex justify-content-around">
      <div className="m-4">
        <h4>Message to Encrypt </h4>
        <textarea
          id="textBox"
          value={message}
          onChange={e => setMessage(e.target.value)}
        ></textarea>
        <br />
        <div className="my-2">
          <span className="pe-5">Encryption Key</span>
          <input
            type="text form-control"
            value={encKey}
            onChange={e => setEncKey(e.target.value)}
          />
        </div>

        <br />
        <button className="btn btn-primary me-5" onClick={handleEncrypt}>
          Encrypt
        </button>
        <button className="btn btn-danger ms-5" onClick={() => setDecMessage(encryptedText)}>
          Copy Encryption
        </button>
        <br />
        <textarea id="textBox" className="mt-3" value={encryptedText}></textarea>

        <div className="my-2">
          <span className="pe-4">Choose algorithm</span>
          <select
            className="form-select my-2 select"
            value={selected}
            onChange={e => setSelected(e.target.value)}
          >
            <option value="OTP">OTP</option>
            <option value="3DES">3DES</option>
            <option value="AES">AES</option>
          </select>
        </div>
      </div>

      <div className="m-4">
        <h4>Message to Decrypt</h4>
        <textarea
          id="textBox"
          value={decMessage}
          onChange={e => setDecMessage(e.target.value)}
        ></textarea>
        <br />
        <div className="my-2">
          <span className="pe-5">Decryption Key</span>
          <input
            type="text form-control"
            value={decKey}
            onChange={e => setDecKey(e.target.value)}
          />
        </div>

        <br />
        <button className="btn btn-primary me-5" onClick={handleDecrypt}>
          Decrypt
        </button>
        <button className="btn btn-danger ms-5">Copy Decryption</button>
        <br />
        <textarea id="textBox" className="mt-3" value={decryptedText}></textarea>
      </div>
    </div>
  );
}

export default App;
