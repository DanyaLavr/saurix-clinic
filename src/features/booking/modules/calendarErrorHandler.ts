import { NextResponse } from "next/server";

interface IProps {
  date: string | null;
  serviceId: string | null;
  doctorId: string | null;
}
const calendarErrorHandler = ({
  date,
  serviceId,
  doctorId,
}: IProps): NextResponse | null => {
  if (!date) {
    return NextResponse.json({ error: "month is required" }, { status: 400 });
  }
  if (!serviceId) {
    return NextResponse.json(
      { error: "service id is required" },
      { status: 400 },
    );
  }
  if (!doctorId) {
    return NextResponse.json(
      { error: "doctor id is required" },
      { status: 400 },
    );
  }
  return null;
};

export default calendarErrorHandler;
