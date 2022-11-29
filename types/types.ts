import { Dispatch, SetStateAction } from "react"

export interface ListItemTopProps {
  id: string,
  title: string,
  // onDeleteClick?: () => void
}

export interface ListItemTopData {
  id: string,
  title: string,
}


// NEW
// Function to generate random Ids
export function randomId(): string {
  return Math.random().toString(36).slice(2, 7)
}

export interface TitleItemData {
  id: string,
  title: string,
}

export type globalContextType = {
  titlesList: TitleItemData[]
  setTitlesList: Dispatch<SetStateAction<ListItemTopData[]>>
}

export interface ListItemProps {
  id: string;
  listId: string;
  value: string;
  isChecked: boolean;
  onDeleteClick: () => void;
  onClick: () => void;
}

export interface ListItemData{
  id: string;
  listId: string;
  value: string;
  isChecked: boolean;
}