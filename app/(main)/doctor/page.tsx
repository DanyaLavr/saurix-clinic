import prisma from "@/src/lib/prisma";
import { getServerSession } from "next-auth";

import ConnectCalendarButton from "@/src/entities/doctors/ui/ConnectCalendarButton";
import { authConfig } from "@/src/shared/config/authConfig";

export default async function DoctorPage() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) {
    return <div>Не авторизован</div>;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { doctor: true },
  });

  if (!user?.doctor) {
    return <div>Профиль доктора не найден</div>;
  }

  return (
    <div>
      <ConnectCalendarButton doctorId={user.doctor.id} />
    </div>
  );
}
