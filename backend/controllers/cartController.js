// controllers/cartController.js
import userModel from '../models/userModel.js';
import bentoModel from '../models/bentoModel.js'; 

const addToCart = async (req, res) => {
   try {
      // Ensure that userId and itemId are provided in the request body
      const { userId, itemId, bento } = req.body;

      if (!userId || !itemId) {
         return res.status(400).json({ success: false, message: "userId and itemId are required" });
      }

      let userData = await userModel.findOne({ _id: userId });
      if (!userData) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      let cartData = userData.cartData || {};  // Ensure cartData is an object

      // Check if item is a Bento item
      if (itemId.startsWith('bento-') && bento) {
         // Create a new Bento entry
         const newBento = new bentoModel({
             userId,
             itemId,
             itemName: bento.item,
             subItems: bento.sub_items.map(item => ({
                 name: item
             })),
             price: bento.price,
             image: bento.image
         });

         await newBento.save();

         return res.status(200).json({ 
             success: true, 
             message: "Bento added to cart",
             bento: newBento 
         });
      }

      // Add the item to the cart
      if (!cartData[itemId]) {
         cartData[itemId] = 1;  // If the item is not in the cart, add it with quantity 1
      } else {
         cartData[itemId] += 1;  // If the item exists, increment its quantity
      }

      // Update the user's cart data
      await userModel.findByIdAndUpdate(userId, { cartData });

      res.json({ success: true, message: "Added to cart" });
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error adding to cart" });
   }
};

// Remove food from user cart
const removeFromCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      if (cartData[req.body.itemId] > 0) {
         cartData[req.body.itemId] -= 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({ success: true, message: "Removed From Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }

}

// Get user cart
const getCart = async (req, res) => {
   try {
      const { userId } = req.body;

      // Get user data from the database
      let userData = await userModel.findById(userId);
      if (!userData) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      // Fetch the cart data (regular items)
      let cartData = userData.cartData || {};

      // Fetch Bento items from the bentoModel collection
      let bentoItems = await bentoModel.find({ userId });

      // Combine both regular cart data and Bento items into one response object
      res.json({
         success: true,
         cartData,
         bentoItems,  // Add Bento items to the response
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error retrieving cart data" });
   }
};

export { addToCart, removeFromCart, getCart };