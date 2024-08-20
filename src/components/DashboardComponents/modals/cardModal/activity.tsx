"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";
import ActivityItem from "../../activity/activityItems";

interface ActivityProps {
  items: AuditLog[];
}

const Activity = ({ items }: ActivityProps) => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="h-5 w-5 mt-0.5 text-slate-700" />
      <div className="w-full">
        <p className="font-semibold text-slate-700 mb-2">Activity</p>
        <ol className="mt-2 space-y-4">
          {items.map((item) => (
            <ActivityItem key={item.id} data={item} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Activity;

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-slate-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 mb-2 bg-slate-200" />
        <Skeleton className="h-10 w-full bg-slate-200" />
      </div>
    </div>
  );
};
