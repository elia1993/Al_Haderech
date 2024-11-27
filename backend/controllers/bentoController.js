import Bento from '../models/bentoModel.js';

// Controller to create a new Bento item
export const createBento = async (req, res) => {
  try {
    const { userId, itemId, itemName, subItems, price, image } = req.body;
    const newBento = new Bento({
      userId,
      itemId,
      itemName,
      subItems,
      price,
      image
    });
    await newBento.save();
    res.status(201).json(newBento); // Respond with the created Bento item
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
};

// Controller to get all Bento items
// Controller to get Bento items for a specific user
export const getAllBentos = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from the query parameters
    const bentos = await Bento.find({ userId: userId }); // Fetch Bento items by userId
    res.status(200).json({ success: true, bentoItems: bentos }); // Send the Bento items as a response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle any errors
  }
};

// Controller to remove a Bento item by itemId
export const removeBento = async (req, res) => {
  try {
    const { itemId } = req.params; // Extract itemId from URL parameter

    if (!itemId) {
      return res.status(400).json({ message: 'itemId is required' });
    }

    // Attempt to find and delete the Bento by itemId
    const deletedBento = await Bento.findOneAndDelete({ itemId });
    if (!deletedBento) {
      return res.status(404).json({ message: 'Bento not found' });
    }

    // Return success message
    res.status(200).json({ success: true, message: 'Bento removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

