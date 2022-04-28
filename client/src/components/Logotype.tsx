import Image from "next/image";

export function Logotype() {
  return (
    <div className="flex flex-row place-items-center relative">
      <Image
        src="/img/VHPC_logo.png"
        alt="Website logo"
        width={1079 / 8}
        height={315 / 8}
      />
      <h1 className="text-3xl font-bold hidden md:block">Vad händer på campus?</h1>
    </div>
  );
}
