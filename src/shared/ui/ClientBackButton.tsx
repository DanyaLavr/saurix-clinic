"use client";
import { useRouter } from "next/navigation";

const ClientBackButton = () => {
  const router = useRouter();
  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <button
      onClick={handleClick}
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
    </button>
  );
};

export default ClientBackButton;
