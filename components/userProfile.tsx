'use client';

import Image from 'next/image';
import React from 'react';

type UserData = {
  name: string;
  email: string;
  avatar_url: string;
};

type OrganizationData = {
  name: string;
  title: string;
};

type PlanData = {
  title: string;
};

type UserProfileProps = {
  user: UserData;
  organization: OrganizationData;
  plan: PlanData;
};

const UserProfile: React.FC<UserProfileProps> = ({ user, organization, plan }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center justify-center">
        <Image src={user.avatar_url} alt="User Avatar" className="w-16 h-16 rounded-full" />
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Organization</h3>
        <p>{organization.name}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Plan</h3>
        <p>{plan.title}</p>
      </div>
      {/* Add more sections to display additional user information */}
    </div>
  );
};

export default UserProfile;