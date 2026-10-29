export type RoleType = 'gv' | 'cm';

export interface AwardItem {
  id: string;
  name: string;
  desc: string;
}

export interface AwardsData {
  gv: AwardItem[];
  cm: AwardItem[];
}
