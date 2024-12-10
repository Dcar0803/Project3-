const Staff = require('../models/Staff');

/**
 * Creates a new staff member in the library system.
 * @param {object} req - The request object containing staff details in `req.body`.
 * @param {object} res - The response object to send the created staff or an error.
 * @returns {Promise<void>} Sends a JSON response with the created staff or an error message.
 */
exports.createStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    const savedStaff = await staff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves all staff members in the library system.
 * @param {object} req - The request object.
 * @param {object} res - The response object to send all staff or an error.
 * @returns {Promise<void>} Sends a JSON response with an array of all staff or an error message.
 */
exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves a staff member by their ID.
 * @param {object} req - The request object containing `req.params.id`.
 * @param {object} res - The response object to send the found staff or an error.
 * @returns {Promise<void>} Sends a JSON response with the staff details or an error message.
 */
exports.getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Updates a staff member by their ID.
 * @param {object} req - The request object containing `req.params.id` and `req.body`.
 * @param {object} res - The response object to send the updated staff or an error.
 * @returns {Promise<void>} Sends a JSON response with the updated staff or an error message.
 */
exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStaff = await Staff.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStaff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Deletes a staff member by their ID.
 * @param {object} req - The request object containing `req.params.id`.
 * @param {object} res - The response object to confirm deletion or send an error.
 * @returns {Promise<void>} Sends a JSON response with a confirmation message or an error message.
 */
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStaff = await Staff.findByIdAndDelete(id);
    if (!deletedStaff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.status(200).json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
