import { LoaderFunctionArgs, ActionFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

import {
  getUserById,
  updateUserName,
  updateUserPassword,
} from "~/models/user.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const user = await getUserById(userId);

  if (user != null) {
    return { user };
  }
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const type = formData.get("type");

  if (type === "updateName") {
    const name = formData.get("name");
    if (typeof name === "string") {
      await updateUserName(userId, name);
      return { success: true };
    }
  } else if (type === "updatePassword") {
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");

    if (typeof oldPassword === "string" && typeof newPassword === "string") {
      const success = await updateUserPassword(
        userId,
        oldPassword,
        newPassword,
      );
      if (!success) {
        return { success: false, error: "Incorrect old password" };
      }
      return { success: true };
    }
  }

  return { success: false };
};

export default function ProfilePage() {
  const data = useLoaderData<typeof loader>();

  const [name, setName] = useState(data.user.name);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("type", "updateName");
    formData.append("name", name);

    await fetch("/profile", {
      method: "POST",
      body: formData,
    });
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("type", "updatePassword");
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);

    const response = await fetch("/profile", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Error:", response.status);
      const errorText = await response.text();
      console.error("Error details:", errorText);
      alert("Failed to update password.");
      return;
    }

    const result = await response.json();
    if (!result.success) {
      alert(result.error || "Failed to update password.");
    } else {
      alert("Password updated successfully!");
    }
  };

  if (!data.user) {
    return "...something went wrong";
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <ul style={{ listStyleType: "none", padding: 0, marginBottom: "20px" }}>
        <li style={{ marginBottom: "10px" }}>
          <strong>ID:</strong> {data.user.id}
        </li>
        <li style={{ marginBottom: "10px" }}>
          <strong>Email:</strong> {data.user.email}
        </li>
        <li style={{ marginBottom: "10px" }}>
          <strong>Name:</strong> {data.user.name}
        </li>
      </ul>

      <form onSubmit={handleNameChange} style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <span
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Name:
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Update Name
        </button>
      </form>

      <form onSubmit={handlePasswordChange}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <span
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Old Password:
          </span>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <span
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            New Password:
          </span>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <span
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Confirm New Password:
          </span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28A745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
