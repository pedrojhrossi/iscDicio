import { Branch, Meta } from "./isc-appointment.interface";

export interface BranchList {
  branchList:    Branch[];
  meta:          Meta;
  notifications: any[];
}
