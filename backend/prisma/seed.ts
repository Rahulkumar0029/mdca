import { PrismaClient, UserRole, Gender, StudentStatus, PaymentMode } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting MDCA ERP Database Seeding...');

  // 1. Create MDCA School
  const school = await prisma.school.upsert({
    where: { code: 'MDCA-RSNR' },
    update: {},
    create: {
      name: 'M.D. Children Academy',
      code: 'MDCA-RSNR',
      affiliationNo: '1730999',
      address: 'Vijaynagar Road',
      city: 'Raisinghnagar',
      state: 'Rajasthan',
      pincode: '335051',
      phone: '+91 94140 00000',
      email: 'office@mdcarsnr.in',
      website: 'https://mdcarsnr.in',
      settings: {
        currency: 'INR',
        currenySymbol: '₹',
        academicSession: '2026-2027',
      },
    },
  });

  console.log(`✅ School registered: ${school.name} (Code: ${school.code})`);

  // 2. Academic Year
  const academicYear = await prisma.academicYear.upsert({
    where: { id: 'ay-2026-2027' },
    update: {},
    create: {
      id: 'ay-2026-2027',
      schoolId: school.id,
      name: '2026-2027',
      startDate: new Date('2026-04-01'),
      endDate: new Date('2027-03-31'),
      isCurrent: true,
    },
  });

  // Password hash for all sample accounts
  const passwordHash = await bcrypt.hash('Admin@123', 10);

  // 3. Create Key Staff / Users
  const principalUser = await prisma.user.upsert({
    where: { mobile: '9876543210' },
    update: {},
    create: {
      schoolId: school.id,
      mobile: '9876543210',
      email: 'principal@mdcarsnr.in',
      passwordHash,
      firstName: 'Dr. Ramesh',
      lastName: 'Sharma',
      role: UserRole.PRINCIPAL,
    },
  });

  const accountantUser = await prisma.user.upsert({
    where: { mobile: '9876543211' },
    update: {},
    create: {
      schoolId: school.id,
      mobile: '9876543211',
      email: 'accounts@mdcarsnr.in',
      passwordHash,
      firstName: 'Vikram',
      lastName: 'Singh',
      role: UserRole.ACCOUNTANT,
    },
  });

  const teacherUser = await prisma.user.upsert({
    where: { mobile: '9876543212' },
    update: {},
    create: {
      schoolId: school.id,
      mobile: '9876543212',
      email: 'sunita.verma@mdcarsnr.in',
      passwordHash,
      firstName: 'Sunita',
      lastName: 'Verma',
      role: UserRole.TEACHER,
    },
  });

  console.log('✅ Staff users created (Principal, Accountant, Teacher)');

  // 4. Classes and Sections
  const class10 = await prisma.class.create({
    data: {
      schoolId: school.id,
      name: 'Class 10',
      displayOrder: 10,
      sections: {
        create: [
          { name: 'A', capacity: 45 },
          { name: 'B', capacity: 45 },
        ],
      },
    },
    include: { sections: true },
  });

  const section10A = class10.sections[0];

  // 5. Fee Heads
  const tuitionFeeHead = await prisma.feeHead.create({
    data: {
      schoolId: school.id,
      name: 'Tuition Fee',
      type: 'ACADEMIC',
    },
  });

  const labFeeHead = await prisma.feeHead.create({
    data: {
      schoolId: school.id,
      name: 'Science & Computer Lab Fee',
      type: 'ACADEMIC',
    },
  });

  // 6. Sample Student
  const student = await prisma.student.create({
    data: {
      schoolId: school.id,
      admissionNo: 'MDCA-2026-0042',
      srNo: 'SR-1142',
      firstName: 'Aarav',
      lastName: 'Sharma',
      dob: new Date('2011-08-15'),
      gender: Gender.MALE,
      bloodGroup: 'B+',
      category: 'General',
      address: 'Ward No 12, Raisinghnagar',
      status: StudentStatus.ACTIVE,
      enrollments: {
        create: {
          academicYearId: academicYear.id,
          sectionId: section10A.id,
          rollNo: 1,
        },
      },
      feeLedgers: {
        create: [
          {
            feeHeadId: tuitionFeeHead.id,
            periodLabel: 'Q1 (Apr-Jun 2026)',
            amountDuePaise: BigInt(750000), // ₹7,500
            amountPaidPaise: BigInt(750000),
            status: 'PAID',
            dueDate: new Date('2026-04-15'),
          },
          {
            feeHeadId: tuitionFeeHead.id,
            periodLabel: 'Q2 (Jul-Sep 2026)',
            amountDuePaise: BigInt(750000), // ₹7,500
            amountPaidPaise: BigInt(0),
            status: 'PENDING',
            dueDate: new Date('2026-07-15'),
          },
        ],
      },
    },
  });

  console.log(`✅ Sample student registered: ${student.firstName} ${student.lastName} (${student.admissionNo})`);
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
