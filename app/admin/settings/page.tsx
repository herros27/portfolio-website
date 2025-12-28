import { getSectionVisibilitySettings } from "@/actions/settings";
import SettingsForm from "./settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const sections = await getSectionVisibilitySettings();

  return <SettingsForm sections={sections} />;
}
