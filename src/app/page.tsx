import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center index-main-box gap-8">
      <h1 className=" text-3xl text-center">👏欢迎来到我的宝可梦世界</h1>
      <Image src={"/logo.png"} width={400} height={200} alt="logo" className="mx-auto" />
    </div>
  );
}
