"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  value?: string | null;
  publicId?: string | null;
  onChange: (url: string, publicId: string) => void;
  onRemove?: () => void;
  folder?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "auto";
}

export default function ImageUploader({
  value,
  publicId,
  onChange,
  onRemove,
  folder = "general",
  className = "",
  aspectRatio = "auto",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [useUpload, setUseUpload] = useState(true);
  const [urlInput, setUrlInput] = useState(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onChange(data.url, data.publicId);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = async () => {
    if (publicId && useUpload) {
      try {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId }),
        });
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
    
    onRemove?.();
    setUrlInput("");
    toast.success("Image removed");
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      toast.error("Please enter a URL");
      return;
    }
    onChange(urlInput.trim(), "");
    toast.success("URL saved");
  };

  const aspectClass = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "",
  }[aspectRatio];

  return (
    <div className={className}>
      {/* Toggle between Upload and URL */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setUseUpload(true)}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            useUpload
              ? "bg-blue-500 text-white"
              : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          <Upload size={16} />
          Upload Image
        </button>
        <button
          type="button"
          onClick={() => setUseUpload(false)}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            !useUpload
              ? "bg-blue-500 text-white"
              : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          <LinkIcon size={16} />
          Use URL
        </button>
      </div>

      {useUpload ? (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />

          {value ? (
            <div className={`relative rounded-lg overflow-hidden border border-gray-700 ${aspectClass}`}>
              <Image
                src={value}
                alt="Upload preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className={`w-full ${aspectClass} min-h-48 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-600 transition-colors flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-300`}
            >
              {isUploading ? (
                <>
                  <Loader2 size={32} className="animate-spin" />
                  <span className="text-sm">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload size={32} />
                  <span className="text-sm font-medium">Click to upload image</span>
                  <span className="text-xs text-gray-500">Max 5MB</span>
                </>
              )}
            </button>
          )}
        </>
      ) : (
        <div className="space-y-3">
          {value && (
            <div className={`relative rounded-lg overflow-hidden border border-gray-700 ${aspectClass} mb-3`}>
              <Image
                src={value}
                alt="URL preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </div>
          <p className="text-xs text-gray-500">Enter an image URL or path (e.g., /image.jpg)</p>
        </div>
      )}
    </div>
  );
}
