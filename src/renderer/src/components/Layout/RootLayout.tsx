import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const RootLayout = ({
  className,
  children,
  ...props
}: ComponentProps<"main">) => {
  return (
    <main className={twMerge("flex flex-row h-screen", className)} {...props}>
      {children}
    </main>
  );
};

export default RootLayout;
