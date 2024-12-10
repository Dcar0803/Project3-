const Member = require('../models/Member');

/**
 * Creates a new library member.
 * @param {object} req - The request object containing member details in `req.body`.
 * @param {object} res - The response object to send the newly created member or an error.
 * @returns {Promise<void>} Sends a JSON response with the created member or an error message.
 */
exports.createMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    const savedMember = await member.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves all library members.
 * @param {object} req - The request object.
 * @param {object} res - The response object to send all members or an error.
 * @returns {Promise<void>} Sends a JSON response with an array of all members or an error message.
 */
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieves a library member by their ID.
 * @param {object} req - The request object containing `req.params.id`.
 * @param {object} res - The response object to send the found member or an error.
 * @returns {Promise<void>} Sends a JSON response with the member details or an error message.
 */
exports.getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Updates a library member by their ID.
 * @param {object} req - The request object containing `req.params.id` and `req.body`.
 * @param {object} res - The response object to send the updated member or an error.
 * @returns {Promise<void>} Sends a JSON response with the updated member or an error message.
 */
exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMember = await Member.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Deletes a library member by their ID.
 * @param {object} req - The request object containing `req.params.id`.
 * @param {object} res - The response object to confirm deletion or send an error.
 * @returns {Promise<void>} Sends a JSON response with a confirmation message or an error message.
 */
exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
