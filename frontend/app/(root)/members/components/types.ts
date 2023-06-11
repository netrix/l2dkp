export interface RaidInfo {
    id: string;
    name: string;
    date: string;
  }

export interface MemberInfo {    // must conform to type redux service
    name: string;
    raids: Array<RaidInfo>;
  };
