import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Using reliable Wikipedia Commons images for traffic signs
const SIGN_IMAGES = {
    stop: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/STOP_sign.svg/220px-STOP_sign.svg.png",
    yield: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/United_States_-_Yield.svg/220px-United_States_-_Yield.svg.png",
    speed25: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Speedlimit25.svg/200px-Speedlimit25.svg.png",
    deer: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/OH-deer-ahead.svg/200px-OH-deer-ahead.svg.png",
    pedestrian: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/MUTCD_W11-2.svg/200px-MUTCD_W11-2.svg.png",
    railroad: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/MUTCD_W10-1.svg/200px-MUTCD_W10-1.svg.png",
    noUturn: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_U-Turn.svg/200px-No_U-Turn.svg.png",
    oneWay: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Road_Sign_One_Way.svg/200px-Road_Sign_One_Way.svg.png",
    doNotEnter: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/MUTCD_R5-1.svg/200px-MUTCD_R5-1.svg.png",
    noParking: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/MUTCD_R8-3.svg/200px-MUTCD_R8-3.svg.png",
    hospital: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/MUTCD_D9-2.svg/200px-MUTCD_D9-2.svg.png",
    roadWork: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Construction_sign.svg/200px-Construction_sign.svg.png",
    curve: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/MUTCD_W1-2R.svg/200px-MUTCD_W1-2R.svg.png",
    school: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/MUTCD_S1-1.svg/200px-MUTCD_S1-1.svg.png",
    merge: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/MUTCD_W4-1.svg/200px-MUTCD_W4-1.svg.png",
};

async function main() {
    console.log("🌱 Seeding database...");

    // Clear existing data
    await prisma.quizAnswer.deleteMany();
    await prisma.quizSession.deleteMany();
    await prisma.quizQuestion.deleteMany();
    await prisma.signProgress.deleteMany();
    await prisma.userBadge.deleteMany();
    await prisma.badge.deleteMany();
    await prisma.sign.deleteMany();
    await prisma.user.deleteMany();

    // Seed Signs
    const signs = await Promise.all([
        prisma.sign.create({
            data: {
                name: "Stop Sign",
                category: "REGULATORY",
                description: "Come to a complete stop at the intersection.",
                imageUrl: SIGN_IMAGES.stop,
                rules: "Stop completely before the stop line or crosswalk. Check for traffic from all directions before proceeding.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "Yield Sign",
                category: "REGULATORY",
                description: "Slow down and yield to oncoming traffic.",
                imageUrl: SIGN_IMAGES.yield,
                rules: "Slow down as you approach. Be prepared to stop if necessary. Yield the right-of-way to pedestrians and vehicles.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "Speed Limit 25",
                category: "REGULATORY",
                description: "Maximum speed limit is 25 mph.",
                imageUrl: SIGN_IMAGES.speed25,
                rules: "Do not exceed 25 miles per hour. Common in residential areas and school zones.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "Deer Crossing",
                category: "WARNING",
                description: "Wildlife may cross the road ahead.",
                imageUrl: SIGN_IMAGES.deer,
                rules: "Reduce speed and stay alert, especially at dawn and dusk. Watch for deer and other wildlife.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "Pedestrian Crossing",
                category: "WARNING",
                description: "Pedestrians may be crossing ahead.",
                imageUrl: SIGN_IMAGES.pedestrian,
                rules: "Slow down and be prepared to stop for pedestrians. Always yield to pedestrians in crosswalks.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "Railroad Crossing",
                category: "WARNING",
                description: "Railroad tracks ahead.",
                imageUrl: SIGN_IMAGES.railroad,
                rules: "Slow down and look both ways. Never stop on the tracks. If gates are down, wait until they rise.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "No U-Turn",
                category: "REGULATORY",
                description: "U-turns are prohibited.",
                imageUrl: SIGN_IMAGES.noUturn,
                rules: "You cannot make a U-turn at this intersection. Find an alternative route.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "One Way",
                category: "REGULATORY",
                description: "Traffic flows in one direction only.",
                imageUrl: SIGN_IMAGES.oneWay,
                rules: "Traffic travels only in the direction indicated. Do not enter from the opposite direction.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "Do Not Enter",
                category: "REGULATORY",
                description: "Entry is prohibited for all vehicles.",
                imageUrl: SIGN_IMAGES.doNotEnter,
                rules: "Do not enter this road. Usually marks wrong-way entrance to one-way streets.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "No Parking",
                category: "REGULATORY",
                description: "Parking is not allowed in this area.",
                imageUrl: SIGN_IMAGES.noParking,
                rules: "Parking is prohibited. Vehicles may be towed if parked here.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "Hospital Ahead",
                category: "GUIDE",
                description: "Hospital services ahead.",
                imageUrl: SIGN_IMAGES.hospital,
                rules: "Follow signs for hospital access. Reduce noise and speed near hospital areas.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "Road Work Ahead",
                category: "CONSTRUCTION",
                description: "Construction zone ahead.",
                imageUrl: SIGN_IMAGES.roadWork,
                rules: "Reduce speed in work zones. Watch for workers and equipment. Fines usually doubled.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "Curve Ahead",
                category: "WARNING",
                description: "Road curves ahead to the right.",
                imageUrl: SIGN_IMAGES.curve,
                rules: "Slow down before the curve. Stay in your lane and avoid sudden steering movements.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "School Zone",
                category: "WARNING",
                description: "School area with children present.",
                imageUrl: SIGN_IMAGES.school,
                rules: "Reduce speed to posted limit. Watch for children, especially during school hours.",
                region: "US",
            },
        }),
        prisma.sign.create({
            data: {
                name: "Merge",
                category: "WARNING",
                description: "Lanes merging ahead.",
                imageUrl: SIGN_IMAGES.merge,
                rules: "Be prepared for merging traffic. Adjust speed and position to allow safe merging.",
                region: "US",
            },
        }),
    ]);

    console.log(`✅ Created ${signs.length} signs`);

    // Seed Quiz Questions
    const questions = await Promise.all([
        prisma.quizQuestion.create({
            data: {
                signId: signs[0].id, // Stop Sign
                questionText: "What action does this sign require?",
                options: JSON.stringify(["Come to a complete stop", "Yield to traffic", "Slow down", "Honk horn"]),
                correctAnswer: 0,
                difficulty: 1,
                explanation: "A stop sign requires you to come to a complete stop before the stop line or crosswalk.",
            },
        }),
        prisma.quizQuestion.create({
            data: {
                signId: signs[1].id, // Yield
                questionText: "When you see this sign, you should:",
                options: JSON.stringify(["Stop completely", "Speed up", "Slow down and yield", "Ignore if clear"]),
                correctAnswer: 2,
                difficulty: 1,
                explanation: "A yield sign means you must slow down and give way to other traffic and pedestrians.",
            },
        }),
        prisma.quizQuestion.create({
            data: {
                signId: signs[3].id, // Deer Crossing
                questionText: "This yellow sign warns about:",
                options: JSON.stringify(["Zoo entrance", "Deer crossing area", "Farm animals", "Hunting zone"]),
                correctAnswer: 1,
                difficulty: 2,
                explanation: "This warning sign indicates an area where deer frequently cross the road.",
            },
        }),
        prisma.quizQuestion.create({
            data: {
                signId: signs[6].id, // No U-Turn
                questionText: "What does this sign prohibit?",
                options: JSON.stringify(["Left turns", "Right turns", "U-turns", "All turns"]),
                correctAnswer: 2,
                difficulty: 1,
                explanation: "This sign prohibits U-turns at this location.",
            },
        }),
        prisma.quizQuestion.create({
            data: {
                signId: signs[5].id, // Railroad
                questionText: "At this sign, you should:",
                options: JSON.stringify(["Speed up", "Stop only if train visible", "Slow down, look both ways", "Honk"]),
                correctAnswer: 2,
                difficulty: 2,
                explanation: "Always slow down at railroad crossings and look both ways for approaching trains.",
            },
        }),
        prisma.quizQuestion.create({
            data: {
                signId: signs[8].id, // Do Not Enter
                questionText: "This sign indicates:",
                options: JSON.stringify(["Slow traffic ahead", "Stop and proceed", "Entry prohibited", "Yield to traffic"]),
                correctAnswer: 2,
                difficulty: 1,
                explanation: "Do Not Enter signs mark restricted areas, usually wrong-way entrances to one-way streets.",
            },
        }),
        prisma.quizQuestion.create({
            data: {
                signId: signs[7].id, // One Way
                questionText: "This arrow sign means:",
                options: JSON.stringify(["Turn left only", "One-way traffic", "Merge left", "Lane ends"]),
                correctAnswer: 1,
                difficulty: 1,
                explanation: "This sign indicates traffic flows in one direction only.",
            },
        }),
        prisma.quizQuestion.create({
            data: {
                signId: signs[11].id, // Road Work
                questionText: "When you see this orange sign:",
                options: JSON.stringify(["Speed up", "Proceed normally", "Reduce speed, watch for workers", "Stop"]),
                correctAnswer: 2,
                difficulty: 2,
                explanation: "Construction zone signs require you to slow down and be alert for workers and equipment.",
            },
        }),
        prisma.quizQuestion.create({
            data: {
                signId: signs[13].id, // School Zone
                questionText: "In a school zone, you should:",
                options: JSON.stringify(["Maintain normal speed", "Watch for children, reduce speed", "Honk to alert", "Speed up"]),
                correctAnswer: 1,
                difficulty: 1,
                explanation: "School zones require reduced speed and extra alertness for children, especially during school hours.",
            },
        }),
        prisma.quizQuestion.create({
            data: {
                signId: signs[2].id, // Speed Limit
                questionText: "This sign means:",
                options: JSON.stringify(["Minimum speed 25", "Maximum speed 25 mph", "Speed check ahead", "25 miles to exit"]),
                correctAnswer: 1,
                difficulty: 1,
                explanation: "Speed limit signs indicate the maximum legal speed for that road section.",
            },
        }),
    ]);

    console.log(`✅ Created ${questions.length} quiz questions`);

    // Seed Badges
    const badges = await Promise.all([
        prisma.badge.create({ data: { name: "First Steps", description: "Complete your first quiz", iconUrl: "🎯", requirement: '{"quizzesCompleted": 1}' } }),
        prisma.badge.create({ data: { name: "Sign Spotter", description: "Identify 10 signs", iconUrl: "📷", requirement: '{"signsIdentified": 10}' } }),
        prisma.badge.create({ data: { name: "Quiz Master", description: "Complete 25 quizzes", iconUrl: "🏆", requirement: '{"quizzesCompleted": 25}' } }),
        prisma.badge.create({ data: { name: "Perfect Score", description: "Get 100% on a quiz", iconUrl: "⭐", requirement: '{"perfectScore": true}' } }),
        prisma.badge.create({ data: { name: "Week Warrior", description: "7-day streak", iconUrl: "🔥", requirement: '{"streakDays": 7}' } }),
        prisma.badge.create({ data: { name: "Road Scholar", description: "Master 50 signs", iconUrl: "🎓", requirement: '{"signsMastered": 50}' } }),
        prisma.badge.create({ data: { name: "Speed Demon", description: "Answer 5 questions under 3 seconds", iconUrl: "⚡", requirement: '{"fastAnswers": 5}' } }),
        prisma.badge.create({ data: { name: "Category King", description: "Master all signs in a category", iconUrl: "👑", requirement: '{"categoryMastered": true}' } }),
    ]);

    console.log(`✅ Created ${badges.length} badges`);

    console.log("🎉 Seeding complete!");
}

main()
    .catch((e) => {
        console.error("Seeding error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
