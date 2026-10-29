import { RoleType } from '@/types/awards';

export interface EchoMessageItem {
  id?: string;
  senderName: string;
  campusName: string;
  campusId?: string;
  recipientRole: string; // 'Giáo viên' | 'Class Manager'
  recipientName: string;
  message: string;
  createdAt?: string;
}

export interface EchoMessagePayload {
  voterName: string;
  recipientRole: RoleType;
  campusId: string;
  campusName: string;
  recipientName: string;
  message: string;
}
