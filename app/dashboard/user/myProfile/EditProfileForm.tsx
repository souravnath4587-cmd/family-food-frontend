"use client";

import { updateUserProfile } from "@/app/lib/api/profile";
import { FormEvent, useState } from "react";
// import { updateUserProfile } from "@/lib/api/user";

interface EditProfileFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    image?: string;
  };
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const [name, setName] = useState(user.name || "");

  const [phone, setPhone] = useState(user.phone || "");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      await updateUserProfile(user.id, {
        name,
        phone,
      });

      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="mb-2 block text-sm font-medium">Full Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium">Email</label>

        <input
          type="email"
          value={user.email}
          disabled
          className="w-full rounded-lg border bg-gray-100 px-4 py-3 text-gray-500"
        />

        <p className="mt-1 text-xs text-gray-500">
          Email cannot be changed here.
        </p>
      </div>

      {/* Phone */}
      <div>
        <label className="mb-2 block text-sm font-medium">Phone Number</label>

        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
          placeholder="Enter phone number"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
      )}

      {/* Success */}
      {success && (
        <p className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
          {success}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-lg bg-black px-6 py-3 font-medium text-white disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProfileForm;
