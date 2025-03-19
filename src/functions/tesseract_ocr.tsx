import Tesseract from "tesseract.js";

export const recognizeText = async (imageFiles: string[]) => {
    try {
      const texts = await Promise.all(
        imageFiles.map(async (file) => {
          const { data: { text } } = await Tesseract.recognize(file, "eng");
          return text;
        })
      );
      // return { name: texts[1], amount: texts[0] }
      // if(texts.length > 1) return { name: texts[1], amount: texts[0] }
      return {text: texts[0]}
    } catch (error) {
      console.error("Error during OCR recognition:", error);
      return {text: "Error in tesseract.js"};
    }
};