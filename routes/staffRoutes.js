const express = require('express');
const {
  createStaff,
  getStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} = require('../controllers/staffController');

const router = express.Router();

/**
 * @route POST /api/staff
 * @description Creates a new staff member.
 */
router.post('/', createStaff);

/**
 * @route GET /api/staff
 * @description Retrieves all staff members.
 */
router.get('/', getStaff);

/**
 * @route GET /api/staff/:id
 * @description Retrieves a staff member by ID.
 */
router.get('/:id', getStaffById);

/**
 * @route PUT /api/staff/:id
 * @description Updates a staff member by ID.
 */
router.put('/:id', updateStaff);

/**
 * @route DELETE /api/staff/:id
 * @description Deletes a staff member by ID.
 */
router.delete('/:id', deleteStaff);

module.exports = router;
