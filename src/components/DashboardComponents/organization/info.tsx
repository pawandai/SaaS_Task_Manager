"use client";

import { useOrganization } from "@clerk/nextjs";

const Info = () => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <div className="flex items-center gap-x-4">Info</div>;
};

export default Info;
