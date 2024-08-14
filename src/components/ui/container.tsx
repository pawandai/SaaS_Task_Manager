import { ReactNode } from "react";

type ContainerProps = {
  className: string;
  children: ReactNode;
};

const Container = ({ className, children }: ContainerProps) => {
  return (
    <main className={`flex flex-col mx-auto max-w-7xl ${className}`}>
      {children}
    </main>
  );
};

export default Container;
