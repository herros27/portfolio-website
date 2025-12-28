import { getProfile } from "@/actions/profile";
import ProfileForm from "./profile-form";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent'>
          Profile
        </h1>
        <p className='text-gray-600 dark:text-gray-400 mt-1'>
          Manage your personal information and social links
        </p>
      </div>

      <ProfileForm profile={profile} />
    </div>
  );
}
