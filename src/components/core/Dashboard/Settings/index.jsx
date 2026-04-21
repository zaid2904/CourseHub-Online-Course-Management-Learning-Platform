import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <>
    <div className="space-y-6">
      <div className="flex flex-col gap-2 mb-8">
        <div className="section-kicker">Account</div>
        <h1 className="font-display text-4xl font-extrabold text-slate-900 tracking-tight">
          Edit Profile
        </h1>
      </div>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </div>
    </>
  )
}
