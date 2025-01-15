export interface CategorySidebarMenu {
  id: number;
  title: string;
  link: string;
}

export interface SidebarMenu {
  id: number;
  title: string;
  icon: JSX.Element;
  icon2: JSX.Element;
  icon3?: JSX.Element;
  link: string;
  role: string;
  category?: CategorySidebarMenu[];
}

export interface User {
  firstName: string;
  lastName: string;
  role: string;
  location: string;
  emailAddress: string;
}

export interface LoacationProps {
  location: string;
  state: string;
  id: string;
  dateCreated: string;
  dateModified: string;
}

export interface RoleListProps {
  dateCreated: string;
  dateModified: string;
  id: string;
  isDeleted: boolean;
  name: string;
}
export interface User {
  id: number;
  altirevId: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  phoneNumber: string;
  gender: string;
  state: string;
  country: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  socialId: string;
}

export interface Plan {
  id: string;
  title: string;
  sub_code: number;
  subtitle: string;
  link: string;
  description: string;
  maxSubscriber: number;
  minSubscriber: number;
  pricing: number;
  feature: string;
  created_at: string;
  updated_at: string;
}
export interface ReportType {
  id: string;
  title: string;
  userId: string;
  ward: string;
  pollingUnit: string;
  message: string;
  status: string;
  fileUrl: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface ResultType {
  id: string;
  title: string;
  userAltirevId: string;
  counts: string | number | null | {};
  electionType: string;
  accreditedVoters: string | number;
  status: string;
  fileUrl: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
  invalidVotes: string | number;
  voteCasted: string | number;
  createdAt: string;
  updatedAt: string;
}
export interface ContactType {
  id: string;
  email: string;
  name: string;
  message: string;
  created_at: string;
  updated_at: string;
  isReplied: boolean;
}
export interface StateType {
  id: string;
  countryId: string;
  stateName: string;
  __entity: string;
  createdAt: string;
  updatedAt: string;
}
export interface LGAType {
  id: string;
  stateId: string;
  lgaName: string;
  __entity: string;
  createdAt: string;
  updatedAt: string;
}
export interface WardType {
  id: string;
  lgaId: string;
  wardName: string;
  __entity: string;
  createdAt: string;
  updatedAt: string;
}
export interface PollingUnitType {
  id: string;
  wardId: string;
  pollingUnit: string;
  __entity: string;
  createdAt: string;
  updatedAt: string;
}
