import axios from 'axios'


const API_URL = "http://localhost:3005";
// const getAuthHeader = () => {
//   const token = localStorage.getItem('token');
//   return {
//     'Authorization' : token ? `Bearer ${token}` : '',
//     'content-Type' : 'application/json'
//   };
// };



//user register api

export const userregister = async (data) => {
    try {
        return await axios.post(`${API_URL}/user/register`, data);
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

//user login api

export const userlogin = async (data) => {
    try{
        return await axios.post(`${API_URL}/user/login`, data);
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

//HARVESTED CROPS
//farmer crop posting

export const harvestedcroppost = async (data, userid) => {
    try {
        return await axios.post(`${API_URL}/farmer/harvested/addmycrops/${userid}`, data)
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

//get farmers own harvested crop

export const getmyharvestedcrop = async (userid) => {
  try {
    const response = await axios.get(`${API_URL}/farmer/harvested/viewmycrops/${userid}`);
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//get all harvested crops

export const viewallharvestedcrops = async () => {
  try {
    const response = await axios.get(`${API_URL}/farmer/harvested/viewallharvestedcrops`)
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//get harvested crop details

export const getharvestedcropdetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/farmer/harvested/viewcropdetails/${id}`)
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//editharvetsted crop

export const updatemycrop = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/farmer/harvested/updatemycrop/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Update crop error:", error);
    throw error;
  }
};

//delete mycrop

export const deletemycrop = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/farmer/harvested/deletemycrop/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Delete crop error:", error);
    throw error;
  }
};


//FUTURE HARVEST CROPS
//farmer crop posting

export const futharvestcroppost = async (data,userid) => {
    try{
        return await axios.post(`${API_URL}/farmer/futureharvest/addmyfutcrops/${userid}`, data)
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

//get farmers own future harvest crop

export const getmyfutharvestcrop = async (userid) => {
  try {
    const response = await axios.get(`${API_URL}/farmer/futureharvest/viewmyfutcrops/${userid}`);
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//get all future harvest crops

export const viewallfutharvestcrops = async () => {
  try {
    const response = await axios.get(`${API_URL}/farmer/futureharvest/viewallfutharvestcrops`)
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//get future harvest crop details

export const getfutharvestcropdetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/farmer/futureharvest/viewfutcropdetails/${id}`)
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//edit future crop

export const updateFutureHarvestCrop = async (id, formData) => {
  try {
    const res = await axios.put(
      `${API_URL}/farmer/futureharvest/updatemycrop/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Update future harvest crop error:", error);
    throw error;
  }
};

//delete future crop

export const deleteFutureHarvestCrop = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/farmer/futureharvest/deletemycrop/${id}`);
    return response.data;
  } catch (error) {
    console.error("Delete future harvest crop error:", error);
    throw error;
  }
};

// Farmer Profile
// View profile

export const getFarmerProfile = async (id) => {
  try {
    console.log("Requesting URL:", `${API_URL}farmer/profile/viewprofile/${id}`);
    const res = await axios.get(`${API_URL}/farmer/profile/viewprofile/${id}`);
    return res.data; // should return your farmer object
  } catch (error) {
    console.error(error);
    throw error.response?.data || error.message;
  }
};
//update prof
export const updateFarmerProfile = async (id, profileData) => {
  try {
    const res = await axios.put(
      `${API_URL}/farmer/profile/updateprofile/${id}`,
      profileData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error.message;
  }
};


//Bank details

// GET bank details of a farmer
export const getBankDetails = async (farmerId) => {
  try {
    const res = await axios.get(`${API_URL}/farmer/bank/getbank/${farmerId}`);
    return res.data; // { bankdetails: {...} }
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

// ADD bank details for a farmer
export const addBankDetails = async (farmerId, bankData) => {
  try {
    const res = await axios.post(`${API_URL}/farmer/bank/addbank/${farmerId}`, bankData);
    return res.data; // { message, bankdetails }
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

// UPDATE bank details for a farmer
export const updateBankDetails = async (farmerId, bankData) => {
  try {
    const res = await axios.put(`${API_URL}/farmer/bank/editbank/${farmerId}`, bankData);
    return res.data; // { message, bankdetails }
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

// DELETE bank details for a farmer
export const deleteBankDetails = async (farmerId) => {
  try {
    const res = await axios.delete(`${API_URL}/farmer/bank/deletebank/${farmerId}`);
    return res.data; // { message }
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

//Buyer api
// get profile

export const getbuyerprofile = async (id) => {
  const res = await axios.get(
    `${API_URL}/buyer/profile/getprofile/${id}`
  );
  return res.data;
};

//update profile 

export const updatebuyerprofile = async (id, data) => {
  const res = await axios.put(
    `${API_URL}/buyer/profile/updateprofile/${id}`,
    data
  );
  return res.data;
};

//Add address
export const addAddress = async (userId, addressData) => {
  const res = await axios.post(
    `${API_URL}/buyer/profile/addaddress/${userId}`,
    addressData
  );
  return res.data;
};

//Get Address
export const getAddresses = (userId) => {
  return axios.get(
    `${API_URL}/buyer/profile/getaddresses/${userId}`
  );
};

//Edit Address
export const editAddress = (userId, addressId, data) => {
  return axios.put(
    `${API_URL}/buyer/profile/editaddress/${userId}/${addressId}`,
    data
  );
};

//dlt add
export const deleteAddress = (userId, addressId) => {
  return axios.delete(
    `${API_URL}/buyer/profile/deleteaddress/${userId}/${addressId}`
  );
};

//query post
export const postQuery = async (buyerId, queryData) => {
  const res = await axios.post(
    `${API_URL}/buyer/query/queryask/${buyerId}`, 
    queryData
  );
  return res.data;
};

//query get by one buyer
export const getBuyerQueries = async (buyerId) => {
  try {
    const res = await axios.get(
      `${API_URL}/buyer/query/querygetbyid/${buyerId}`
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//get all query to farmer
export const getFarmerQueries = async (farmerId) => {
  try {
    const res = await axios.get(`${API_URL}/buyer/query/farmer/${farmerId}/queries`);
    return res.data; // contains { success: true, queries: [...] }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//rply to query from farmer
export const replyToFarmerQuery = async (queryId, replyText) => {
  try {
    const res = await axios.put(`${API_URL}/buyer/query/reply/${queryId}/reply`, {
      reply: replyText,
    });
    return res.data; // contains { success: true, message, query: {...} }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


//Placeorder post
export const placeOrder = async (buyerId, data) => {
  const res = await axios.post(
    `${API_URL}/buyer/order/postorder/${buyerId}`,
    data
  );
  return res.data;
};

//get my orders to buyer
export const getBuyerOrders = async (buyerId) => {
  const res = await axios.get(
    `${API_URL}/buyer/order/myorders/${buyerId}`
  );
  return res.data;
};

//get his order to farmer
export const getFarmerOrders = async () => {
  const farmerId = localStorage.getItem("id");

  if (!farmerId) {
    throw new Error("Farmer not logged in");
  }

  const response = await axios.get(
    `${API_URL}/buyer/order/farmerorder/${farmerId}`
  );

  return response.data; // array
};

//changing orderstatus

export const updateOrderStatus = async (orderId, status) => {
  const farmerId = localStorage.getItem("id");

  const response = await axios.patch(
    `${API_URL}/buyer/order/farmer/${orderId}/status`,
    { status, farmerId }
  );

  return response.data;
};

// count of future and harvested

export const getFarmerOrderCounts = async () => {
  const farmerId = localStorage.getItem("id");
  const res = await axios.get(
    `${API_URL}/buyer/order/farmer/ordercount/${farmerId}`
  );
  return res.data;
};

//Admin
//farmer manage

export const Farmermanage = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/admin/manage/getfarmers`
    );
    return res.data.farmers;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//buyerr manage

export const Buyermanage = async () => {
  try {
    const res = await axios.get(`${API_URL}/admin/manage/getbuyers`);
    return Array.isArray(res.data.buyers) ? res.data.buyers : [];
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

//query manage

export const getAllQueries = async () => {
  const response = await axios.get(`${API_URL}/admin/manage/getqueries`);
  return response.data;
};

//order manage

export const getAllOrders = async () => {
  const response = await axios.get(`${API_URL}/admin/manage/getorders`);
  return response.data;
};

//harvest v/s future harvest in admin

export const getAllOrderscount = async () => {
  const response = await axios.get(`${API_URL}/admin/manage/getordercount`);
  return response.data;
};

//farmer v/s buyer
export const getUsercount = async () => {
  const response = await axios.get(`${API_URL}/admin/manage/getusercount`);
  return response.data;
};
