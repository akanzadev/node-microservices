import { Router } from "express";

const router = Router();

router.get("/api/users/currentuser", (req, res) => {
  console.log("hello world");
  res.send("hello world");
});

export { router as currentUserRouter };
