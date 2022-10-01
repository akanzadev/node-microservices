import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";

import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";

const router = Router();
console.log("dsddsds33");
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) throw new BadRequestError("Email in use");

      const user = await User.build({ email, password });

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };

      await user.save();
      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }
);

export { router as signupRouter };
