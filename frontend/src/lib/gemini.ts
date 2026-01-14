/**
 * Gemini Flash-Lite Integration for Sign Context
 * Uses gemini-2.0-flash-lite (cost efficient, low latency)
 * Caches results in localStorage to minimize API calls
 */

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
// Official API format: https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';

export interface SignContext {
    description: string;
    driverAction: string;
    safetyTip: string;
}

// Cache key prefix
const CACHE_PREFIX = 'signwise_context_';

/**
 * Get cached context from localStorage
 */
function getCachedContext(signName: string): SignContext | null {
    if (typeof window === 'undefined') return null;

    const cached = localStorage.getItem(CACHE_PREFIX + signName.toLowerCase().replace(/\s+/g, '_'));
    if (cached) {
        try {
            return JSON.parse(cached);
        } catch {
            return null;
        }
    }
    return null;
}

/**
 * Cache context to localStorage
 */
function cacheContext(signName: string, context: SignContext): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem(
        CACHE_PREFIX + signName.toLowerCase().replace(/\s+/g, '_'),
        JSON.stringify(context)
    );
}

/**
 * Generate sign context using Gemini Flash-Lite
 */
export async function getSignContext(signName: string, category: string): Promise<SignContext> {
    // Check cache first
    const cached = getCachedContext(signName);
    if (cached) {
        console.log('📦 Using cached context for:', signName);
        return cached;
    }

    // If no API key, return fallback
    if (!GEMINI_API_KEY) {
        console.warn('⚠️ No Gemini API key configured, using fallback');
        return getFallbackContext(signName, category);
    }

    try {
        console.log('🤖 Fetching Gemini context for:', signName);

        const prompt = `You are a traffic sign education assistant. For the traffic sign "${signName}" (category: ${category}), provide:
1. A brief one-sentence description of what this sign means
2. A clear driver action instruction (what the driver should do)
3. A quick safety tip related to this sign

Respond in JSON format exactly like this:
{
    "description": "...",
    "driverAction": "...",
    "safetyTip": "..."
}

Keep each response under 50 words. Be concise and practical.`;

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 200,
                }
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API error response:', errorText);
            throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Gemini API response:', data);

        const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Parse JSON from response
        const jsonMatch = textContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const context = JSON.parse(jsonMatch[0]) as SignContext;
            console.log('✅ Gemini context parsed:', context);
            cacheContext(signName, context);
            return context;
        }

        throw new Error('Could not parse Gemini response: ' + textContent);

    } catch (error) {
        console.error('❌ Gemini API error:', error);
        return getFallbackContext(signName, category);
    }
}

/**
 * Smart fallback context with sign-specific content
 */
function getFallbackContext(signName: string, category: string): SignContext {
    const nameLower = signName.toLowerCase();

    // Sign-specific driver actions based on common patterns
    const signActions: Record<string, string> = {
        'speed limit': `Reduce your speed to the posted limit and maintain it until you see a different sign.`,
        'stop': 'Come to a complete stop at the marked line, check for traffic, then proceed when safe.',
        'yield': 'Slow down and be prepared to stop. Give right-of-way to other vehicles and pedestrians.',
        'turn left': 'Prepare to turn left at the upcoming intersection. Use your turn signal.',
        'turn right': 'Prepare to turn right at the upcoming intersection. Use your turn signal.',
        'no entry': 'Do not enter this road. Find an alternative route immediately.',
        'one way': 'Traffic flows in one direction only. Do not drive against traffic.',
        'pedestrian': 'Watch for pedestrians crossing. Be prepared to stop and yield.',
        'children': 'Reduce speed. Watch for children who may enter the roadway unexpectedly.',
        'school': 'Slow down significantly. Watch for children and school buses.',
        'crossing': 'Be alert for crossing traffic, pedestrians, or animals ahead.',
        'road work': 'Reduce speed. Watch for workers, equipment, and changed road conditions.',
        'construction': 'Slow down and follow any temporary signs or signals.',
        'merge': 'Prepare to merge with traffic. Adjust your speed and find a safe gap.',
        'lane ends': 'Your lane is ending. Merge safely into the adjacent lane.',
        'curve': 'Slow down before entering the curve. Do not brake while in the curve.',
        'slippery': 'Reduce speed. Avoid sudden steering, braking, or acceleration.',
        'parking': 'Parking is available or restricted as indicated.',
    };

    // Find matching action
    let driverAction = 'Follow this sign\'s instructions for safe driving.';
    for (const [key, action] of Object.entries(signActions)) {
        if (nameLower.includes(key)) {
            driverAction = action;
            break;
        }
    }

    // Category-based safety tips
    const safetyTips: Record<string, string> = {
        regulatory: 'Regulatory signs are enforceable by law. Failure to comply may result in traffic violations.',
        warning: 'Warning signs alert you to potential hazards. Stay vigilant and adjust your driving accordingly.',
        guide: 'Guide signs help you navigate. Plan your route and change lanes safely when needed.',
        construction: 'Work zone safety is critical. Fines are often doubled in construction areas.',
    };

    return {
        description: `This ${category} sign indicates "${signName}". Pay attention and respond appropriately.`,
        driverAction: driverAction,
        safetyTip: safetyTips[category] || 'Always stay alert and follow traffic signs for everyone\'s safety.',
    };
}
