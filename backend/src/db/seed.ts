import prisma from './index';

// Traffic sign data with YOLO class mappings and local SVG paths
const signs = [
    // Regulatory Signs - Speed Limits
    { classId: 0, name: 'Speed Limit 20', category: 'regulatory', description: 'Maximum speed of 20 km/h allowed in this zone.', rules: 'Do not exceed 20 km/h. Common in school zones and residential areas.', imageUrl: '/signs/speed-20.svg' },
    { classId: 1, name: 'Speed Limit 30', category: 'regulatory', description: 'Maximum speed of 30 km/h allowed in this zone.', rules: 'Reduce speed to 30 km/h. Often found in urban residential areas.', imageUrl: '/signs/speed-30.svg' },
    { classId: 2, name: 'Speed Limit 50', category: 'regulatory', description: 'Maximum speed of 50 km/h allowed.', rules: 'Standard urban speed limit in many countries.', imageUrl: '/signs/speed-50.svg' },
    { classId: 3, name: 'Speed Limit 60', category: 'regulatory', description: 'Maximum speed of 60 km/h allowed.', rules: 'Common on urban highways and main roads.', imageUrl: '/signs/speed-60.svg' },
    { classId: 4, name: 'Speed Limit 70', category: 'regulatory', description: 'Maximum speed of 70 km/h allowed.', rules: 'Found on secondary roads outside urban areas.', imageUrl: '/signs/speed-70.svg' },
    { classId: 5, name: 'Speed Limit 80', category: 'regulatory', description: 'Maximum speed of 80 km/h allowed.', rules: 'Common on rural roads and expressways.', imageUrl: '/signs/speed-80.svg' },

    // Regulatory Signs - Stop, No Entry, etc.
    { classId: 14, name: 'Stop', category: 'regulatory', description: 'Come to a complete stop at the marked line or intersection.', rules: 'Full stop required. Check for traffic from all directions before proceeding.', imageUrl: '/signs/stop.svg' },
    { classId: 15, name: 'No Vehicles', category: 'regulatory', description: 'No vehicles allowed beyond this point.', rules: 'Entry prohibited for all motor vehicles.', imageUrl: '/signs/no-vehicles.svg' },
    { classId: 17, name: 'No Entry', category: 'regulatory', description: 'Entry prohibited into this road or lane.', rules: 'Do not enter. Usually indicates one-way street from wrong direction.', imageUrl: '/signs/no-entry.svg' },

    // Regulatory Signs - Mandatory Direction
    { classId: 33, name: 'Turn Right Ahead', category: 'regulatory', description: 'Mandatory right turn ahead.', rules: 'You must turn right at the next intersection.', imageUrl: '/signs/turn-right.svg' },
    { classId: 34, name: 'Turn Left Ahead', category: 'regulatory', description: 'Mandatory left turn ahead.', rules: 'You must turn left at the next intersection.', imageUrl: '/signs/turn-left.svg' },
    { classId: 35, name: 'Ahead Only', category: 'regulatory', description: 'Proceed straight ahead only.', rules: 'No turning allowed. Continue straight only.', imageUrl: '/signs/ahead-only.svg' },
    { classId: 36, name: 'Go Straight or Right', category: 'regulatory', description: 'Proceed straight or turn right.', rules: 'Left turn prohibited at this intersection.', imageUrl: '/signs/straight-right.svg' },
    { classId: 37, name: 'Go Straight or Left', category: 'regulatory', description: 'Proceed straight or turn left.', rules: 'Right turn prohibited at this intersection.', imageUrl: '/signs/straight-left.svg' },
    { classId: 38, name: 'Keep Right', category: 'regulatory', description: 'Keep to the right of the obstacle or divider.', rules: 'Stay on the right side when passing this point.', imageUrl: '/signs/keep-right.svg' },
    { classId: 39, name: 'Keep Left', category: 'regulatory', description: 'Keep to the left of the obstacle or divider.', rules: 'Stay on the left side when passing this point.', imageUrl: '/signs/keep-left.svg' },
    { classId: 40, name: 'Roundabout Mandatory', category: 'regulatory', description: 'Roundabout ahead - follow the direction indicated.', rules: 'Enter roundabout and proceed counter-clockwise (in right-hand traffic countries).', imageUrl: '/signs/roundabout.svg' },

    // Warning Signs
    { classId: 18, name: 'General Caution', category: 'warning', description: 'General warning - be alert for hazards.', rules: 'Slow down and be prepared for unexpected conditions ahead.', imageUrl: '/signs/caution.svg' },
    { classId: 19, name: 'Dangerous Curve Left', category: 'warning', description: 'Sharp curve to the left ahead.', rules: 'Reduce speed before entering the curve. Stay in your lane.', imageUrl: '/signs/curve-left.svg' },
    { classId: 20, name: 'Dangerous Curve Right', category: 'warning', description: 'Sharp curve to the right ahead.', rules: 'Reduce speed before entering the curve. Stay in your lane.', imageUrl: '/signs/curve-right.svg' },
    { classId: 21, name: 'Double Curve', category: 'warning', description: 'Winding road with multiple curves ahead.', rules: 'Reduce speed significantly. Multiple curves require extra caution.', imageUrl: '/signs/double-curve.svg' },
    { classId: 22, name: 'Bumpy Road', category: 'warning', description: 'Rough or uneven road surface ahead.', rules: 'Reduce speed to prevent vehicle damage and maintain control.', imageUrl: '/signs/bumpy-road.svg' },
    { classId: 23, name: 'Slippery Road', category: 'warning', description: 'Road may be slippery when wet.', rules: 'Reduce speed, avoid sudden braking or acceleration.', imageUrl: '/signs/slippery.svg' },
    { classId: 24, name: 'Road Narrows Right', category: 'warning', description: 'Road width decreases on the right side.', rules: 'Be prepared to move left as road narrows.', imageUrl: '/signs/narrows-right.svg' },
    { classId: 25, name: 'Road Work', category: 'construction', description: 'Construction or maintenance work ahead.', rules: 'Reduce speed, watch for workers and equipment. Follow detour signs.', imageUrl: '/signs/road-work.svg' },
    { classId: 26, name: 'Traffic Signals', category: 'warning', description: 'Traffic signals ahead.', rules: 'Prepare to stop. Traffic light ahead may be changing.', imageUrl: '/signs/traffic-signals.svg' },
    { classId: 27, name: 'Pedestrians', category: 'warning', description: 'Pedestrian crossing or area ahead.', rules: 'Watch for pedestrians. Yield to those in crosswalk.', imageUrl: '/signs/pedestrians.svg' },
    { classId: 28, name: 'Children Crossing', category: 'warning', description: 'School zone or children may be crossing.', rules: 'Extreme caution. Reduce speed significantly in school zones.', imageUrl: '/signs/children.svg' },
    { classId: 29, name: 'Bicycles Crossing', category: 'warning', description: 'Bicycle crossing or shared road ahead.', rules: 'Watch for cyclists. Give them adequate space when passing.', imageUrl: '/signs/bicycles.svg' },
    { classId: 30, name: 'Beware of Ice/Snow', category: 'warning', description: 'Icy or snowy conditions possible.', rules: 'Drive with extreme caution. Road may be very slippery.', imageUrl: '/signs/ice-snow.svg' },
    { classId: 31, name: 'Wild Animals Crossing', category: 'warning', description: 'Wild animals may cross the road.', rules: 'Be alert especially at dawn and dusk. Watch for deer and other wildlife.', imageUrl: '/signs/wild-animals.svg' },

    // Guide Signs
    { classId: 41, name: 'End of No Passing', category: 'guide', description: 'End of no overtaking zone.', rules: 'Overtaking is now permitted when safe to do so.', imageUrl: '/signs/end-no-passing.svg' },
    { classId: 42, name: 'End of No Passing for Trucks', category: 'guide', description: 'Trucks may now overtake.', rules: 'Heavy vehicles can now pass when safe.', imageUrl: '/signs/end-no-passing-trucks.svg' },

    // Priority Signs
    { classId: 12, name: 'Priority Road', category: 'regulatory', description: 'You are on a priority road.', rules: 'You have right of way over vehicles on intersecting roads.', imageUrl: '/signs/priority-road.svg' },
    { classId: 13, name: 'Yield', category: 'regulatory', description: 'Give way to traffic on the main road.', rules: 'Slow down and be prepared to stop. Yield to traffic with right of way.', imageUrl: '/signs/yield.svg' },
];

// Generate quiz questions for each sign
function generateQuestions(sign: typeof signs[0]) {
    const questions = [];

    // Question type 1: What does this sign mean?
    questions.push({
        signId: '', // Will be set after sign is created
        questionText: 'What does this traffic sign indicate?',
        options: JSON.stringify([
            sign.description,
            `${sign.category === 'warning' ? 'Speed limit' : 'Warning'} sign for road conditions`,
            'No parking allowed in this area',
            'End of restricted zone'
        ]),
        correctIndex: 0,
        difficulty: 1,
    });

    // Question type 2: What should you do?
    questions.push({
        signId: '',
        questionText: 'What action should you take when you see this sign?',
        options: JSON.stringify([
            sign.rules.split('.')[0] + '.',
            'Continue at the same speed',
            'Honk your horn to warn others',
            'Flash your headlights'
        ]),
        correctIndex: 0,
        difficulty: 2,
    });

    // Question type 3: Extreme/Scenario (Hard)
    questions.push({
        signId: '',
        questionText: `EXTREME CHALLENGE: In which specific scenario is this '${sign.name}' sign most critical?`,
        options: JSON.stringify([
            sign.category === 'regulatory' ? 'When law enforcement is present' : 'During poor visibility conditions',
            'Only during the daytime',
            sign.rules, // Correct answer (the full rule provides the critical context)
            'It is just a suggestion, not critical'
        ]),
        correctIndex: 2, // The full rule is the correct answer here
        difficulty: 3,
    });

    return questions;
}

async function main() {
    console.log('🌱 Starting database seed...');

    // Clear existing data
    await prisma.recognition.deleteMany();
    await prisma.imageHash.deleteMany();
    await prisma.quizSession.deleteMany();
    await prisma.quizQuestion.deleteMany();
    await prisma.userProgress.deleteMany();
    await prisma.sign.deleteMany();

    console.log('📝 Creating signs with local SVG images...');

    for (const signData of signs) {
        const sign = await prisma.sign.create({
            data: signData,
        });

        // Create quiz questions for this sign
        const questions = generateQuestions(signData);
        for (const q of questions) {
            await prisma.quizQuestion.create({
                data: {
                    ...q,
                    signId: sign.id,
                },
            });
        }
    }

    const signCount = await prisma.sign.count();
    const questionCount = await prisma.quizQuestion.count();

    console.log(`✅ Created ${signCount} signs with local SVG images`);
    console.log(`✅ Created ${questionCount} quiz questions`);
    console.log('🎉 Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
