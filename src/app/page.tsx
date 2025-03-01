import Image from "next/image";

import Welcome from "@/components/welcome";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center index-main-box gap-8">
      <Welcome />
      <Image src={"/logo.png"} width={400} height={200} alt="logo" className="mx-auto" />
    </div>
  );
}
