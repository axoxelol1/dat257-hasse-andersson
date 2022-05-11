import Image from "next/image";

export function Logotype() {
  return (
    <div className="flex flex-row place-items-center relative">
      <Image
        src="/img/VHPC_logo.png"
        alt="Website logo"
        width={1079 / 12}
        height={315 / 12}
      />
      <h1 className="text-3xl font-bold hidden lg:block">Vad händer på campus?</h1>
    </div>
  );
}
