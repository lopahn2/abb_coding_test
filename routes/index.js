import express from "express";
import crypto from "crypto";
import axios from "axios";
const router = express.Router();

let jwt = "";

router.post("/auth", async function (req, res, next) {
  // const teamName = req.teamName;
  const postUrl = "http://118.67.134.151/hackathon/api/auth";
  console.log(req.body.teamName);
  const message = req.body.teamName;
  const secretKey = "NHVzLwHNeIXuNIiXerePIGVj5kzJmJYA";

  const hmac = crypto.createHmac("sha256", secretKey);
  const authHash = hmac.update(message).digest("base64");

  const data = {
    message,
    authHash,
  };

  const result = await axios.post(postUrl, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  jwt = result.data.data;
  return res.json(result.data);
});

router.post("/save", async function (req, res, next) {
  // const teamName = req.teamName;
  const postUrl = "http://118.67.134.151/hackathon/api/save";
  const teamName = req.body.teamName;

  const data = {
    teamName,
  };
  console.log(jwt);

  const result = await axios.post(postUrl, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.json(result.data);
});

export default router;
