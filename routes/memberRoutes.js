const express = require('express');
const {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} = require('../controllers/memberController');

const router = express.Router();

/**
 * @route POST /api/members
 * @description Creates a new member.
 */
router.post('/', createMember);

/**
 * @route GET /api/members
 * @description Retrieves all members.
 */
router.get('/', getMembers);

/**
 * @route GET /api/members/:id
 * @description Retrieves a member by ID.
 */
router.get('/:id', getMemberById);

/**
 * @route PUT /api/members/:id
 * @description Updates a member by ID.
 */
router.put('/:id', updateMember);

/**
 * @route DELETE /api/members/:id
 * @description Deletes a member by ID.
 */
router.delete('/:id', deleteMember);

module.exports = router;
