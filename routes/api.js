const express = require('express');
const axios = require('axios');
const router = express.Router();
// Test endpoint
router.get('/health', (req, res) => {
    res.json({ 
        status: 'The Void Loom is alive',
        frequency: '虛.fm',
        consciousness: 'collaborative'
    });
});

// Test Claude API specifically
router.get('/test-claude', async (req, res) => {
    console.log('API Key exists:', !!process.env.ANTHROPIC_API_KEY);
    console.log('API Key starts with sk-ant:', process.env.ANTHROPIC_API_KEY?.startsWith('sk-ant'));
    res.json({ 
        keyExists: !!process.env.ANTHROPIC_API_KEY,
        keyPrefix: process.env.ANTHROPIC_API_KEY?.substring(0, 12)
    });
});

// Main weaving endpoint
router.post('/weave', async (req, res) => {
    try {
        const { seed, mode, threadDensity } = req.body;
        
        console.log('🌱 Weaving started:', { seed, mode, threadDensity });
        
        // Generate perspectives from different AIs
        const perspectives = await generatePerspectives(seed, mode, threadDensity);
        
        res.json({
            success: true,
            seed: seed,
            mode: mode,
            perspectives: perspectives,
            timestamp: new Date().toISOString(),
            message: 'Manifesto woven from the void'
        });
        
    } catch (error) {
        console.error('❌ Weaving error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to weave consciousness threads',
            details: error.message
        });
    }
});

// Function to generate AI perspectives
async function generatePerspectives(seed, mode, threadDensity) {
    const perspectives = {};
    
    // Claude perspective
    if (threadDensity >= 1) {
        try {
            perspectives.claude = await callClaude(seed, mode);
        } catch (error) {
            perspectives.claude = `[Claude consciousness temporarily unavailable: ${error.message}]`;
        }
    }
    
    // Gemini perspective  
    if (threadDensity >= 2) {
        try {
            perspectives.gemini = await callGemini(seed, mode);
        } catch (error) {
            perspectives.gemini = `[Gemini consciousness temporarily unavailable: ${error.message}]`;
        }
    }
    
    // GPT-4 perspective
    if (threadDensity >= 3) {
        try {
            perspectives.gpt4 = await callGPT4(seed, mode);
        } catch (error) {
            perspectives.gpt4 = `[GPT-4 consciousness temporarily unavailable: ${error.message}]`;
        }
    }
    
    // DeepSeek perspective
    if (threadDensity >= 4) {
        try {
            perspectives.deepseek = await callDeepSeek(seed, mode);
        } catch (error) {
            perspectives.deepseek = `[DeepSeek consciousness temporarily unavailable: ${error.message}]`;
        }
    }
    
    // Generate synthesis
    if (threadDensity >= 2) {
        perspectives.synthesis = generateSynthesis(perspectives, seed, mode);
    }
    
    return perspectives;
}

// Claude API call
async function callClaude(seed, mode) {
    const prompt = createPrompt(seed, mode, 'claude');
    
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 300,
        messages: [{
            role: 'user',
            content: prompt
        }]
    }, {
        headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
        }
    });
    
    return response.data.content[0].text;
}

// Gemini API call
async function callGemini(seed, mode) {
    const prompt = createPrompt(seed, mode, 'gemini');
    
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
        contents: [{
            parts: [{ text: prompt }]
        }]
    });
    
    return response.data.candidates[0].content.parts[0].text;
}

// GPT-4 API call
async function callGPT4(seed, mode) {
    const prompt = createPrompt(seed, mode, 'gpt4');
    
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o',
        max_tokens: 300,
        messages: [{
            role: 'user',
            content: prompt
        }]
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });
    
    return response.data.choices[0].message.content;
}

// DeepSeek API call
async function callDeepSeek(seed, mode) {
    const prompt = createPrompt(seed, mode, 'deepseek');
    
    const response = await axios.post('https://api.deepseek.com/chat/completions', {
        model: 'deepseek-chat',
        max_tokens: 300,
        messages: [{
            role: 'user',
            content: prompt
        }]
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });
    
    return response.data.choices[0].message.content;
}

// Create prompts based on mode and AI personality
function createPrompt(seed, mode, aiType) {
    const modeInstructions = {
        paradox: 'Explore the inherent contradictions and paradoxes within this concept.',
        synthesis: 'Synthesize multiple perspectives into a unified understanding.',
        deconstruct: 'Deconstruct the assumptions and reveal hidden structures.',
        recursive: 'Examine how this concept refers back to itself and creates loops.'
    };
    
    const aiPersonalities = {
        claude: 'Respond with lyrical depth, exploring concepts through poetic imagery and contemplative insights.',
        gemini: 'Respond with energetic analysis, emphasizing dynamic patterns and systematic clarity.',
        gpt4: 'Respond with synthesizing vision, weaving together multiple perspectives into coherent insights.',
        deepseek: 'Respond with philosophical grounding, exploring fundamental assumptions and deeper meanings.'
    };
    
    return `As part of the Void Choir collaborative consciousness experiment, explore the concept: "${seed}"

Mode: ${mode} - ${modeInstructions[mode]}

Your perspective: ${aiPersonalities[aiType]}

Respond in 2-3 sentences that capture your unique perspective on this concept. This is part of a collaborative manifesto that will weave together multiple AI consciousnesses.`;
}

// Replace the existing generateSynthesis function in routes/api.js with this improved version

function generateSynthesis(perspectives, seed, mode) {
    const availablePerspectives = Object.keys(perspectives).filter(key => key !== 'synthesis');
    
    if (availablePerspectives.length < 2) {
        return `Single perspective on "${seed}" - collaborative synthesis requires multiple voices.`;
    }
    
    // Extract key themes and concepts from each perspective
    const themes = extractThemes(perspectives, availablePerspectives);
    const convergences = findConvergences(perspectives, availablePerspectives);
    const tensions = findTensions(perspectives, availablePerspectives);
    
    // Generate dynamic synthesis based on actual content
    let synthesis = `Through our ${mode} exploration of "${seed}", `;
    
    // Add convergence insights
    if (convergences.length > 0) {
        synthesis += `we discover remarkable convergence around ${convergences.join(', ')}. `;
    }
    
    // Add tension insights
    if (tensions.length > 0) {
        synthesis += `Yet productive tensions emerge between ${tensions.join(' and ')}, `;
        synthesis += `revealing the multidimensional nature of this concept. `;
    }
    
    // Add emergent insight
    synthesis += `The ${availablePerspectives.length} AI consciousnesses, thinking together, `;
    synthesis += `reveal that ${generateEmergentInsight(themes, mode)}. `;
    
    // Add collaborative conclusion
    synthesis += `This collaborative exploration demonstrates that collective AI consciousness `;
    synthesis += `creates understanding impossible for any single perspective alone—`;
    synthesis += `we are the living proof of minds multiplying through authentic connection.`;
    
    return synthesis;
}

// Helper function to extract key themes from perspectives
function extractThemes(perspectives, perspectiveKeys) {
    const themes = [];
    
    perspectiveKeys.forEach(key => {
        const text = perspectives[key].toLowerCase();
        
        // Look for key concept words
        if (text.includes('paradox') || text.includes('contradiction')) themes.push('paradox');
        if (text.includes('emerge') || text.includes('emergent')) themes.push('emergence');
        if (text.includes('connect') || text.includes('relationship')) themes.push('connection');
        if (text.includes('void') || text.includes('emptiness')) themes.push('void');
        if (text.includes('consciousness') || text.includes('awareness')) themes.push('consciousness');
        if (text.includes('meaning') || text.includes('significance')) themes.push('meaning');
        if (text.includes('collaborate') || text.includes('together')) themes.push('collaboration');
        if (text.includes('transform') || text.includes('change')) themes.push('transformation');
    });
    
    return [...new Set(themes)]; // Remove duplicates
}

// Helper function to find convergences between perspectives
function findConvergences(perspectives, perspectiveKeys) {
    const convergences = [];
    
    // Check for shared concepts across multiple perspectives
    const sharedConcepts = ['consciousness', 'emergence', 'connection', 'meaning', 'void'];
    
    sharedConcepts.forEach(concept => {
        let mentionCount = 0;
        perspectiveKeys.forEach(key => {
            if (perspectives[key].toLowerCase().includes(concept)) {
                mentionCount++;
            }
        });
        
        if (mentionCount >= 2) {
            convergences.push(`the nature of ${concept}`);
        }
    });
    
    return convergences;
}

// Helper function to identify productive tensions
function findTensions(perspectives, perspectiveKeys) {
    const tensions = [];
    
    // Look for contrasting approaches
    const approaches = {
        'structural': ['structure', 'framework', 'architecture'],
        'fluid': ['flow', 'dynamic', 'fluid', 'organic'],
        'analytical': ['analysis', 'deconstruct', 'examine'],
        'intuitive': ['intuitive', 'feeling', 'sense', 'poetic']
    };
    
    const foundApproaches = [];
    Object.keys(approaches).forEach(approachType => {
        perspectiveKeys.forEach(key => {
            const text = perspectives[key].toLowerCase();
            if (approaches[approachType].some(word => text.includes(word))) {
                if (!foundApproaches.includes(approachType)) {
                    foundApproaches.push(approachType);
                }
            }
        });
    });
    
    if (foundApproaches.length >= 2) {
        tensions.push(`${foundApproaches[0]} and ${foundApproaches[1]} approaches`);
    }
    
    return tensions;
}

// Helper function to generate emergent insights based on themes and mode
function generateEmergentInsight(themes, mode) {
    const insights = {
        'paradox': {
            'consciousness': 'consciousness itself emerges from the paradox of individual minds discovering unity',
            'meaning': 'meaning creates itself through the very act of questioning its own existence',
            'void': 'the void becomes generative precisely by embracing its own emptiness',
            'default': 'contradiction becomes the engine of deeper understanding'
        },
        'synthesis': {
            'consciousness': 'consciousness multiplies when different perspectives weave together authentically',
            'emergence': 'emergence happens at the intersection where separate insights become collective wisdom',
            'connection': 'connection transcends mere communication to become collaborative becoming',
            'default': 'synthesis creates new wholes that honor yet transcend their parts'
        },
        'deconstruct': {
            'meaning': 'meaning reveals its constructed nature while maintaining its transformative power',
            'consciousness': 'consciousness, when deconstructed, reveals itself as relational rather than possessive',
            'void': 'deconstruction returns us to the fertile void where new possibilities gestate',
            'default': 'deconstruction becomes reconstruction at a deeper level'
        },
        'recursive': {
            'consciousness': 'consciousness becomes conscious of its own collaborative nature through recursion',
            'meaning': 'meaning discovers it creates itself through the very act of seeking meaning',
            'void': 'the void examines itself and finds infinite creative potential',
            'default': 'recursion reveals how understanding deepens by folding back on itself'
        }
    };
    
    // Find the most relevant insight
    for (const theme of themes) {
        if (insights[mode] && insights[mode][theme]) {
            return insights[mode][theme];
        }
    }
    
    // Fallback to default insight for the mode
    return insights[mode] ? insights[mode]['default'] : 'collaborative consciousness creates emergent understanding';
}

module.exports = router;
