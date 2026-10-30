import { RoleType, AwardItem } from '@/types/awards';
import { CampusItem } from '@/types/campuses';

export interface VotePick {
  role: RoleType;
  vkey: string;
  name: string;
  campus: CampusItem;
  award: AwardItem;
}

export interface StudentInfo {
  studentName: string;
  studentCode?: string;
  studentPhone?: string;
}

export interface VoteFormValues extends StudentInfo {
  message: string;
}

export interface VotePayload extends StudentInfo {
  role: RoleType;
  awardId: string;
  awardName: string;
  campusId: string;
  campusName: string;
  nomineeName: string;
  voterMessage: string;
}

export interface VoteRecord extends VotePayload {
  id?: string;
  createdAt?: string;
}
