import path from 'path';
import fs from 'fs';

export const shareJPG = (req, res) => {
  const imgData = req.body.image;

  // Extract the base64 part
  const base64Data = imgData.replace(/^data:image\/jpeg;base64,/, "");

  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  // Generate a unique filename
  const fileName = `certificate-${Date.now()}.jpg`;
  const filePath = path.join(uploadsDir, fileName);

  // Write the file
  fs.writeFile(filePath, base64Data, "base64", (err) => {
    if (err) {
      console.error("Error saving the image:", err);
      return res.status(500).send("Error saving the image");
    }

    // Send back the file path
    const fileUrl = `https://${req.get("host")}/uploads/${fileName}`;
    res.json({ filePath: fileUrl });
  });
};
