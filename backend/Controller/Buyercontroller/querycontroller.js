import Query from "../../Models/Buyer/query.js";

export const postQuery = async (req, res) => {
  try {
    const { buyerId } = req.params; // ✅ FROM URL
    const { productId, farmerId, productType, question } = req.body;

    if (!buyerId || !productId || !farmerId || !productType || !question) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newQuery = await Query.create({
      buyerId,
      farmerId,
      productId,
      productType,
      question,
      status: "asked",
    });

    res.status(201).json({
      message: "Query sent to farmer",
      query: newQuery,
    });
  } catch (error) {
    console.error("Post Query Error:", error);
    res.status(500).json({ message: "Failed to post query" });
  }
};




export const getQueriesByBuyer = async (req, res) => {
  try {
    const buyerId = req.params.buyerId.trim(); 

    const queries = await Query.find({ buyerId })
  .populate({
    path: "productId",
    select: "cropname category cropimage",
  })
  .populate({
    path: "farmerId",
    select: "name",
  })
  .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      queries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch buyer queries",
      error: error.message
    });
  }
};

//get all queries to farmer

export const getAllQueriesForFarmer = async (req, res) => {
  try {
    const farmerId = req.params.farmerId.trim();

    const queries = await Query.find({ farmerId })
      .populate({
        path: "buyerId",
        select: "name email",
      })
      .populate({
        path: "productId",
        select: "cropname variety category productType",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: queries.length, 
      queries,
    });
  } catch (error) {
    console.error("Fetch Queries Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch queries",
      error: error.message,
    });
  }
};


//replyby farmer
export const replyToQuery = async (req, res) => {
  try {
    const queryId = req.params.queryId;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ message: "Reply text is required" });
    }

    const updatedQuery = await Query.findByIdAndUpdate(
      queryId,
      { reply, status: "Replied" },
      { new: true }
    )
      .populate({
        path: "buyerId",
        select: "name email",
      })
      .populate({
        path: "productId",
        select: "name variety category productType",
      });

    res.status(200).json({
      success: true,
      message: "Query replied successfully",
      query: updatedQuery,
    });
  } catch (error) {
    console.error("Reply Query Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reply to query",
      error: error.message,
    });
  }
};
