import joi from "joi";

export const registerValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(30).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name cannot be more than 30 characters",
    }),

    email: joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),
    phoneNumber: joi
      .string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.empty": "Phone number is required",
        "string.pattern.base": "Phone number must be exactly 10 digits",
      }),

    password: joi.string().min(6).max(14).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
    }),
    role: joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  next();
};

export const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),

    password: joi.string().min(6).max(14).required().messages({
      "string.empty": "Password is required",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
};

export const updateBookingValidation = (req, res, next) => {
  try {
    const schema = joi.object({
      startDate: joi.date().greater("now").messages({
        "date.base": "Start date must be a valid date",
        "date.greater": "Start date must be in the future",
      }),
      endDate: joi.date().greater(joi.ref("startDate")).messages({
        "date.base": "End date must be a valid date",
        "date.greater": "End date must be after start date",
      }),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  } catch (error) {
    next();
  }
};
