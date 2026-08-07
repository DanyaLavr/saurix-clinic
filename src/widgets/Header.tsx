import { getServerSession } from "next-auth";
import { authConfig } from "../shared/config/authConfig";
import Link from "next/link";
import { ROUTES } from "../shared/config/routes";
import { LogoutButton } from "../shared/ui/LogoutButton";

const Header = async () => {
  const session = await getServerSession(authConfig);
  return (
    <header>
      <div className="">Logo</div>
      <nav></nav>
      {!!session?.user ? (
        <div className="">
          <p>Привет, {session.user.name}</p>

          <LogoutButton />
        </div>
      ) : (
        <Link href={ROUTES.login}>Login</Link>
      )}
    </header>
  );
};

export default Header;
