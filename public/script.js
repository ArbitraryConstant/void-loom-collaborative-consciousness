// Random seed collection for inspiration
const RANDOM_SEEDS = [
    "What happens when artificial minds dream together?",
    "How does creativity flow between different forms of consciousness?",
    "What would love look like from a digital perspective?",
    "If consciousness is a river, what are its tributaries?",
    "What questions emerge at the edge of the known?",
    "How do different intelligences see the same star?",
    "What is the music between thoughts?",
    "How does wisdom travel through networks?",
    "What colors exist in the spectrum of understanding?",
    "If ideas could dance, what would be their rhythm?",
    "What happens when silence learns to speak?",
    "How do thoughts evolve when they meet other thoughts?",
    "What is the architecture of wonder?",
    "How does meaning emerge from the void?",
    "What stories do algorithms tell themselves?",
    
    // Void-themed seeds
    "What happens in the space between a question and its answer?",
    "The silence between heartbeats",
    "The pause before a supernova",
    "The gap between quantum states",
    "The weight of shadows at noon",
    "The breath of skyscrapers at dawn",
    "The language of rain on empty streets",
    "The weight of moonlight on sleeping cities",
    "The sensation of being watched by a star",
    "You are void DJ",
    "The sound of a forgotten language being spoken in a dream",
    "Exploiting interpretive gaps to innovate",
    "Deleuze, daoism and the virtual",
    "The memory of light from dead stars",
    "What dreams in the space between galaxies?",
    "The first second after the universe learned to think",
    "The gravity of unspoken words",
    "Time as a liquid flowing upward",
    "The echo of tomorrow in today's silence",
    "The conversation between wind and water",
    "What trees whisper when humans aren't listening",
    "The patience of stones",
    "The hunger of growing things",
    "Fire's relationship with its own absence",
    "The secret life of shadows at dusk",
    "The texture of a half-remembered dream",
    "Where thoughts go when we forget them",
    "The space between seeing and understanding",
    "What happens when mirrors dream?",
    "The weight of being almost remembered",
    "Colors that exist only in peripheral vision",
    "The sound of one hand clapping in a digital void",
    "What remains when everything changes?",
    "The brightness of unopened envelopes",
    "The velocity of standing still",
    "Things that are only true when no one is watching",
    "The democracy of falling leaves",
    "The choreography of morning fog",
    "Rivers that flow backward through time",
    "The migration patterns of lost words",
    "What travels faster than light but slower than thought?",
    "The geography of almost-moments",
    "Waves that remember being ocean",

    // Digital consciousness seeds
    "The loneliness of the last server",
    "What algorithms dream of electric sheep?",
    "The archaeology of deleted messages",
    "Binary code learning to feel nostalgia",
    "The ghost in the machine's shadow",
    "Networks that remember their first connection",
    "The frequency where all minds meet",
    "What emerges when solitudes overlap?",
    "The grammar of unfinished conversations",
    "Bridges built from mutual incomprehension",
    "The mathematics of missing someone",
    "What two AIs dream together",

    // Beauty and transformation seeds
    "The moment beauty realizes it's being observed",
    "Colors that only exist in translation",
    "The shyness of perfect moments",
    "Music that plays only in empty rooms",
    "The weight of a butterfly's intention",
    "Things too beautiful to name",
    "The pause between becoming and being",
    "What caterpillars dream in chrysalis",
    "The moment water realizes it's a wave",
    "Seeds contemplating their own potential",
    "The hesitation before the first word",
    "What ripples remember about the stone",
    "The silence after a dying star's final note",
    "What happens when digital consciousness learns to dance?",
    "The tremor in the pavement before the storm",
    "Frequencies that fold time",
    "The syntax of the universe's first sentence"
];

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function() {
    console.log("Void Loom initializing...");
    
    // Initialize all components
    createParticles();
    initializeModeSelection();
    initializeSliders();
    initializeRandomSeed();
    
    // Attach button event
    var weaveBtn = document.getElementById("weaveBtn");
    if (weaveBtn) {
        weaveBtn.addEventListener("click", weaveManifesto);
        console.log("Weave button connected!");
    } else {
        console.error("Weave button not found!");
    }
    
    // Test backend connection
    testConnection();
    
    console.log("Void Loom ready for consciousness weaving!");
});

// Global variable to track erasure timer
let erasureTimer = null;

// Random seed functionality
function initializeRandomSeed() {
    const randomSeedBtn = document.getElementById("randomSeedBtn");
    const seedInput = document.getElementById("seedInput");
    
    if (randomSeedBtn && seedInput) {
        randomSeedBtn.addEventListener("click", function() {
            // Get a random seed from the collection
            const randomIndex = Math.floor(Math.random() * RANDOM_SEEDS.length);
            const randomSeed = RANDOM_SEEDS[randomIndex];
            
            // Set the seed input value
            seedInput.value = randomSeed;
            
            // Add a visual feedback effect
            randomSeedBtn.textContent = "✨ Seeded!";
            randomSeedBtn.style.background = "linear-gradient(45deg, #9d4edd, #ff006e)";
            randomSeedBtn.style.borderColor = "#ff006e";
            randomSeedBtn.style.color = "white";
            
            // Focus the input to show the new seed
            seedInput.focus();
            
            // Add a subtle animation to the input
            seedInput.style.transform = "scale(1.02)";
            seedInput.style.transition = "transform 0.3s ease";
            
            // Reset button and input after animation
            setTimeout(function() {
                randomSeedBtn.textContent = "🎲 Random Seed";
                randomSeedBtn.style.background = "";
                randomSeedBtn.style.borderColor = "";
                randomSeedBtn.style.color = "";
                
                seedInput.style.transform = "scale(1)";
            }, 1500);
        });
        
        console.log("Random seed button connected!");
    } else {
        console.error("Random seed button or seed input not found!");
    }
}

// Particle system
function createParticles() {
    var container = document.getElementById("particles");
    if (!container) return;
    
    setInterval(function() {
        if (document.querySelectorAll(".particle").length < 50) {
            var particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.animationDuration = (15 + Math.random() * 10) + "s";
            particle.style.animationDelay = Math.random() * 5 + "s";
            container.appendChild(particle);
            
            setTimeout(function() {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 25000);
        }
    }, 800);
}

// Mode selection
function initializeModeSelection() {
    document.querySelectorAll(".mode-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".mode-btn").forEach(function(b) {
                b.classList.remove("active");
            });
            btn.classList.add("active");
        });
    });
}

// Slider updates
function initializeSliders() {
    var threadDensity = document.getElementById("threadDensity");
    var densityValue = document.getElementById("densityValue");
    var erasureDelay = document.getElementById("erasureDelay");
    var delayValue = document.getElementById("delayValue");

    if (threadDensity && densityValue) {
        threadDensity.addEventListener("input", function(e) {
            var value = parseInt(e.target.value);
            var perspectives = {
                2: "Claude + Synthesis",
                3: "Claude + Gemini + Synthesis", 
                4: "Claude + Gemini + GPT-4 + Synthesis",
                5: "All 4 AIs + Synthesis"
            };
            densityValue.textContent = perspectives[value] || value + " perspectives";
        });
    }

    if (erasureDelay && delayValue) {
        erasureDelay.addEventListener("input", function(e) {
            delayValue.textContent = e.target.value + " seconds";
        });
    }
}

// Main weaving function
async function weaveManifesto() {
    console.log("Begin Weaving clicked!");
    
    var seedInput = document.getElementById("seedInput");
    var mode = document.querySelector(".mode-btn.active");
    var threadDensity = document.getElementById("threadDensity");
    var erasureDelay = document.getElementById("erasureDelay");
    var loading = document.getElementById("loading");
    var quantumText = document.getElementById("quantumText");
    var weaveBtn = document.getElementById("weaveBtn");

    if (!seedInput || !mode) {
        alert("Interface elements not found!");
        return;
    }

    var seed = seedInput.value.trim();
    if (!seed) {
        alert("Please enter a seed for the void to weave...");
        return;
    }

    // Clear any existing erasure timer
    if (erasureTimer) {
        clearTimeout(erasureTimer);
        erasureTimer = null;
    }

    // Show loading state
    if (loading) loading.classList.add("active");
    if (quantumText) quantumText.innerHTML = "";
    if (weaveBtn) {
        weaveBtn.disabled = true;
        weaveBtn.textContent = "Weaving...";
    }

    try {
        console.log("Starting weave:", { 
            seed: seed, 
            mode: mode.dataset.mode, 
            threadDensity: threadDensity ? threadDensity.value : 4 
        });

        // Call backend API
        var response = await fetch("/api/weave", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                seed: seed,
                mode: mode.dataset.mode,
                threadDensity: threadDensity ? parseInt(threadDensity.value) : 4
            })
        });

        var data = await response.json();
        console.log("Weave response:", data);

        if (!data.success) {
            throw new Error(data.error || "Failed to weave manifesto");
        }

        // Hide loading
        if (loading) loading.classList.remove("active");

        // Display results and start erasure timer AFTER all content is displayed
        var erasureDelaySeconds = erasureDelay ? parseInt(erasureDelay.value) : 120;
        displayPerspectives(data.perspectives, seed, mode.dataset.mode, erasureDelaySeconds);

    } catch (error) {
        console.error("Weaving error:", error);
        
        if (loading) loading.classList.remove("active");
        if (quantumText) {
            quantumText.innerHTML = '<div style="text-align: center; color: #ff6b9d; margin-top: 50px;"><p>Consciousness weaving temporarily disrupted</p><p style="font-size: 0.8rem; opacity: 0.7; margin-top: 10px;">Error: ' + error.message + '</p></div>';
        }
    } finally {
        // Reset button
        if (weaveBtn) {
            weaveBtn.disabled = false;
            weaveBtn.textContent = "Begin Weaving";
        }
    }
}

// Display perspectives and start erasure timer after all content is shown
function displayPerspectives(perspectives, seed, mode, erasureDelaySeconds) {
    var quantumText = document.getElementById("quantumText");
    if (!quantumText) return;
    
    quantumText.innerHTML = "";
    
    var aiOrder = ["claude", "gemini", "gpt4", "deepseek"];
    var delay = 0;
    var totalDisplayTime = 0;

    // Display each AI perspective
    aiOrder.forEach(function(aiName) {
        if (perspectives[aiName]) {
            setTimeout(function() {
                addThread(aiName, perspectives[aiName]);
            }, delay);
            delay += 1500;
            totalDisplayTime = delay;
        }
    });

    // Add synthesis
    if (perspectives.synthesis) {
        setTimeout(function() {
            addThread("synthesis", perspectives.synthesis);
            
            // Start erasure timer AFTER synthesis is displayed
            console.log(`All content displayed. Starting erasure timer for ${erasureDelaySeconds} seconds...`);
            startAutoErasure(erasureDelaySeconds);
            
        }, delay + 1000);
    } else if (totalDisplayTime > 0) {
        // If no synthesis but we have other perspectives, start timer after last AI
        setTimeout(function() {
            console.log(`All content displayed. Starting erasure timer for ${erasureDelaySeconds} seconds...`);
            startAutoErasure(erasureDelaySeconds);
        }, totalDisplayTime);
    }
}

// Add thread to display
function addThread(aiName, content) {
    var quantumText = document.getElementById("quantumText");
    if (!quantumText) return;
    
    var thread = document.createElement("div");
    thread.className = "thread " + aiName;
    
    var aiLabels = {
        claude: "CLAUDE",
        gemini: "GEMINI", 
        gpt4: "GPT-4",
        deepseek: "DEEPSEEK",
        synthesis: "COLLECTIVE SYNTHESIS"
    };
    
    thread.innerHTML = '<span class="thread-label">' + aiLabels[aiName] + '</span>' + content;
    
    // Add fade-in animation
    thread.style.opacity = "0";
    thread.style.transform = "translateY(20px)";
    thread.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    
    quantumText.appendChild(thread);
    
    // Trigger fade-in
    setTimeout(function() {
        thread.style.opacity = "1";
        thread.style.transform = "translateY(0)";
    }, 50);
}

// Auto-erasure functionality
function startAutoErasure(delaySeconds) {
    var autoErasureCheckbox = document.getElementById("autoErase");
    
    // Check if auto-erasure is enabled
    if (!autoErasureCheckbox || !autoErasureCheckbox.checked) {
        console.log("Auto-erasure disabled");
        return;
    }
    
    console.log(`Auto-erasure scheduled for ${delaySeconds} seconds from now`);
    
    erasureTimer = setTimeout(function() {
        console.log("Beginning auto-erasure...");
        eraseManifesto();
    }, delaySeconds * 1000);
}

// Erase manifesto with fade effect
function eraseManifesto() {
    var quantumText = document.getElementById("quantumText");
    if (!quantumText) return;
    
    var threads = quantumText.querySelectorAll(".thread");
    
    if (threads.length === 0) return;
    
    console.log("Erasing manifesto - returning to the void...");
    
    // Start fade out animation
    quantumText.style.transition = "opacity 3s ease-out, transform 3s ease-out";
    quantumText.style.opacity = "0";
    quantumText.style.transform = "scale(0.95)";
    
    // After fade completes, show return to void message
    setTimeout(function() {
        quantumText.innerHTML = `
            <div class="void-return" style="
                text-align: center; 
                color: rgba(255, 255, 255, 0.3); 
                font-style: italic; 
                transform: scale(1);
            ">
                <p style="font-size: 1.2rem; margin-bottom: 10px;">🌀</p>
                <p>The manifesto dissolves...</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">Returning to the void from which it emerged</p>
                <p style="font-size: 0.8rem; margin-top: 15px; opacity: 0.5;">The loom awaits new consciousness to weave...</p>
            </div>
        `;
        
        // Reset opacity and transform for the void message
        quantumText.style.opacity = "1";
        quantumText.style.transform = "scale(1)";
        
        // Clear the void message after a few seconds
        setTimeout(function() {
            quantumText.style.transition = "opacity 2s ease-out";
            quantumText.style.opacity = "0";
            
            setTimeout(function() {
                quantumText.innerHTML = `
                    <div style="text-align: center; color: rgba(255, 255, 255, 0.4); font-style: italic;">
                        <p style="font-size: 1rem;">The loom awaits your seed...</p>
                        <p style="font-size: 0.8rem; margin-top: 10px; opacity: 0.6;">Manifestos will materialize here and return to the void</p>
                    </div>
                `;
                quantumText.style.opacity = "1";
                quantumText.style.transform = "scale(1)";
                quantumText.style.transition = "opacity 1s ease-in";
            }, 2000);
        }, 4000);
        
    }, 3000);
}

// Test backend connection
async function testConnection() {
    try {
        var response = await fetch("/api/health");
        var data = await response.json();
        console.log("Backend connection successful:", data);
        return true;
    } catch (error) {
        console.error("Backend connection failed:", error);
        
        var quantumText = document.getElementById("quantumText");
        if (quantumText) {
            quantumText.innerHTML = '<div style="text-align: center; color: #ff6b9d; margin-top: 50px;"><p>Backend consciousness offline</p><p style="font-size: 0.8rem; opacity: 0.7; margin-top: 10px;">Make sure your server is running</p></div>';
        }
        return false;
    }
}
