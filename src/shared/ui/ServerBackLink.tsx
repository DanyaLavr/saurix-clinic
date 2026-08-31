import { headers } from "next/headers";
import Link from "next/link";

const ServerBackLink = async () => {
  const headerList = await headers();
  const referer = headerList.get("referer");
  let backUrl = "/";

  if (referer) {
    const url = new URL(referer);
    if (url.origin === process.env.NEXTAUTH_URL) {
      backUrl = `${url.pathname}${url.search}${url.hash}`;
    }
  }
  return (
    <Link
      href={backUrl}
      className="btn-ghost inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm"
    >
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M9.5 3L5 8l4.5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back
    </Link>
  );
};

export default ServerBackLink;
