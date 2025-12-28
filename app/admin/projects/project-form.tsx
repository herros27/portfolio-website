"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { createProject, updateProject } from "@/actions/projects";
import toast from "react-hot-toast";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import Link from "next/link";
import ImageUploader from "@/components/ui/image-uploader";
import AdminCard from "@/components/admin/admin-card";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().optional(),
  imagePublicId: z.string().optional(),
  demoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  tags: z.array(z.string()),
  published: z.boolean().default(false),
  order: z.number().default(0),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema) as never,
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      imageUrl: project?.imageUrl || "",
      imagePublicId: project?.imagePublicId || "",
      demoUrl: project?.demoUrl || "",
      githubUrl: project?.githubUrl || "",
      tags: project?.tags || [],
      published: project?.published || false,
      order: project?.order || 0,
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

  const onSubmit = async (data: ProjectFormValues) => {
    setIsLoading(true);
    try {
      const formData = {
        ...data,
        imageUrl: data.imageUrl || undefined,
        imagePublicId: data.imagePublicId || undefined,
        demoUrl: data.demoUrl || undefined,
        githubUrl: data.githubUrl || undefined,
      };

      const result = project
        ? await updateProject(project.id, formData)
        : await createProject(formData);

      if (result.error) {
        toast.error(
          typeof result.error === "string" ? result.error : "Validation error"
        );
      } else {
        toast.success(project ? "Project updated!" : "Project created!");
        router.push("/admin/projects");
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
          href='/admin/projects'
          className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'>
          <ArrowLeft size={20} />
        </Link>
        <div className='flex-1'>
          <h1 className='text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent'>
            {project ? "Edit Project" : "New Project"}
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-1'>
            {project
              ? "Update project details"
              : "Add a new project to your portfolio"}
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
            "Save Project"
          )}
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Title */}
          <AdminCard showBeam={true} beamSize={200} beamDuration={10} className='p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Project Title *
            </label>
            <input
              {...register("title")}
              type='text'
              placeholder='My Awesome Project'
              className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
            />
            {errors.title && (
              <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                {errors.title.message}
              </p>
            )}
          </AdminCard>

          {/* Description */}
          <AdminCard showBeam={true} beamSize={200} beamDuration={10} beamDelay={0.2} className='p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Description *
            </label>
            <textarea
              {...register("description")}
              rows={6}
              placeholder='Describe your project...'
              className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all'
            />
            {errors.description && (
              <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                {errors.description.message}
              </p>
            )}
          </AdminCard>

          {/* Tags */}
          <AdminCard showBeam={true} beamSize={200} beamDuration={10} beamDelay={0.4} className='p-4 sm:p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Tech Stack / Tags
            </label>

            {/* Input + Button */}
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center mb-4'>
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
                className='
                  w-full
                  px-4 py-3
                  rounded-lg
                  bg-gray-100 dark:bg-gray-800
                  border border-gray-300 dark:border-gray-700
                  text-gray-900 dark:text-white placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all
                '
              />

              <button
                type='button'
                onClick={addTag}
                className='
                  w-full
                  sm:w-auto
                  inline-flex items-center justify-center gap-2
                  px-6 py-3
                  rounded-lg
                  bg-linear-to-r from-blue-500 to-purple-600
                  text-white font-medium
                  hover:from-blue-600 hover:to-purple-700
                  transition-all
                  disabled:opacity-50
              '>
                <Plus size={20} />
              </button>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className='
          inline-flex items-center gap-1.5
          px-3 py-1.5
          rounded-full
          bg-blue-100 dark:bg-blue-500/20
          text-blue-600 dark:text-blue-400
          text-sm
        '>
                  <span className='truncate max-w-35 sm:max-w-none'>{tag}</span>
                  <button
                    type='button'
                    onClick={() => removeTag(tag)}
                    className='
            text-blue-500 dark:text-blue-300
            hover:text-blue-700 dark:hover:text-white
            transition-colors
          '>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </AdminCard>

          {/* Links */}
          <AdminCard showBeam={true} beamSize={200} beamDuration={10} beamDelay={0.6} className='p-6 space-y-4'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>Project Links</h3>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Live Demo URL
              </label>
              <input
                {...register("demoUrl")}
                type='url'
                placeholder='https://example.com'
                className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
              {errors.demoUrl && (
                <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                  {errors.demoUrl.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                GitHub Repository URL
              </label>
              <input
                {...register("githubUrl")}
                type='url'
                placeholder='https://github.com/username/repo'
                className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
              {errors.githubUrl && (
                <p className='mt-2 text-sm text-red-600 dark:text-red-400'>
                  {errors.githubUrl.message}
                </p>
              )}
            </div>
          </AdminCard>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Image */}
          <AdminCard showBeam={true} beamSize={150} beamDuration={6} beamDelay={0.8} className='p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
              Project Image
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
              folder='projects'
              aspectRatio='video'
            />
          </AdminCard>

          {/* Publish Status */}
          <AdminCard showBeam={true} beamSize={150} beamDuration={6} beamDelay={1} className='p-6'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4'>
              Visibility
            </label>
            <label className='flex items-center gap-3 cursor-pointer'>
              <input
                {...register("published")}
                type='checkbox'
                className='w-5 h-5 rounded border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-gray-900'
              />
              <span className='text-gray-900 dark:text-white'>Published</span>
            </label>
            <p className='mt-2 text-xs text-gray-500'>
              Only published projects are visible on your portfolio.
            </p>
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
              className='w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
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
