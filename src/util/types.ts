export type Timestamp = { seconds: number; nanoseconds: number };

export interface Card {
  id: string;
  url: string;
  createdAt: string;
}

export interface UserAvatar {
  toggleProfileMenu: () => void;
}

export interface ProfileMenu {
  removeCredential: () => void;
  closeMenu: () => void;
}

export interface MoreOptions {
  showMenu: boolean;
  closeMenu: () => void;
  name: string;
  url: string;
  id: string;
}

export interface MenuOption {
  icon?: any;
  text: string;
  handleClick: (a?: any) => void;
}

export interface ContextMenu {
  containerStyle?: string;
  menuHeaderStyle?: string;
  menuHeaderText?: string;
  menuOptions?: MenuOption[];
  closeMenu: () => void;
}

export interface Row {
  id: string;
  url: string;
  name: string;
  ownerDisplayName: string;
  createdAt: any;
  selected: boolean;
  setSelected: any;
}

export type Group = { id: string; name: string; members: string[]; owner: string };

export interface GroupListItem {
  name: string;
  size: number;
}