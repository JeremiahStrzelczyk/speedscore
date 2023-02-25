/**
 * ES6 Sucks.
 *
 */

import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __dirname = dirname(fileURLToPath(import.meta.url)); // ES6 Hack

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export default router;
