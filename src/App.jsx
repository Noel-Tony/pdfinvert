import React, { useState } from "react";   // 👈 add React here
import { PDFDocument, rgb } from "pdf-lib";

function App() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Iterate pages and invert text colors (demo)
    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      page.drawRectangle({
        x: 0,
        y: 0,
        width: page.getWidth(),
        height: page.getHeight(),
        color: rgb(0, 0, 0), // black background
      });
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    setPdfUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">PDF Inverter 🚀</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {pdfUrl && (
        <div>
          <a
            href={pdfUrl}
            download="inverted.pdf"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download Inverted PDF
          </a>
        </div>
      )}
    </div>
  );
}

export default App;

