"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { Profile } from "@prisma/client";
import { updateProfile, ProfileFormData } from "@/actions/profile";
import toast from "react-hot-toast";
import { Loader2, Save } from "lucide-react";
import ImageUploader from "@/components/ui/image-uploader";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().min(1, "Bio is required"),
  about: z.string().min(1, "About is required"),
  photoUrl: z.string().optional(),
  photoPublicId: z.string().optional(),
  resumeUrl: z.string().optional(),
  location: z.string().optional(),
  email: z.email().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
});

interface ProfileFormProps {
  profile: Profile | null;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.name || "",
      title: profile?.title || "",
      bio: profile?.bio || "",
      about: profile?.about || "",
      photoUrl: profile?.photoUrl || "",
      photoPublicId: profile?.photoPublicId || "",
      resumeUrl: profile?.resumeUrl || "",
      location: profile?.location || "",
      email: profile?.email || "",
      github: profile?.github || "",
      linkedin: profile?.linkedin || "",
      twitter: profile?.twitter || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      const result = await updateProfile(data);
      if (result.error) {
        toast.error(typeof result.error === "string" ? result.error : "Validation error");
      } else {
        toast.success("Profile updated!");
        router.refresh();
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
            <h3 className="text-lg font-medium text-white">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Professional Title *
                </label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="Full-Stack Developer"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-400">{errors.title.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Short Bio *
              </label>
              <textarea
                {...register("bio")}
                rows={3}
                placeholder="A brief introduction..."
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              {errors.bio && (
                <p className="mt-2 text-sm text-red-400">{errors.bio.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                About Section *
              </label>
              <textarea
                {...register("about")}
                rows={6}
                placeholder="Tell your story..."
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              {errors.about && (
                <p className="mt-2 text-sm text-red-400">{errors.about.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <input
                {...register("location")}
                type="text"
                placeholder="City, Country"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-4">
            <h3 className="text-lg font-medium text-white">Social Links</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub
                </label>
                <input
                  {...register("github")}
                  type="url"
                  placeholder="https://github.com/username"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  LinkedIn
                </label>
                <input
                  {...register("linkedin")}
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Twitter / X
                </label>
                <input
                  {...register("twitter")}
                  type="url"
                  placeholder="https://twitter.com/username"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Photo */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Profile Photo
            </label>
            <ImageUploader
              value={watch("photoUrl") || ""}
              publicId={watch("photoPublicId") || ""}
              onChange={(url, publicId) => {
                setValue("photoUrl", url);
                setValue("photoPublicId", publicId);
              }}
              onRemove={() => {
                setValue("photoUrl", "");
                setValue("photoPublicId", "");
              }}
              folder="profiles"
              aspectRatio="square"
            />
          </div>

          {/* Resume */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Resume URL
            </label>
            <input
              {...register("resumeUrl")}
              type="text"
              placeholder="/resume.pdf or https://..."
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Profile
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
