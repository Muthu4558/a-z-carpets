import Enquiry from "../models/Enquiry.js";

// Save enquiry
export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, comment } = req.body;

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      comment,
    });

    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to submit enquiry" });
  }
};

// Get all enquiries (Admin)
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
};
