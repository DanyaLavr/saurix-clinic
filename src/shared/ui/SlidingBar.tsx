"use client";

import { TabContent } from "@/types/auth";

import { Link, usePathname } from "@/i18n/navigation";
interface IProps {
  leftContent: TabContent;
  rightContent: TabContent;
}
const SlidingBar = ({ leftContent, rightContent }: IProps) => {
  const pathname = usePathname();
  const isLeft = pathname.startsWith(leftContent.path);
  return (
    <div className="relative flex border-b border-stone-200">
      <Link
        href={leftContent.path}
        className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
          isLeft ? "text-stone-900" : "text-stone-500 hover:text-stone-700"
        }`}
      >
        {leftContent.text}
      </Link>
      <Link
        href={rightContent.path}
        className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
          !isLeft ? "text-stone-900" : "text-stone-500 hover:text-stone-700"
        }`}
      >
        {rightContent.text}
      </Link>
      <div
        className="absolute bottom-0 h-0.5 w-1/2 bg-amber-800 transition-transform duration-300"
        style={{ transform: isLeft ? "translateX(0%)" : "translateX(100%)" }}
      />
    </div>
  );
};

export default SlidingBar;
