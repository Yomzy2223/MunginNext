import Image from "next/image";
import React, { ReactNode } from "react";
import icon from "@/assets/icons/mungin-icon-white.svg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const AdminAuthLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const handleUser = (user: string) => {
    user = normalize(user);
    router.push({
      query: {
        ...router.query,
        user,
      },
    });
  };

  const normalize = (text: string) => text.split(" ").join("-").toLowerCase();

  let active = router.query.user;
  if (typeof active === "string") normalize(active);

  return (
    <div className="flex h-screen max-h-screen ">
      <div className="flex flex-col bg-primary p-8 sticky top-0">
        <div className="flex items-center">
          <Image src={icon} alt="" className="h-max w-max " />
          <p className="text-white pr-4 text-2xl font-semibold ">mungin</p>
        </div>
        <div className="flex justify-center items-center flex-col gap-11 h-full ">
          <p className="text-white text-3xl font-semibold">SIGN UP</p>
          <div className="flex flex-col gap-6">
            {regUsers.map((el, i) => (
              <Button
                key={i}
                className={cn(
                  "bg-background text-primary text-center hover:bg-background/90",
                  active === normalize(el) && "bg-[#0A6B6B] hover:bg-[#0A6B6B]/90"
                )}
                onClick={() => handleUser(el)}
              >
                {el}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-1 p-10  overflow-auto">
        <Button variant="ghost2" onClick={() => router.push("/")}>
          <ArrowLeft />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default AdminAuthLayout;

const regUsers = ["Farmer", "Institution", "Investor", "Service Provider", "Individual"];
