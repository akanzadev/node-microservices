import { Router } from "express";

const router = Router();

router.post("/api/users/signin", (req, res) => {
  console.log("hello world");
  res.send("hello world");
});

export { router as signinRouter };
