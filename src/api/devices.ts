import { apiFetch, asArray } from "@/lib/api";
import type { Device, DeviceFormState } from "@/lib/types";

export async function getDevices(): Promise<Device[]> {
  const data = await apiFetch<unknown>("/devices");
  return asArray<Device>(data);
}

export async function getDevice(id: string): Promise<Device> {
  return apiFetch<Device>(`/devices/${id}`);
}

export async function addDevice(form: DeviceFormState): Promise<void> {
  await apiFetch("/devices", {
    method: "POST",
    body: form,
  });
}
