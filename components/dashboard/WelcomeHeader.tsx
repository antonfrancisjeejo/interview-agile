"use client";

import { useAuth } from "../auth/AuthProvider";

const WelcomeHeader = () => {
  const { user } = useAuth();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
        Welcome back, {user?.user_metadata?.full_name || "User"}
      </h1>
      <p className="text-gray-600 mt-2">
        Here's an overview of your interview preparation journey
      </p>
    </div>
  );
};

export default WelcomeHeader;
