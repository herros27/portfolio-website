import { getProfile } from "@/actions/profile";
import ProfileForm from "./profile-form";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-white'>Profile</h1>
        <p className='text-gray-400 mt-1'>
          Manage your personal information and social links
        </p>
      </div>

      <ProfileForm profile={profile} />
    </div>
  );
}
