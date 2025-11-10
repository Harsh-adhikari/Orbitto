// import { useState } from "react";
// import { Camera, Mail, User, Calendar, Shield } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";

// const ProfilePage = () => {
//   // ✅ NOW USING ACTUAL AUTH STORE instead of demo data
//   const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  
//   const [selectedImg, setSelectedImg] = useState(null);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//       const base64Image = reader.result;
//       setSelectedImg(base64Image);
//       // ✅ NOW ACTUALLY CALLING updateProfile from the store
//       await updateProfile({ profilePic: base64Image });
//     };
//   };

//   return (
//     <div className="min-h-screen bg-base-200 pt-20">
//       <div className="max-w-2xl mx-auto p-4 py-8">
//         <div className="bg-base-100 rounded-xl p-6 space-y-8 shadow-lg">
//           <div className="text-center">
//             <h1 className="text-2xl font-semibold">Profile</h1>
//             <p className="mt-2 text-base-content/70">Your profile information</p>
//           </div>

//           {/* Avatar upload section */}
//           <div className="flex flex-col items-center gap-4">
//             <div className="relative">
//               <img
//                 src={selectedImg || authUser?.profilePic || "/avatar.png"}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full object-cover border-4 border-base-300"
//               />
//               <label
//                 htmlFor="avatar-upload"
//                 className={`
//                   absolute bottom-0 right-0 
//                   bg-base-content hover:scale-105
//                   p-2 rounded-full cursor-pointer 
//                   transition-all duration-200
//                   ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}   
//                 `}
//               >
//                 <Camera className="w-5 h-5 text-base-100" />
//                 <input
//                   type="file"
//                   id="avatar-upload"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   disabled={isUpdatingProfile}
//                 />
//               </label>
//             </div>
//             <p className="text-sm text-base-content/70">
//               {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
//             </p>
//           </div>

//           <div className="space-y-6">
//             <div className="space-y-1.5">
//               <div className="text-sm text-base-content/70 flex items-center gap-2">
//                 <User className="w-4 h-4" />
//                 Full Name
//               </div>
//               <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300">
//                 {authUser?.fullName}
//               </p>
//             </div>

//             <div className="space-y-1.5">
//               <div className="text-sm text-base-content/70 flex items-center gap-2">
//                 <Mail className="w-4 h-4" />
//                 Email Address
//               </div>
//               <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300">
//                 {authUser?.email}
//               </p>
//             </div>
//           </div>

//           <div className="bg-base-200 rounded-xl p-6 border border-base-300">
//             <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
//               <Shield className="w-5 h-5" />
//               Account Information
//             </h2>
//             <div className="space-y-3 text-sm">
//               <div className="flex items-center justify-between py-2 border-b border-base-300">
//                 <span className="text-base-content/70">Member Since</span>
//                 <span className="font-medium">{authUser?.createdAt?.split("T")[0]}</span>
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <span className="text-base-content/70">Account Status</span>
//                 <span className="text-success font-semibold">Active User</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;




import { useState } from "react";
import { Camera, Mail, User, Shield, Pencil } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  // ✅ NOW USING ACTUAL AUTH STORE instead of demo data
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newFullName, setNewFullName] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleNameUpdate = async () => {
    if (!newFullName.trim() || newFullName === authUser?.fullName) {
      setIsEditingName(false);
      return;
    }
    await updateProfile({ fullName: newFullName.trim() });
    setIsEditingName(false);
    setNewFullName("");
  };

  const startEditingName = () => {
    setNewFullName(authUser?.fullName || "");
    setIsEditingName(true);
  };

  const cancelEdit = () => {
    setIsEditingName(false);
    setNewFullName("");
  };

  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-100 rounded-xl p-6 space-y-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2 text-base-content/70">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-base-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}   
                `}
              >
                <Camera className="w-5 h-5 text-base-100" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/70">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            {/* Full Name Field - Editable */}
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/70 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              {isEditingName ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-base-200 rounded-lg border border-base-300 focus:outline-none focus:border-primary"
                    placeholder="Enter your full name"
                    disabled={isUpdatingProfile}
                    autoFocus
                  />
                  <button
                    onClick={handleNameUpdate}
                    disabled={isUpdatingProfile}
                    className="btn btn-primary btn-sm px-4"
                  >
                    {isUpdatingProfile ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={cancelEdit}
                    disabled={isUpdatingProfile}
                    className="btn btn-ghost btn-sm px-4"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="relative w-full">
                  <p className="w-full px-4 py-2.5 pr-12 bg-base-200 rounded-lg border border-base-300">
                    {authUser?.fullName}
                  </p>
                  <button
                    onClick={startEditingName}
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-square"
                    title="Edit name"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Email Address Field - Read Only */}
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/70 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="bg-base-200 rounded-xl p-6 border border-base-300">
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-base-300">
                <span className="text-base-content/70">Member Since</span>
                <span className="font-medium">{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-base-content/70">Account Status</span>
                <span className="text-success font-semibold">Active User</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;