"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Experience } from "@prisma/client";
import { createExperience, updateExperience } from "@/actions/experience";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import AdminCard from "@/components/admin/admin-card";

const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  icon: z.string().optional(),
  order: z.number().default(0),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  experience?: Experience;
}

export default function ExperienceForm({ experience }: ExperienceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema) as never,
    defaultValues: {
      title: experience?.title || "",
      company: experience?.company || "",
      location: experience?.location || "",
      description: experience?.description || "",
      startDate: experience?.startDate
        ? new Date(experience.startDate).toISOString().split("T")[0]
        : "",
      endDate: experience?.endDate
        ? new Date(experience.endDate).toISOString().split("T")[0]
        : "",
      current: experience?.current || false,
      icon: experience?.icon || "work",
      order: experience?.order || 0,
    },
  });

  const isCurrent = watch("current");

  const onSubmit = async (data: ExperienceFormValues) => {
    setIsLoading(true);
    try {
      const formData = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.current
          ? null
          : data.endDate
            ? new Date(data.endDate)
            : null,
        location: data.location || undefined,
        icon: data.icon || undefined,
      };

      const result = experience
        ? await updateExperience(experience.id, formData)
        : await createExperience(formData);

      if (result.error) {
        toast.error(
          typeof result.error === "string" ? result.error : "Validation error"
        );
      } else {
        toast.success(
          experience ? "Experience updated!" : "Experience created!"
        );
        router.push("/admin/experience");
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
          href='/admin/experience'
          className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'>
          <ArrowLeft size={20} />
        </Link>
        <div className='flex-1'>
          <h1 className='text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent'>
            {experience ? "Edit Experience" : "New Experience"}
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-1'>
            {experience
              ? "Update experience details"
              : "Add a new experience to your timeline"}
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
            "Save Experience"
          )}
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Title */}
          <AdminCard showBeam={true} beamSize={200} beamDuration={10} className='p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Job Title / Position *
            </label>
            <input
              {...register("title")}
              type='text'
              placeholder='Software Engineer'
              className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
            />
            {errors.title && (
              <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                {errors.title.message}
              </p>
            )}
          </AdminCard>

          {/* Company & Location */}
          <AdminCard showBeam={true} beamSize={200} beamDuration={10} beamDelay={0.2} className='p-6 space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Company / Organization *
              </label>
              <input
                {...register("company")}
                type='text'
                placeholder='Google'
                className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
              {errors.company && (
                <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                  {errors.company.message}
                </p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Location
              </label>
              <input
                {...register("location")}
                type='text'
                placeholder='San Francisco, CA'
                className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
            </div>
          </AdminCard>

          {/* Description */}
          <AdminCard showBeam={true} beamSize={200} beamDuration={10} beamDelay={0.4} className='p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Description *
            </label>
            <textarea
              {...register("description")}
              rows={5}
              placeholder='Describe your role and responsibilities...'
              className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all'
            />
            {errors.description && (
              <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                {errors.description.message}
              </p>
            )}
          </AdminCard>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Dates */}
          <AdminCard showBeam={true} beamSize={150} beamDuration={6} beamDelay={0.6} className='p-6 space-y-4'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>Duration</h3>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Start Date *
              </label>
              <input
                {...register("startDate")}
                type='date'
                className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
              {errors.startDate && (
                <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <label className='flex items-center gap-3 cursor-pointer'>
              <input
                {...register("current")}
                type='checkbox'
                className='w-5 h-5 rounded border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-gray-900'
              />
              <span className='text-gray-900 dark:text-white'>Currently working here</span>
            </label>

            {!isCurrent && (
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  End Date
                </label>
                <input
                  {...register("endDate")}
                  type='date'
                  className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                />
              </div>
            )}
          </AdminCard>

          {/* Icon */}
          <AdminCard showBeam={true} beamSize={150} beamDuration={6} beamDelay={0.8} className='p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Icon Type
            </label>
            <select
              {...register("icon")}
              className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'>
              <option value='work'>Work</option>
              <option value='graduation'>Education</option>
              <option value='android'>Android</option>
              <option value='flutter'>Flutter</option>
            </select>
          </AdminCard>

          {/* Order */}
          <AdminCard showBeam={true} beamSize={150} beamDuration={6} beamDelay={1} className='p-6'>
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
