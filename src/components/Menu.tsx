// src/components/Menu.tsx
import { currentUser } from "@clerk/nextjs/server";
import MenuClient from "./MenuClient";

const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role;

  return <MenuClient role={role as string} />;
};

export default Menu;