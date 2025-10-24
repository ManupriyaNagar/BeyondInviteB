import Invitation from "../models/invitations.js";

// Create new invitation
export const createInvitation = async (req, res) => {
  try {
    const { name, category, image, price, status, rating } = req.body;
    const invitation = await Invitation.create({ name, category, image, price, status, rating });
    res.status(201).json(invitation);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all invitations
export const getInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.findAll();
    res.json(invitations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single invitation
export const getInvitation = async (req, res) => {
  try {
    const invitation = await Invitation.findByPk(req.params.id);
    if (!invitation) return res.status(404).json({ message: "Invitation not found" });
    res.json(invitation);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update invitation
export const updateInvitation = async (req, res) => {
  try {
    const invitation = await Invitation.findByPk(req.params.id);
    if (!invitation) return res.status(404).json({ message: "Invitation not found" });

    const { name, category, image, price, status, rating } = req.body;
    await invitation.update({ name, category, image, price, status, rating });
    res.json(invitation);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete invitation
export const deleteInvitation = async (req, res) => {
  try {
    const invitation = await Invitation.findByPk(req.params.id);
    if (!invitation) return res.status(404).json({ message: "Invitation not found" });

    await invitation.destroy();
    res.json({ message: "Invitation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
