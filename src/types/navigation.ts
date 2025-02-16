
import { type ReactElement } from "react";

export interface NavItemProps {
  icon: React.ElementType;
  label: string;
  primary: boolean;
  to: string;
  description: string;
}
