"use client";
import { useEffect, useState } from "react";
import { Mail, Pencil, Trash2 } from "lucide-react";
import { getUser, getUsers } from "@/api/users";
import { deleteMember, getAllMembers, inviteUser } from "@/api/members";
import type { InviteUserFormState, Member, User } from "@/lib/types";
import { SectionHeader } from "@/components/section-header";
import { DataTable } from "@/components/data-table";
import { Modal } from "@/components/modal";
import { FormField, Input, Select, FormActions } from "@/components/form";
import { toastError, toastSuccess } from "@/components/toast";
import { Button } from "@/components/button";

const emptyInviteUserForm: InviteUserFormState = {
  id: 0,
  role: "operator",
};

const roleOptions = ["owner", "admin", "operator", "viewer"];

export default function Users() {
  const [isInviteUserOpen, setIsInviteUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [inviteUserForm, setInviteUserForm] =
    useState<InviteUserFormState>(emptyInviteUserForm);
  const [deleteUserForm, setDeleteUserForm] =
    useState<InviteUserFormState>(emptyInviteUserForm);
  const [isSubmittingInviteUser, setIsSubmittingInviteUser] = useState(false);
  const [isSubmittingDeleteUser, setIsSubmittingDeleteUser] = useState(false);
  const [deleteConfirmUsername, setDeleteConfirmUsername] = useState("");

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [rawUsers, setRawUsers] = useState<User[]>([]);
  const [rawMembers, setRawMembers] = useState<Member[]>([]);

  async function fetchMembersAndUsers() {
    const allMembers = await getAllMembers();
    setRawMembers(allMembers);

    const users = await Promise.all(
      allMembers.map((member: Member) => getUser(member.user_id)),
    );
    setRawUsers(users);
  }

  useEffect(() => {
    async function loadInitialData() {
      await fetchMembersAndUsers();
      setAllUsers(await getUsers());
    }

    loadInitialData();
  }, []);

  function openInviteUserForm() {
    setInviteUserForm(emptyInviteUserForm);
    setIsInviteUserOpen(true);
  }

  function updateInviteUserForm(
    field: keyof InviteUserFormState,
    value: string | number,
  ) {
    setInviteUserForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleInviteUserSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setIsSubmittingInviteUser(true);

    try {
      await inviteUser(inviteUserForm.id, inviteUserForm.role);

      await fetchMembersAndUsers();
      setInviteUserForm(emptyInviteUserForm);
      setIsInviteUserOpen(false);
      toastSuccess("User invited successfully");
    } catch (error) {
      toastError(
        error instanceof Error ? error.message : "Failed to invite user",
      );
    } finally {
      setIsSubmittingInviteUser(false);
    }
  }

  async function handleDeleteUserSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setIsSubmittingDeleteUser(true);

    try {
      await deleteMember(deleteUserForm.id);
      setIsDeleteUserOpen(false);
      toastSuccess("User deleted successfully");
      await fetchMembersAndUsers();
    } catch (error) {
      toastError(
        error instanceof Error ? error.message : "Failed to delete user",
      );
    } finally {
      setIsSubmittingDeleteUser(false);
    }
  }
  const usersWithRoles = rawUsers
    .map((user) => {
      const member = rawMembers.find((entry) => entry.user_id === user.id);
      return member
        ? {
            ...user,
            role: member.role,
          }
        : null;
    })
    .filter((user): user is User & { role: string } => user !== null);

  const existingMemberIds = new Set(rawMembers.map((member) => member.user_id));
  const inviteableUsers = allUsers.filter(
    (user) => !existingMemberIds.has(user.id),
  );

  const deleteTargetUsername =
    usersWithRoles.find((u) => u.id === deleteUserForm.id)?.username ?? "";

  return (
    <section className="p-4">
      <SectionHeader
        title="Members"
        count={rawMembers.length}
        actionLabel="Invite"
        actionIcon={<Mail size={16} />}
        onAction={openInviteUserForm}
      />
      <DataTable
        rows={usersWithRoles}
        columns={[
          { header: "ID", render: (user) => user.id },
          {
            header: "Display Name",
            render: (user) => user.display_name || "N/A",
          },
          { header: "Email", render: (user) => user.email || "N/A" },
          { header: "Username", render: (user) => user.username },
          { header: "Role", render: (user) => user.role },
          {
            header: "Actions",
            render: (user) => {
              return (
                <div className="flex gap-2">
                  <Button edit>
                    <Pencil size={16} />
                  </Button>
                  <Button
                    danger
                    onClick={() => {
                      setDeleteUserForm({ id: user.id, role: user.role });
                      setDeleteConfirmUsername("");
                      setIsDeleteUserOpen(true);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              );
            },
          },
        ]}
      />
      <Modal
        open={isInviteUserOpen}
        title="Invite User"
        subtitle="Enter the user details below to invite a new user."
        onClose={() => setIsInviteUserOpen(false)}
      >
        <form onSubmit={handleInviteUserSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="User">
              <Select
                value={inviteUserForm.id}
                onChange={(event) =>
                  updateInviteUserForm("id", Number(event.target.value))
                }
              >
                <option value={0}>Select a user</option>
                {inviteableUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Role">
              <Select
                value={inviteUserForm.role}
                onChange={(event) =>
                  updateInviteUserForm("role", event.target.value)
                }
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Select>
            </FormField>
          </div>

          <FormActions
            onCancel={() => setIsInviteUserOpen(false)}
            submitLabel="Invite user"
            submittingLabel="Inviting..."
            submitting={isSubmittingInviteUser}
            disabled={inviteUserForm.id === 0}
          />
        </form>
      </Modal>
      <Modal
        open={isDeleteUserOpen}
        title="Delete User's Membership"
        subtitle={`Type "${deleteTargetUsername}" to confirm deletion.`}
        onClose={() => setIsDeleteUserOpen(false)}
      >
        <form onSubmit={handleDeleteUserSubmit}>
          <FormField label="Username">
            <Input
              value={deleteConfirmUsername}
              onChange={(event) => setDeleteConfirmUsername(event.target.value)}
              placeholder={deleteTargetUsername}
              autoFocus
            />
          </FormField>
          <FormActions
            onCancel={() => setIsDeleteUserOpen(false)}
            submitLabel="Delete membership"
            submittingLabel="Deleting..."
            submitting={isSubmittingDeleteUser}
            disabled={deleteConfirmUsername !== deleteTargetUsername}
            buttonIcon={<Trash2 size={16} />}
          />
        </form>
      </Modal>
    </section>
  );
}
