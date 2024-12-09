import express from "express";
import type { RequestHandler } from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import sayActions from "./modules/say/sayActions";

router.get("/", sayActions.mainRoot);
router.get("/api/programs", sayActions.browse);

/* ************************************************************************* */

export default router;
