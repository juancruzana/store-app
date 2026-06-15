import { ProfileForm } from "../components/ProfileForm";
import { AddressManager } from "../components/AddressManager";

export default function AccountPage() {
  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-xl font-bold text-gray-900">Mi cuenta</h1>
      <ProfileForm />
      <AddressManager />
    </div>
  );
}
