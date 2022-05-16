import { PropsWithChildren } from "react";

export function Page({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="grid place-items-center">
      <div className="px-8 max-w-screen-xl w-full">
        <div className="flex flex-col md:flex-row w-full gap-4 mt-6">
          <div className="grow">{children}</div>
        </div>
      </div>
    </div>
  );
}
