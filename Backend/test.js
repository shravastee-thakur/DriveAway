import Car from "../Models/carModel.js";

// @desc    Add a new car
// @route   POST /api/cars
export const addCar = async (req, res) => {
  try {
    const newCar = await Car.create({ ...req.body, owner: req.userId });
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all cars
// @route   GET /api/cars
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().populate("owner", "name email");
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single car by ID
// @route   GET /api/cars/:id
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate("owner", "name email");
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update car (only owner allowed)
// @route   PUT /api/cars/:id
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.owner.toString() !== req.userId)
      return res.status(403).json({ message: "Not authorized" });

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete car (only owner allowed)
// @route   DELETE /api/cars/:id
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.owner.toString() !== req.userId)
      return res.status(403).json({ message: "Not authorized" });

    await car.remove();
    res.json({ message: "Car removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle availability
// @route   PATCH /api/cars/:id/availability
export const toggleAvailability = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.owner.toString() !== req.userId)
      return res.status(403).json({ message: "Not authorized" });

    car.isAvailable = !car.isAvailable;
    await car.save();
    res.json({ message: "Availability updated", isAvailable: car.isAvailable });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
