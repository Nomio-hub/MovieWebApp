import Link from "next/link";

type WhenProps = {
  when: string;
  href?: string;
};

export const When = ({ when, href }: WhenProps) => {
  return (
    <div className="flex w-full justify-between pb-8 pt-13 dark:text-white">
      <p className="font-semibold text-2xl">{when}</p>
      {href && (
        <Link
          href={href}
          className="flex justify-center items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <span className="text-sm text-medium">See more</span>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path
              d="M0.5 5.16667H9.83333M9.83333 5.16667L5.16667 0.5M9.83333 5.16667L5.16667 9.83333"
              stroke="currentcolor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};
