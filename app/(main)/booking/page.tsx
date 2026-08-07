import getDoctors from "@/src/entities/doctors/module/getDoctors";
import BookingPageClient from "@/src/views/booking/ui/BookingPageClient";

export const dynamic = "force-dynamic";

const BookingPage = async () => {
  const doctors = await getDoctors();
  return <BookingPageClient initialDoctors={doctors} />;
};

export default BookingPage;
