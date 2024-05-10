import Button from "@/component/Button";

import Link from "next/link";

export default function Home() {
  return (
   <div className="h-screen flex flex-col items-center justify-center bg-green-400 dark:bg-black">
      <h1 className="text-6xl font-extrabold text-blue-500 mb-1 dark:text-green-600">ChatHub</h1>
      <p className="mb-10 dark:text-green-500">Created by: Thabiso Masia</p>
      <Button as={Link} href="/chat" 
      className=" flext items-center justify-center gap-2 rounded bg-blue-500 p-[0.875rem] text-white active:bg-blue-600 disabled:bg-gray-200"
      >Start Chat</Button>
   </div>
  );
}
