import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { randomUUID } from "node:crypto";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.service.createMany({
    data: [
      {
        id: randomUUID(),
        name: "Cardiac Stress Test",
        durationMinutes: 60,
        price: 320,
        description: "Heart monitoring during physical activity.",
      },
      {
        id: randomUUID(),
        name: "Blood Pressure Check",
        durationMinutes: 15,
        price: 35,
        description: "Blood pressure measurement and evaluation.",
      },
      {
        id: randomUUID(),
        name: "Full Health Checkup",
        durationMinutes: 90,
        price: 300,
        description: "Complete preventive health assessment.",
      },
      {
        id: randomUUID(),
        name: "Blood Test",
        durationMinutes: 15,
        price: 60,
        description: "Laboratory blood analysis.",
      },
      {
        id: randomUUID(),
        name: "X-Ray",
        durationMinutes: 30,
        price: 150,
        description: "Medical imaging using X-rays.",
      },
      {
        id: randomUUID(),
        name: "MRI Scan",
        durationMinutes: 60,
        price: 800,
        description: "Magnetic resonance imaging examination.",
      },
      {
        id: randomUUID(),
        name: "CT Scan",
        durationMinutes: 45,
        price: 600,
        description: "Computed tomography imaging.",
      },

      {
        id: randomUUID(),
        name: "Dermatology Consultation",
        durationMinutes: 30,
        price: 100,
        description: "Skin condition evaluation.",
      },
      {
        id: randomUUID(),
        name: "Mole Removal",
        durationMinutes: 45,
        price: 220,
        description: "Removal of suspicious or unwanted skin lesions.",
      },
      {
        id: randomUUID(),
        name: "Acne Treatment",
        durationMinutes: 30,
        price: 140,
        description: "Personalized acne treatment planning.",
      },
      {
        id: randomUUID(),
        name: "Skin Biopsy",
        durationMinutes: 40,
        price: 350,
        description: "Skin tissue sampling for analysis.",
      },

      {
        id: randomUUID(),
        name: "Neurological Consultation",
        durationMinutes: 45,
        price: 200,
        description: "Assessment of nervous system health.",
      },
      {
        id: randomUUID(),
        name: "EEG",
        durationMinutes: 60,
        price: 350,
        description: "Brain electrical activity recording.",
      },
      {
        id: randomUUID(),
        name: "Migraine Treatment",
        durationMinutes: 30,
        price: 160,
        description: "Diagnosis and treatment of migraine conditions.",
      },

      {
        id: randomUUID(),
        name: "Vaccination",
        durationMinutes: 15,
        price: 50,
        description: "Administration of preventive vaccines.",
      },
      {
        id: randomUUID(),
        name: "Child Wellness Check",
        durationMinutes: 30,
        price: 90,
        description: "Routine pediatric examination.",
      },
      {
        id: randomUUID(),
        name: "Growth Assessment",
        durationMinutes: 30,
        price: 80,
        description: "Child growth and development evaluation.",
      },

      {
        id: randomUUID(),
        name: "Joint Consultation",
        durationMinutes: 45,
        price: 180,
        description: "Orthopedic joint assessment.",
      },
      {
        id: randomUUID(),
        name: "Arthroscopy",
        durationMinutes: 90,
        price: 1800,
        description: "Minimally invasive joint procedure.",
      },
      {
        id: randomUUID(),
        name: "Fracture Treatment",
        durationMinutes: 60,
        price: 450,
        description: "Diagnosis and treatment of fractures.",
      },
      {
        id: randomUUID(),
        name: "Physical Therapy Session",
        durationMinutes: 60,
        price: 90,
        description: "Rehabilitation and movement therapy.",
      },

      {
        id: randomUUID(),
        name: "Eye Examination",
        durationMinutes: 30,
        price: 120,
        description: "Vision and eye health evaluation.",
      },
      {
        id: randomUUID(),
        name: "Dental Consultation",
        durationMinutes: 30,
        price: 80,
        description: "Dental health assessment.",
      },
      {
        id: randomUUID(),
        name: "Ultrasound",
        durationMinutes: 40,
        price: 200,
        description: "Diagnostic ultrasound imaging.",
      },
    ],
  });

  console.log("Services seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
