import { Router } from "express";

const router = Router();

router.post("/api/users/signout", (req, res) => {
  console.log("hello world");
  res.send("hello world");
});

export { router as signoutRouter };
