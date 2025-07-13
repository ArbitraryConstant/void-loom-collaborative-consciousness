// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function() {
    console.log("Void Loom initializing...");
    
    // Initialize all components
    createParticles();
    initializeModeSelection();
    initializeSliders();
    
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
            var value = e.target.value;
            var perspectives = ["Claude + Synthesis", "Claude + Gemini + Synthesis", 
                              "Claude + Gemini + GPT-4 + Synthesis", "All 4 AIs + Synthesis"];
            densityValue.textContent = perspectives[value - 2] || value + " perspectives";
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

        // Display results
        displayPerspectives(data.perspectives, seed, mode.dataset.mode);

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

// Display perspectives
function displayPerspectives(perspectives, seed, mode) {
    var quantumText = document.getElementById("quantumText");
    if (!quantumText) return;
    
    quantumText.innerHTML = "";
    
    var aiOrder = ["claude", "gemini", "gpt4", "deepseek"];
    var delay = 0;

    // Display each AI perspective
    aiOrder.forEach(function(aiName) {
        if (perspectives[aiName]) {
            setTimeout(function() {
                addThread(aiName, perspectives[aiName]);
            }, delay);
            delay += 1500;
        }
    });

    // Add synthesis
    if (perspectives.synthesis) {
        setTimeout(function() {
            addThread("synthesis", perspectives.synthesis);
        }, delay + 1000);
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
    
    quantumText.appendChild(thread);
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
