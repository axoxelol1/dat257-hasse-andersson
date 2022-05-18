import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function Logotype() {
  return (
    <div className="flex flex-row place-items-center relative">
      <Link href={"http://localhost:3000/"}>
        <a>
          <Image
            src="/img/VHPC_logo.png"
            alt="Website logo"
            width={1079 / 12}
            height={315 / 12}
          />
        </a>
      </Link>
      <h1 className="text-3xl font-bold hidden md:block">Vad händer på campus?</h1>
    </div>
  );
}
