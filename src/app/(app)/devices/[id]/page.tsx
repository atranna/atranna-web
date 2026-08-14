"use client";

import { use, useEffect, useState } from "react";
import { getDevice } from "@/api/devices";
import type { Device } from "@/lib/types";
import { H2 } from "@/components/headings";

export default function Device({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [device, setDevice] = useState<Device>();

  useEffect(() => {
    getDevice(id).then(setDevice);
  }, [id]);

  return (
    <section className="p-4">
      <H2>{device?.hostname}</H2>
      <section className="pt-4 gap-x-4 flex flex-col">
        <div className="border border-latte-surface-0 dark:border-mocha-surface-0 rounded-lg p-4 max-w-100">
          <H2>Device Details</H2>
          <ul className="mt-2 space-y-1">
            <li>ID: {device?.id || "Loading..."}</li>
            <li>Hostname: {device?.hostname || "Loading..."}</li>
            <li>IP Address: {device?.ip || "Loading..."}</li>
            <li>Vendor: {device?.vendor || "Loading..."}</li>
            <li>Model: {device?.model || "Loading..."}</li>
          </ul>
        </div>
      </section>
    </section>
  );
}
