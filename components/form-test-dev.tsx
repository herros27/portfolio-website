"use client";

import React, { useState, ChangeEvent } from "react";
import { useWasm } from "validation_semantic";

export default function BatchValidationExample() {
  const { wasmReady, wasmModule, error: wasmError } = useWasm();
  const modelToUseKey = "GEMINI_FLASH"; // Bisa diganti: GEMINI_FLASH_LITE, GEMINI_FLASH_LATEST, GEMMA

  const [formData, setFormData] = useState<Record<string, string>>({
    email: "",
    "full name": "",
    address: "",
    "product name": "",
    "institution name": "",
    "company name": "",
    "location name": "",
    title: "",
    occupation: "",
    tag: "",
    "text area": "",
  });

  const [results, setResults] = useState<Record<
    string,
    { input: string; result: any; error: string | null }
  > | null>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateBatchInputs = async () => {
    if (!wasmReady || !wasmModule) {
      alert("⚠️ WASM module belum siap.");
      return;
    }

    const supportedModels = wasmModule.getSupportedModelSelectors();
    const modelSelectorInt = supportedModels[modelToUseKey];

    if (typeof modelSelectorInt === "undefined") {
      alert(`❌ Model ${modelToUseKey} tidak ditemukan.`);
      return;
    }

    setLoading(true);
    try {
      const validationPromises = Object.entries(formData)
        .filter(([_, value]) => value.trim() !== "")
        .map(async ([inputType, inputValue]) => {
          try {
            process.env.RESEND_API_KEY;
            console.log(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
            const result = await wasmModule.validateInput(
              inputValue,
              modelSelectorInt,
              inputType,
              process.env.NEXT_PUBLIC_GOOGLE_API_KEY!
            );
            return { inputType, inputValue, result, error: null };
          } catch (err: any) {
            return {
              inputType,
              inputValue,
              result: null,
              error: err?.message ?? "Validation error occurred.",
            };
          }
        });

      const resultsArray = await Promise.all(validationPromises);
      const batchResults = Object.fromEntries(
        resultsArray.map((r) => [
          r.inputType,
          { input: r.inputValue, result: r.result, error: r.error },
        ])
      );

      setResults(batchResults);
      console.log("✅ Batch Validation Results:", batchResults);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-xl mx-auto p-4 space-y-6 font-sans'>
      <h1 className='text-xl font-bold text-center'>Batch Validation Form</h1>

      {/* Form Input */}
      <div className='space-y-4'>
        {Object.keys(formData).map((key) => (
          <div key={key} className='flex flex-col'>
            <label className='font-semibold capitalize'>{key}</label>
            <input
              type='text'
              className='border border-gray-300 rounded-md p-2'
              value={formData[key]}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(key, e.target.value)
              }
              placeholder={`Masukkan ${key}`}
            />
          </div>
        ))}
      </div>

      {/* Tombol Validasi */}
      <button
        onClick={validateBatchInputs}
        disabled={loading || !wasmReady}
        className='bg-blue-600 text-white px-4 py-2 rounded-md w-full disabled:opacity-50'>
        {loading ? "Validating..." : "Validate All Inputs"}
      </button>

      {/* Hasil */}
      {results && (
        <div className='mt-6 bg-gray-100 p-4 rounded-md'>
          <h2 className='font-semibold mb-2'>Validation Results:</h2>
          <pre className='text-sm bg-black p-2 rounded-md overflow-x-auto'>
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}

      {/* Error WASM */}
      {wasmError && (
        <p className='text-red-500 text-sm text-center mt-4'>
          ❌ Error loading WASM: {wasmError}
        </p>
      )}
    </div>
  );
}
