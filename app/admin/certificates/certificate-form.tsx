"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Certificate } from "@prisma/client";
import { createCertificate, updateCertificate } from "@/actions/certificates";
import toast from "react-hot-toast";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import Link from "next/link";
import ImageUploader from "@/components/ui/image-uploader";
import AdminCard from "@/components/admin/admin-card";

const certificateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  imagePublicId: z.string().optional(),
  credentialUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  issueDate: z.string().min(1, "Issue date is required"),
  tags: z.array(z.string()),
  order: z.number().default(0),
});

type CertificateFormValues = z.infer<typeof certificateSchema>;

interface CertificateFormProps {
  certificate?: Certificate;
}

export default function CertificateForm({ certificate }: CertificateFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema) as never,
    defaultValues: {
      title: certificate?.title || "",
      issuer: certificate?.issuer || "",
      description: certificate?.description || "",
      imageUrl: certificate?.imageUrl || "",
      imagePublicId: certificate?.imagePublicId || "",
      credentialUrl: certificate?.credentialUrl || "",
      issueDate: certificate?.issueDate
        ? new Date(certificate.issueDate).toISOString().split("T")[0]
        : "",
      tags: certificate?.tags || [],
      order: certificate?.order || 0,
    },
  });

  const tags = watch("tags");

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setValue("tags", [...tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tagToRemove)
    );
  };

  const onSubmit = async (data: CertificateFormValues) => {
    setIsLoading(true);
    try {
      const formData = {
        ...data,
        issueDate: new Date(data.issueDate),
        description: data.description || undefined,
        imageUrl: data.imageUrl || undefined,
        imagePublicId: data.imagePublicId || undefined,
        credentialUrl: data.credentialUrl || undefined,
      };

      const result = certificate
        ? await updateCertificate(certificate.id, formData)
        : await createCertificate(formData);

      if (result.error) {
        toast.error(
          typeof result.error === "string" ? result.error : "Validation error"
        );
      } else {
        toast.success(
          certificate ? "Certificate updated!" : "Certificate created!"
        );
        router.push("/admin/certificates");
        router.refresh();
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Link
          href='/admin/certificates'
          className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'>
          <ArrowLeft size={20} />
        </Link>
        <div className='flex-1'>
          <h1 className='text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent'>
            {certificate ? "Edit Certificate" : "New Certificate"}
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-1'>
            {certificate
              ? "Update certificate details"
              : "Add a new certificate"}
          </p>
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className='inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50'>
          {isLoading ? (
            <>
              <Loader2 size={18} className='animate-spin' />
              Saving...
            </>
          ) : (
            "Save Certificate"
          )}
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Title */}
          <AdminCard showBeam={true} beamSize={200} beamDuration={10} className='p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Certificate Title *
            </label>
            <input
              {...register("title")}
              type='text'
              placeholder='Certificate of Completion'
              className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
            />
            {errors.title && (
              <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                {errors.title.message}
              </p>
            )}
          </AdminCard>

          {/* Issuer & Description */}
          <AdminCard showBeam={true} beamSize={200} beamDuration={10} beamDelay={0.2} className='p-6 space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Issuer / Organization *
              </label>
              <input
                {...register("issuer")}
                type='text'
                placeholder='Google'
                className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
              {errors.issuer && (
                <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                  {errors.issuer.message}
                </p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder='Describe what this certificate represents...'
                className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all'
              />
            </div>
          </AdminCard>

          {/* Tags */}
          <AdminCard showBeam={true} beamSize={200} beamDuration={10} beamDelay={0.4} className='p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Skills / Tags
            </label>
            <div className='flex gap-2 mb-3'>
              <input
                type='text'
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder='Add a tag...'
                className='flex-1 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
              <button
                type='button'
                onClick={addTag}
                className='px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 transition-colors'>
                <Plus size={20} />
              </button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className='inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-sm'>
                  {tag}
                  <button
                    type='button'
                    onClick={() => removeTag(tag)}
                    className='hover:text-amber-800 dark:hover:text-white transition-colors'>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </AdminCard>

          {/* Credential URL */}
          <AdminCard showBeam={true} beamSize={200} beamDuration={10} beamDelay={0.6} className='p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Credential Verification URL
            </label>
            <input
              {...register("credentialUrl")}
              type='url'
              placeholder='https://credential.example.com/verify/...'
              className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
            />
            {errors.credentialUrl && (
              <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                {errors.credentialUrl.message}
              </p>
            )}
          </AdminCard>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Image */}
          <AdminCard showBeam={true} beamSize={150} beamDuration={6} beamDelay={0.8} className='p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
              Certificate Image
            </label>
            <ImageUploader
              value={watch("imageUrl") || ""}
              publicId={watch("imagePublicId") || ""}
              onChange={(url, publicId) => {
                setValue("imageUrl", url);
                setValue("imagePublicId", publicId);
              }}
              onRemove={() => {
                setValue("imageUrl", "");
                setValue("imagePublicId", "");
              }}
              folder='certificates'
              aspectRatio='video'
            />
          </AdminCard>

          {/* Issue Date */}
          <AdminCard showBeam={true} beamSize={150} beamDuration={6} beamDelay={1} className='p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Issue Date *
            </label>
            <input
              {...register("issueDate")}
              type='date'
              className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
            />
            {errors.issueDate && (
              <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                {errors.issueDate.message}
              </p>
            )}
          </AdminCard>

          {/* Order */}
          <AdminCard showBeam={true} beamSize={150} beamDuration={6} beamDelay={1.2} className='p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Display Order
            </label>
            <input
              {...register("order", { valueAsNumber: true })}
              type='number'
              min={0}
              className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
            />
            <p className='mt-2 text-xs text-gray-500'>
              Lower numbers appear first.
            </p>
          </AdminCard>
        </div>
      </div>
    </form>
  );
}
