"use client";
import { Header } from "@/lib/page-components/header";
import { usersMe } from "@/api/users";
import { Sidebar } from "@/lib/page-components/sidebar";
import { useEffect, useState } from "react";
import { H2 } from "@/lib/page-components/headings";
import { Plus, X } from "lucide-react";
import { Button } from "@/lib/page-components/button";
import { addDevice, getDevices } from "@/api/devices";
import Link from "next/link";

type DeviceRow = {
  id: number;
  hostname: string;
  ip: string;
  vendor: string;
  model: string;
  type: string;
};

type DeviceFormState = {
  hostname: string;
  ip: string;
  vendor: string;
  model: string;
  type: string;
};

const emptyDeviceForm: DeviceFormState = {
  hostname: "",
  ip: "",
  vendor: "",
  model: "",
  type: "",
};

export default function Devices() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [allDevices, setAllDevices] = useState<DeviceRow[]>([]);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [isSubmittingDevice, setIsSubmittingDevice] = useState(false);
  const [deviceFormError, setDeviceFormError] = useState("");
  const [deviceForm, setDeviceForm] =
    useState<DeviceFormState>(emptyDeviceForm);

  useEffect(() => {
    async function fetchUserData() {
      const userData = await usersMe();

      setUsername(userData.username);
      setDisplayName(userData.display_name);
    }

    async function fetchAllDevices() {
      const allDevices = await getDevices();
      const devicesData = await allDevices.json();
      setAllDevices(Array.isArray(devicesData) ? devicesData : []);
    }

    fetchUserData();
    fetchAllDevices();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isAddDeviceOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isAddDeviceOpen]);

  const preferredName = displayName || username || "N/A";

  function openAddDeviceForm() {
    setDeviceForm(emptyDeviceForm);
    setIsAddDeviceOpen(true);
  }

  function closeAddDeviceForm() {
    setIsAddDeviceOpen(false);
  }

  function updateDeviceForm(field: keyof DeviceFormState, value: string) {
    setDeviceForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleAddDeviceSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setDeviceFormError("");
    setIsSubmittingDevice(true);

    try {
      const response = await addDevice(deviceForm);

      if (!response.ok) {
        throw new Error("Failed to add device");
      }

      const refreshedDevices = await getDevices();
      const devicesData = await refreshedDevices.json();
      setAllDevices(Array.isArray(devicesData) ? devicesData : []);
      setDeviceForm(emptyDeviceForm);
      setIsAddDeviceOpen(false);
    } catch (error) {
      setDeviceFormError(
        error instanceof Error ? error.message : "Failed to add device",
      );
    } finally {
      setIsSubmittingDevice(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar activePage="devices" />
      <main className="flex-1">
        <Header pageName="Devices" preferredName={preferredName} />
        <section className="p-4">
          <div className="flex items-center justify-between">
            <H2>
              Devices &middot; <span>{allDevices.length || 0}</span>
            </H2>
            <Button onClick={openAddDeviceForm}>
              <Plus size={16} />
              Add
            </Button>
          </div>
          <table className="mt-6 w-full border border-black text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-r-black pl-1">ID</th>
                <th className="border border-r-black pl-1">Hostname</th>
                <th className="border border-r-black pl-1">IP</th>
                <th className="border border-r-black pl-1">Vendor</th>
                <th className="border border-r-black pl-1">Model</th>
                <th className="border border-r-black pl-1">Type</th>
              </tr>
            </thead>
            <tbody>
              {allDevices.map((device) => (
                <tr key={device.id} className="border border-b-black">
                  <td className="border border-r-black pl-1">{device.id}</td>
                  <td className="border border-r-black pl-1">
                    <Link
                      href={`/devices/${device.id}`}
                      className="flex items-center gap-1 hover:underline"
                    >
                      {device.hostname || "N/A"}
                    </Link>
                  </td>
                  <td className="border border-r-black pl-1">
                    {device.ip || "N/A"}
                  </td>
                  <td className="border border-r-black pl-1">
                    {device.vendor || "N/A"}
                  </td>
                  <td className="border border-r-black pl-1">
                    {device.model || "N/A"}
                  </td>
                  <td className="border border-r-black pl-1">
                    {device.type || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      {isAddDeviceOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={closeAddDeviceForm}
        >
          <div
            className="w-full max-w-2xl border border-black bg-white p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Add device</h2>
                <p className="mt-1 text-sm text-gray-700">
                  Enter the device details below to create a new record.
                </p>
              </div>
              <button
                type="button"
                onClick={closeAddDeviceForm}
                className="flex h-10 w-10 items-center justify-center border border-black bg-gray-100 hover:bg-gray-200 active:bg-gray-300 cursor-pointer"
                aria-label="Close add device form"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddDeviceSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-gray-900">
                  Hostname
                  <input
                    className="border border-black px-3 py-2 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20 "
                    type="text"
                    value={deviceForm.hostname}
                    onChange={(event) =>
                      updateDeviceForm("hostname", event.target.value)
                    }
                    placeholder="core-switch-01"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-gray-900">
                  IP Address
                  <input
                    className="border border-black px-3 py-2 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20"
                    type="text"
                    value={deviceForm.ip}
                    onChange={(event) =>
                      updateDeviceForm("ip", event.target.value)
                    }
                    placeholder="192.168.1.10"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-gray-900">
                  Vendor
                  <input
                    className="border border-black px-3 py-2 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20"
                    type="text"
                    value={deviceForm.vendor}
                    onChange={(event) =>
                      updateDeviceForm("vendor", event.target.value)
                    }
                    placeholder="Cisco"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-gray-900">
                  Model
                  <input
                    className="border border-black px-3 py-2 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20"
                    type="text"
                    value={deviceForm.model}
                    onChange={(event) =>
                      updateDeviceForm("model", event.target.value)
                    }
                    placeholder="Catalyst 9300"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-gray-900 md:col-span-2">
                  Type
                  <input
                    className="border border-black px-3 py-2 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20"
                    type="text"
                    value={deviceForm.type}
                    onChange={(event) =>
                      updateDeviceForm("type", event.target.value)
                    }
                    placeholder="Switch"
                  />
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeAddDeviceForm}
                  disabled={isSubmittingDevice}
                  className="border border-black bg-white px-4 py-2 hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingDevice}
                  className="border border-black bg-gray-200 px-4 py-2 text-black hover:bg-gray-300 active:bg-gray-400 cursor-pointer"
                >
                  {isSubmittingDevice ? "Adding..." : "Add device"}
                </button>
              </div>
              {deviceFormError ? (
                <p className="mt-3 text-sm text-red-700">{deviceFormError}</p>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
