"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { addDevice, getDevices } from "@/api/devices";
import type { Device, DeviceFormState } from "@/lib/types";
import { SectionHeader } from "@/components/section-header";
import { DataTable } from "@/components/data-table";
import { Modal } from "@/components/modal";
import { FormField, Input, FormActions } from "@/components/form";

const emptyDeviceForm: DeviceFormState = {
  hostname: "",
  ip: "",
  vendor: "",
  model: "",
  type: "",
};

export default function Devices() {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [isSubmittingDevice, setIsSubmittingDevice] = useState(false);
  const [deviceFormError, setDeviceFormError] = useState("");
  const [deviceForm, setDeviceForm] =
    useState<DeviceFormState>(emptyDeviceForm);

  useEffect(() => {
    getDevices().then(setAllDevices);
  }, []);

  function updateDeviceForm(field: keyof DeviceFormState, value: string) {
    setDeviceForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function openAddDeviceForm() {
    setDeviceForm(emptyDeviceForm);
    setIsAddDeviceOpen(true);
  }

  async function handleAddDeviceSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setDeviceFormError("");
    setIsSubmittingDevice(true);

    try {
      await addDevice(deviceForm);
      setAllDevices(await getDevices());
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
    <section className="p-4">
      <SectionHeader
        title="Devices"
        count={allDevices.length}
        actionLabel="Add"
        actionIcon={<Plus size={16} />}
        onAction={openAddDeviceForm}
      />
      <DataTable
        rows={allDevices}
        columns={[
          { header: "ID", render: (device) => device.id },
          {
            header: "Hostname",
            render: (device) => (
              <Link
                href={`/devices/${device.id}`}
                className="flex items-center gap-1 hover:underline"
              >
                {device.hostname || "N/A"}
              </Link>
            ),
          },
          { header: "IP", render: (device) => device.ip || "N/A" },
          { header: "Vendor", render: (device) => device.vendor || "N/A" },
          { header: "Model", render: (device) => device.model || "N/A" },
          { header: "Type", render: (device) => device.type || "N/A" },
        ]}
      />
      <Modal
        open={isAddDeviceOpen}
        title="Add device"
        subtitle="Enter the device details below to create a new record."
        onClose={() => setIsAddDeviceOpen(false)}
      >
        <form onSubmit={handleAddDeviceSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Hostname">
              <Input
                type="text"
                value={deviceForm.hostname}
                onChange={(event) =>
                  updateDeviceForm("hostname", event.target.value)
                }
                placeholder="core-switch-01"
              />
            </FormField>
            <FormField label="IP Address">
              <Input
                type="text"
                value={deviceForm.ip}
                onChange={(event) =>
                  updateDeviceForm("ip", event.target.value)
                }
                placeholder="192.168.1.10"
              />
            </FormField>
            <FormField label="Vendor">
              <Input
                type="text"
                value={deviceForm.vendor}
                onChange={(event) =>
                  updateDeviceForm("vendor", event.target.value)
                }
                placeholder="Cisco"
              />
            </FormField>
            <FormField label="Model">
              <Input
                type="text"
                value={deviceForm.model}
                onChange={(event) =>
                  updateDeviceForm("model", event.target.value)
                }
                placeholder="Catalyst 9300"
              />
            </FormField>
            <FormField label="Type" className="md:col-span-2">
              <Input
                type="text"
                value={deviceForm.type}
                onChange={(event) =>
                  updateDeviceForm("type", event.target.value)
                }
                placeholder="Switch"
              />
            </FormField>
          </div>

          <FormActions
            onCancel={() => setIsAddDeviceOpen(false)}
            submitLabel="Add device"
            submittingLabel="Adding..."
            submitting={isSubmittingDevice}
            error={deviceFormError}
          />
        </form>
      </Modal>
    </section>
  );
}
