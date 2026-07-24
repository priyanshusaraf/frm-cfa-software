// Owner bar-approval artifact: prints Book 1 blocks + a sample 100-day schedule.
import { buildBlocks, scheduleBlocks } from "../src/lib/studyPath.js";

const b1 = buildBlocks().filter((b) => b.bookN === 1);
console.log("BOOK 1 BLOCKS");
for (const b of b1) console.log(`  [${b.kind}] ${b.name}: ${b.readings.join(", ")}`);

console.log("\nSAMPLE SCHEDULE (2026-01-01 .. 2026-04-11)");
const s = scheduleBlocks({ startDate: "2026-01-01", examDate: "2026-04-11" });
console.log(`  daysToExam=${s.daysToExam} studyDays=${s.studyDays} reviewDays=${s.reviewDays}`);
for (const it of s.scheduled.slice(0, 6))
  console.log(`  days ${it.startDay}-${it.endDay}: ${it.block.name} (${it.block.readings.length} readings)`);
