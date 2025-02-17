"use client"
import React, { useState } from "react";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [imageTerms, setImageTerms] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false); // ✅ Track loading state


  const handleClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement | null;

    if (fileInput) {
      fileInput.click();
    } else {
      console.error("File input element not found.");
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return; // ✅ Prevents possible null errors

    const files = Array.from(event.target.files);

    // Function to convert an image file to Base64
    const readFileAsBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string); // ✅ Explicitly type as `string`
        reader.onerror = (error) => reject(error); // Handle errors
      });
    };

    try {
      // Convert all selected images to Base64
      const base64Images = await Promise.all(files.map((file) => readFileAsBase64(file)));

      console.log("Converted Base64 images:", base64Images); // ✅ Debug output

      // ✅ Update the state with new Base64 images (fixed TypeScript error)
      setUploadedFiles((prevFiles) => [...prevFiles, ...base64Images]);
    } catch (error) {
      console.error("Error converting images to Base64:", error);
    }
  };

  const handleGenerateTerms = async () => {
    if (uploadedFiles.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setLoading(true); // ✅ Show loading spinner

    try {
      const response = await fetch("/api/analyzeImages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images: uploadedFiles }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Terms received from API:", data.terms);

      // ✅ Ensure exactly 6 terms
      const receivedTerms = data.terms || [];
      const filledTerms = [...receivedTerms, ...Array(6 - receivedTerms.length).fill("Waiting...")].slice(0, 6);

      setImageTerms(filledTerms);
    } catch (error) {
      console.error("Error fetching image terms:", error);
    } finally {
      setLoading(false); // ✅ Hide loading spinner after response
    }
  };

  return (

    <div className="min-h-screen bg-c1">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-8 sm:px-12 md:px-24 lg:px-48 pt-12 sm:pt-16 md:pt-24 lg:pt-36">
        <div className="col-span-1 flex flex-col">
          <div className="flex items-center text-3xl sm:text-4xl md:text-5xl font-poppins font-bold tracking-widest pb-6 sm:pb-8 md:pb-10">
            <h1 className="motion-opacity-in-0 motion-translate-y-in-15 motion-blur-in-md">Who are you? This is my opinion.</h1>
          </div>
          <div className="flex flex-row gap-4 pb-6 sm:pb-8 md:pb-10">
            <button
              onClick={handleClick}
              className="w-40 sm:w-32 h-12 bg-c6 rounded-full text-sm font-semibold sm:text-base">
              Upload
            </button>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
            <button
              onClick={handleGenerateTerms}
              className="w-40 sm:w-32 h-12 bg-c6 rounded-full text-sm font-semibold sm:text-base">
              Generate
            </button>
          </div>
        </div>

        <div className="col-span-2 flex items-center justify-center md:justify-end">
          <div className="w-full md:w-5/6 h-64 bg-c2 rounded-2xl border border-c3 p-4 overflow-y-auto">
            {uploadedFiles.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative group w-full pb-[100%]"
                  >
                    <div className="absolute inset-0">
                      <img
                        src={file}
                        alt={`Uploaded Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                      <button
                        // onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No images uploaded yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 px-8 sm:px-12 md:px-24 lg:px-48 pt-16 pb-8">
        <div className="w-full sm:w-1/3 h-48 bg-c4 rounded-xl border border-c5 shadow-md flex items-center justify-center">
          {loading ? (
            <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path className="opacity-75" d="M4 12a8 8 0 0116 0"></path>
            </svg>
          ) : (
            <p className="text-lg font-bold motion-blur-in-md">{imageTerms[0]}</p>
          )}
        </div>

        <div className="w-full sm:w-1/3 h-48 bg-c4 rounded-xl border border-c5 shadow-md flex items-center justify-center">
          {loading ? (
            <svg className="animate-spin h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path className="opacity-75" d="M4 12a8 8 0 0116 0"></path>
            </svg>
          ) : (
            <p className="text-lg font-bold motion-blur-in-md">{imageTerms[1]}</p>
          )}
        </div>

        <div className="w-full sm:w-1/3 h-48 bg-c4 rounded-xl border border-c5 shadow-md flex items-center justify-center">
          {loading ? (
            <svg className="animate-spin h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path className="opacity-75" d="M4 12a8 8 0 0116 0"></path>
            </svg>
          ) : (
            <p className="text-lg font-bold motion-blur-in-md">{imageTerms[2]}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 px-8 sm:px-12 md:px-24 lg:px-48 pb-16">
        <div className="w-full sm:w-1/3 h-48 bg-c4 rounded-xl border border-c5 shadow-md flex items-center justify-center">
          {loading ? (
            <svg className="animate-spin h-8 w-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path className="opacity-75" d="M4 12a8 8 0 0116 0"></path>
            </svg>
          ) : (
            <p className="text-lg font-bold motion-blur-in-md">{imageTerms[3]}</p>
          )}
        </div>

        <div className="w-full sm:w-1/3 h-48 bg-c4 rounded-xl border border-c5 shadow-md flex items-center justify-center">
          {loading ? (
            <svg className="animate-spin h-8 w-8 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path className="opacity-75" d="M4 12a8 8 0 0116 0"></path>
            </svg>
          ) : (
            <p className="text-lg font-bold motion-blur-in-md">{imageTerms[4]}</p>
          )}
        </div>

        <div className="w-full sm:w-1/3 h-48 bg-c4 rounded-xl border border-c5 shadow-md flex items-center justify-center">
          {loading ? (
            <svg className="animate-spin h-8 w-8 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path className="opacity-75" d="M4 12a8 8 0 0116 0"></path>
            </svg>
          ) : (
            <p className="text-lg font-bold motion-blur-in-md">{imageTerms[5]}</p>
          )}
        </div>
      </div>

    </div>
  );
}
