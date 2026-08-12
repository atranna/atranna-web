export type Device = {
  id: number;
  hostname: string;
  ip: string;
  vendor: string;
  model: string;
  type: string;
};

export type DeviceFormState = {
  hostname: string;
  ip: string;
  vendor: string;
  model: string;
  type: string;
};

export type User = {
  id: number;
  display_name: string | null;
  email: string | null;
  username: string;
};

export type Member = {
  organization_id: number;
  user_id: number;
  role: string;
};

export type InviteUserFormState = {
  id: number;
  role: string;
};

export type Organization = {
  id: string;
  name: string;
};
