export type Timestamp = { seconds: number; nanoseconds: number };

export interface Card {
  id: string;
  url: string;
  createdAt: string;
}

export interface ProfileMenu {
  removeCredential: () => void;
  displayName: string;
  closeMenu: () => void;
}

export interface MenuOption {
  icon?: any;
  text: string;
  handleClick: (() => void) | ((a: any) => void);
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