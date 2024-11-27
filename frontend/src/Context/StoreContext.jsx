import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = import.meta.env.VITE_API_URL || "http://localhost:4000";

    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [bentoItems, setBentoItems] = useState([]); 
    const [token, setToken] = useState("");
    const currency = "₪";
    const deliveryCharge = 15;
    // Add an item to the cart
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));

        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });

        }
    };
     // Add bento item to the cart
     const addBentoToCart = async (bento) => {
        const itemId = `bento-${bento.sub_items.map((item) => item.name).join("-")}-${Date.now()}`;
        setBentoItems((prev) => [...prev, { itemId, ...bento }]);
      
        if (token) {
          try {
            await axios.post(
              `${url}/api/cart/add`, 
              { 
                itemId,
                bento,
                userId: localStorage.getItem('userId') 
              },
              { headers: { token } }
            );
      
            await loadCartData(token);  
          } catch (error) {
            console.error("Failed to add bento to cart:", error);
            setBentoItems((prev) => prev.filter((b) => b.itemId !== itemId));
            alert("Failed to add bento to cart. Please try again.");
          }
        }
      };
      
    

  // Remove item (food or bento) from the cart
  const removeFromCart =async (itemId) => {
    try {
      if (!token) {
        console.error("Token is missing. Cannot proceed with the request.");
        return;
      }
  
      // Call backend to remove the item
      const response = await axios.delete(`${url}/api/bentos/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Bento deleted:", response.data);
  
      if (response.data.success) {
        console.log("Bento removed successfully:", response.data.message);
  
        await loadCartData(token);  
    } else {
        console.error("Failed to remove Bento:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing Bento:", error.response?.data || error.message);
    }
  };

   // Calculate the total cart amount
   const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const item = food_list.find((food) =>
        food.items
          ? food.items.some((subItem) => subItem._id === itemId)
          : food._id === itemId
      );

      if (item) {
        const subItem = item.items
          ? item.items.find((subItem) => subItem._id === itemId)
          : item;

        if (subItem && subItem.price) {
          totalAmount += subItem.price * cartItems[itemId];
        }
      }
    }

    bentoItems.forEach((bento) => (totalAmount += bento.price));
    return totalAmount;
  };

    // Fetch food list from the backend API
    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        setFoodList(response.data.data);
    };

 // Fetch Bento items when the component mounts (or when userId changes)
 const fetchBentoItems = async () => {
    try {
      const response = await axios.get("/api/bentos", {
        params: { userId: localStorage.getItem("userId") },
      });
      if (response.data.success) {
        setBentoItems(response.data.bentoItems);
      }
    } catch (error) {
      console.error("Error fetching Bento items", error);
    }
  };

  // Fetch cart data (food and bento items)
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const cartData = response.data.cartData || {};
        const bentoData = response.data.bentoItems || [];

        setCartItems(cartData);
        setBentoItems(bentoData);
      } else {
        console.error("Error loading cart data:", response.data.message);
      }
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };

  const removeBentoFromCart = async (itemId) => {
    try {
      if (!token) {
        console.error("Token is missing. Cannot proceed with the request.");
        return;
      }
  
      // Call backend to remove the item
      const response = await axios.delete(`${url}/api/bentos/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token if needed
        },
      });
      await loadCartData(token);  
      console.log("Bento deleted:", response.data);
      if (response.data.success) {
        console.log("Bento removed successfully:", response.data.message);
      } else {
        console.error("Failed to remove Bento:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing Bento:", error.response?.data || error.message);
      return { success: false, error: error.message }; // Return error details
    }
  };
     // Load data on component mount
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    fetchBentoItems();
  }, []);

  const contextValue = {
    url,
    food_list,
    cartItems,
    bentoItems,
    token,
    currency,
    deliveryCharge,
    addToCart,
    removeFromCart,
    addBentoToCart,
    getTotalCartAmount,
    setToken,
    loadCartData,
    setCartItems,
    removeBentoFromCart, 
  };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;