document.addEventListener('DOMContentLoaded', () => {
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const mobileCommands = document.getElementById('mobile-commands');
    const mobilePanel = document.getElementById('mobile-command-panel');
    const closePanel = document.getElementById('close-panel');
    const commandButtons = document.querySelectorAll('.cmd-btn');
    const bootSequence = document.getElementById('boot-sequence');
    const bootMessagesElement = document.getElementById('boot-messages');
    const bootProgressBar = document.getElementById('boot-progress-bar');
    const bootStatus = document.getElementById('boot-status');
    const systemTime = document.getElementById('system-time');
    const targetMode = document.getElementById('target-mode');
    const diagnosticsPanel = document.getElementById('diagnostics-panel');
    const closeDiagnostics = document.getElementById('close-diagnostics');

    // Command history
    const commandHistory = [];
    let historyIndex = -1;

    // Available commands for autocomplete
    const availableCommands = [
        'help', 'whoami', 'skills', 'projects', 'experience',
        'contact', 'highlights', 'clear', 'sudo hireme',
        'ls', 'cat mission.txt', 'date', 'echo', 'matrix', 'hack',
        'target', 'diagnostics', 'boot', 'selfdestruct', 'mail'
    ];

    // Command data
    const commandsData = {
        help: `Available commands:
  whoami       - Who is Ankit Singh?
  skills       - Technical skills and expertise
  projects     - View completed projects
  experience   - Work history and achievements
  contact      - Contact information
  highlights   - Career highlights
  sudo hireme  - Why you should hire me
  clear        - Clear terminal
  ls           - List available files
  cat [file]   - View file contents
  date         - Display current date and time
  matrix       - Activate the matrix
  hack         - Simulate system hack
  target       - Enter target acquisition mode
  diagnostics  - Run system diagnostics
  boot         - Reboot system
  selfdestruct - Initiate self-destruct sequence
  mail         - Send me an email`,

        whoami: `<span class="highlight">SYSTEM ANALYSIS COMPLETE:</span>

<span class="accent">Ankit Singh - Cracked Backend Engineer | System Architect | Performance Optimizer</span>

Not your average coder. I'm the engineer they call when systems crash, latency spikes, 
and deadlines are impossible. I don't just write code—I <span class="highlight">crack systems wide open</span> 
and rebuild them to perform beyond their limits.

While others struggle with basic APIs, I'm slashing response times by <span class="highlight">90%</span>, 
turning 60-second nightmares into 6-second dreams. I've engineered bulletproof SMS routing systems, 
built real-time audit dashboards that expose hidden patterns, and constructed AI-powered code review 
systems that catch what humans miss.

In the chaos of startup environments, I'm the engineer who thrives—building, scaling, and 
shipping while others are still setting up their development environment.

<span class="accent">My code doesn't just run. It flies.</span>`,

        skills: `<span class="highlight">CORE SYSTEM CAPABILITIES:</span>

<span class="accent">Languages:</span>
  • TypeScript/JavaScript (Advanced)
  • C++ (Competitive Programming)
  • Python (AI/ML Integration)

<span class="accent">Backend Mastery:</span>
  • Node.js & Express.js (Performance-optimized)
  • MongoDB (Complex Aggregations)
  • REST API Architecture
  • Redis (Caching, Rate Limiting)

<span class="accent">Frontend Arsenal:</span>
  • React.js & Next.js
  • Tailwind CSS
  • Responsive Design

<span class="accent">DevOps & Infrastructure:</span>
  • AWS (S3, Lambda)
  • Firebase
  • Git (Advanced Workflow)

<span class="accent">Cracked Skills:</span>
  • System Performance Optimization
  • Latency Reduction
  • Real-time Data Processing
  • Secure Communication Systems`,

        highlights: `<span class="highlight">SYSTEM ACHIEVEMENTS UNLOCKED:</span>

• <span class="accent">Performance Wizard:</span> Cut API latency from 60s → 6s for thousands of users
• <span class="accent">Zero-to-One Builder:</span> Architected SMS Routing & Audit Dashboard from scratch → 10x performance boost
• <span class="accent">AI Engineer:</span> Built code review backend with LLM integration that catches bugs humans miss
• <span class="accent">Chaos Navigator:</span> Thrives in startup environments, ships production-grade code under pressure
• <span class="accent">Algorithm Master:</span> Competitive programming background with strong debugging foundations`,

        contact: `<span class="highlight">SECURE COMMUNICATION CHANNELS:</span>

📍 <span class="accent">Location:</span> India (Open to remote or relocation)
📧 <span class="accent">Email:</span> akashthakur70423@gmail.com
🔗 <span class="accent">GitHub:</span> <a href="https://github.com/ThakurAnkitSingh" target="_blank">github.com/ThakurAnkitSingh</a>
🔗 <span class="accent">LinkedIn:</span> <a href="https://linkedin.com/in/ankitsingh5" target="_blank">linkedin.com/in/ankitsingh5</a>
📱 <span class="accent">Mobile:</span> +919990580394`,

        'sudo hireme': `<span class="highlight">ACCESS GRANTED: CRACKED ENGINEER ACQUISITION PROTOCOL INITIATED</span>

I'm not looking for just any role. I'm seeking opportunities where I can:

• <span class="accent">Architect high-performance backend systems that scale</span>
• <span class="accent">Solve complex technical challenges others avoid</span>
• <span class="accent">Build AI-adjacent infrastructure and real-time systems</span>

If you need an engineer who can crack impossible problems, optimize beyond conventional limits,
and ship production-ready code while others are still debugging—let's talk.

<span class="highlight">Email me at akashthakur70423@gmail.com to initiate collaboration protocol.</span>`,

        ls: `mission.txt
resume.pdf
projects/
contact.json
performance_secrets.md`,

        'cat mission.txt': `<span class="highlight">MISSION DIRECTIVE:</span>

Build systems that others believe impossible.
Optimize performance beyond conventional limits.
Create infrastructure that scales seamlessly.
Solve problems that make others give up.

<span class="accent">I don't just meet expectations—I redefine them.</span>

Great engineering isn't about using fancy tech stacks or following trends.
It's about understanding problems at their core and crafting elegant solutions
that stand the test of time and scale.`,

        date: new Date().toString(),

        matrix: `<span class="matrix-effect">Initializing Matrix protocol...
        
Wake up, Neo...
The Matrix has you...
Follow the white rabbit.
        
Knock, knock, Neo.</span>`,

        hack: `<span class="highlight">INITIATING SYSTEM HACK...</span>

<span class="typing-effect">ACCESS POINT IDENTIFIED
BYPASSING SECURITY PROTOCOLS...
FIREWALL BREACHED
ACCESSING MAINFRAME...
DOWNLOADING DATA...
COVERING TRACKS...
EXITING SYSTEM</span>

<span class="highlight">HACK SUCCESSFUL. SYSTEM COMPROMISED.</span>`,

        target: `<span class="highlight">TARGET ACQUISITION MODE ACTIVATED</span>

<span class="accent">Primary Target:</span> High-impact engineering roles
<span class="accent">Secondary Target:</span> Performance-critical systems
<span class="accent">Tertiary Target:</span> AI-adjacent infrastructure

<span class="highlight">TARGET PARAMETERS:</span>
• Challenging technical problems
• High-performance requirements
• Scalable architecture needs
• Mission-critical systems

<span class="accent">ENGAGEMENT STATUS: ACTIVELY SEEKING</span>`,

        diagnostics: `<span class="highlight">RUNNING SYSTEM DIAGNOSTICS...</span>

<span class="typing-effect">CHECKING CORE SYSTEMS...
ANALYZING PERFORMANCE METRICS...
EVALUATING CODE QUALITY...
SCANNING PROBLEM-SOLVING MODULES...
TESTING COMMUNICATION PROTOCOLS...</span>

<span class="highlight">DIAGNOSTIC COMPLETE:</span>

<span class="accent">Core Systems:</span> Optimal
<span class="accent">Performance:</span> Exceeding specifications
<span class="accent">Code Quality:</span> Production-grade
<span class="accent">Problem-Solving:</span> Advanced capabilities
<span class="accent">Communication:</span> Clear and effective

<span class="highlight">SYSTEM STATUS: READY FOR DEPLOYMENT</span>`,

        boot: `<span class="highlight">INITIATING SYSTEM REBOOT...</span>

<span class="typing-effect">SAVING SYSTEM STATE...
PREPARING MEMORY DUMP...
CLEARING CACHE...
REINITIALIZING CORE MODULES...</span>

<span class="highlight">SYSTEM REBOOTED SUCCESSFULLY</span>

<span class="accent">All systems operational. Ready to execute commands.</span>`,

        selfdestruct: `<span class="highlight">WARNING: SELF-DESTRUCT SEQUENCE INITIATED</span>

<span class="typing-effect">AUTHORIZATION REQUIRED...
VERIFYING CREDENTIALS...
COUNTDOWN INITIATED...

10...
9...
8...
7...
6...
5...
4...
3...
2...
1...</span>

<span class="highlight">SELF-DESTRUCT ABORTED</span>

<span class="accent">Nice try! I'm too valuable to self-destruct. Let's build something amazing instead.</span>`,

        mail: `<span class="highlight">SECURE COMMUNICATION CHANNEL INITIALIZED</span>

<div class="email-redirect">
    <p>Contact Ankit Singh via email:</p>
    <div class="email-info">
        <div class="email-address">akashthakur70423@gmail.com</div>
        <div class="email-buttons">
            <a href="https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=akashthakur70423@gmail.com" class="email-link-button" id="gmail-btn" target="_blank">OPEN IN GMAIL</a>
            <a href="mailto:akashthakur70423@gmail.com" class="email-link-button" id="mailto-btn">USE DEFAULT EMAIL</a>
        </div>
    </div>
</div>`,
    };

    // Projects data
    const projects = [
        {
            title: "Audit & IVR Dashboard",
            description: "Built real-time dashboards with MongoDB Aggregation Pipelines across 8 collections, IVR agent tracker showing completion/failure rates and live status, and Excel reports with secure S3 download links.",
            outcome: "Cut error rates, reduced audit loops, enabled performance coaching for thousands of users.",
            tech: "Node.js, MongoDB, ExcelJS, AWS S3"
        },
        {
            title: "SMS Management System",
            description: "Built robust SMS system with webhook validation, deduplication, role-aware routing, smart filtering (personal, team, org-wide views), and secure file delivery with S3 signed URLs.",
            outcome: "Reduced message loss, ensured secure communication, improved response times for critical communications.",
            tech: "Node.js, AWS S3, MongoDB, Express.js"
        },
        {
            title: "Code Review AI Agent",
            description: "AI-based backend that analyzes GitHub PRs with LLM (Gemini), flags bugs, style issues, and improvements, and returns structured PR review summaries.",
            outcome: "Streamlined code review process, improved code quality, reduced review time by 40%.",
            tech: "Python, FastAPI, Celery, Redis, GitHub APIs, LLM"
        },
        {
            title: "SSL Certification Checker",
            description: "Application to validate SSL/TLS certificates, ensuring secure communication by checking validity, expiration, and issuer details in Real Time.",
            outcome: "Improved security monitoring and compliance, prevented potential security breaches.",
            tech: "React, Node.js, Express.js, OpenSSL, REST APIs"
        },
        {
            title: "Rate Limiter Proxy Agent",
            description: "Production-grade API protection system with Token Bucket, Sliding/Leaky/Fixed Window algorithms, priority queuing, real-time rate tracking, circuit breaking, and full modularity with Redis-backed distributed limiters.",
            outcome: "Enhanced API security and performance under load, prevented DDoS attacks.",
            tech: "Redis, Supabase, Express.js, Node.js"
        }
    ];

    // Experience data
    const experience = [
        {
            company: "Induced AI (DNTEL)",
            role: "Backend Engineer",
            duration: "Jan 2025 – Present",
            details: [
                "Optimized APIs, slashing response time from 1 minute to 10 seconds for thousands of users",
                "Built secure SMS routing system with webhook validation, deduplication, role-based routing, and S3-secured attachments",
                "Designed and shipped Audit & IVR Productivity Tracker with MongoDB aggregations across 8 collections, Excel exports, real-time agent tracking",
                "Architected secure, scalable REST APIs and ensured system reliability under scale",
                "Proactively resolved performance bottlenecks and fostered a culture of code quality in a lean, high-trust team",
                "Engineered solutions for complex insurance verification, billing, and practice management"
            ]
        },
        {
            company: "Leverage Edu",
            role: "Full Stack Developer",
            duration: "May 2023 – Mar 2024",
            details: [
                "Led backend development for Launchpad Application, enabling multimedia communication and team management with KnexJs, JavaScript, Node.js, Express.js, and AWS S3",
                "Built full-stack products and REST APIs for Admin Portal and Testimonials supporting team creation, goal setting, and user management using ReactJS, NextJs, KnexJs, and MySQL",
                "Improved UI and replicated complex designs with clean, readable code and pixel accuracy",
                "Contributed to Agile development cycles, ensuring timely and scalable delivery of high-quality features"
            ]
        }
    ];

    // Boot sequence messages
    const bootSequenceMessages = [
        "Initializing portfolio interface...",
        "Loading Ankit Singh's credentials...",
        "Backend engineering expertise: 95% complete...",
        "Performance optimization skills: verified...",
        "Node.js & Express.js mastery: confirmed...",
        "MongoDB aggregation skills: exceptional...",
        "API response time optimization: 90% reduction achieved...",
        "Real-time systems development: validated...",
        "Problem-solving capabilities: advanced...",
        "Startup environment adaptability: confirmed...",
        "Competitive programming background: loaded...",
        "Ready to solve your most challenging problems."
    ];

    // Initialize system time display
    function updateSystemTime() {
        const now = new Date();
        systemTime.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }

    setInterval(updateSystemTime, 1000);
    updateSystemTime();

    // Run boot sequence
    function runBootSequence() {
        bootSequence.classList.remove('hidden');
        bootMessagesElement.innerHTML = '';
        bootProgressBar.style.width = '0%';
        bootStatus.textContent = 'INITIALIZING...';

        let messageIndex = 0;
        let progress = 0;

        const messageInterval = setInterval(() => {
            if (messageIndex < bootSequenceMessages.length) {
                const messageElement = document.createElement('div');
                messageElement.textContent = bootSequenceMessages[messageIndex];
                bootMessagesElement.appendChild(messageElement);
                bootMessagesElement.scrollTop = bootMessagesElement.scrollHeight;

                progress = (messageIndex / bootSequenceMessages.length) * 100;
                bootProgressBar.style.width = `${progress}%`;

                messageIndex++;
            } else {
                clearInterval(messageInterval);
                bootStatus.textContent = 'SYSTEM READY';

                setTimeout(() => {
                    bootSequence.classList.add('hidden');
                }, 2000);
            }
        }, 600);
    }

    // Run target acquisition mode
    function runTargetMode() {
        targetMode.classList.remove('hidden');

        // Move crosshair with mouse
        document.addEventListener('mousemove', moveTargetCrosshair);

        // Exit target mode with ESC key
        document.addEventListener('keydown', exitTargetMode);
    }

    function moveTargetCrosshair(e) {
        const crosshair = document.querySelector('.target-crosshair');
        if (crosshair) {
            crosshair.style.left = `${e.clientX - 100}px`;
            crosshair.style.top = `${e.clientY - 100}px`;
        }
    }

    function exitTargetMode(e) {
        if (e.key === 'Escape') {
            targetMode.classList.add('hidden');
            document.removeEventListener('mousemove', moveTargetCrosshair);
            document.removeEventListener('keydown', exitTargetMode);
        }
    }

    // Run diagnostics panel
    function runDiagnostics() {
        diagnosticsPanel.classList.remove('hidden');

        // Animate CPU and memory meters
        animateMeters();
    }

    function animateMeters() {
        const cpuMeter = document.getElementById('cpu-meter');
        const memoryMeter = document.getElementById('memory-meter');
        const cpuValue = document.getElementById('cpu-value');
        const memoryValue = document.getElementById('memory-value');

        let cpu = 0;
        let memory = 0;

        const interval = setInterval(() => {
            if (cpu < 92) {
                cpu += Math.random() * 5;
                if (cpu > 92) cpu = 92;
                cpuMeter.style.width = `${cpu}%`;
                cpuValue.textContent = `${Math.round(cpu)}%`;
            }

            if (memory < 95) {
                memory += Math.random() * 3;
                if (memory > 95) memory = 95;
                memoryMeter.style.width = `${memory}%`;
                memoryValue.textContent = `${Math.round(memory)}%`;
            }

            if (cpu >= 92 && memory >= 95) {
                clearInterval(interval);

                // Add tech hover effects
                const nodes = document.querySelectorAll('.neural-node');
                nodes.forEach(node => {
                    node.addEventListener('mouseover', () => {
                        node.style.transform = 'scale(1.2)';
                        node.style.boxShadow = '0 0 15px var(--accent-color)';
                    });

                    node.addEventListener('mouseout', () => {
                        node.style.transform = 'scale(1)';
                        node.style.boxShadow = 'none';
                    });
                });
            }
        }, 100);
    }

    if (closeDiagnostics) {
        closeDiagnostics.addEventListener('click', () => {
            diagnosticsPanel.classList.add('hidden');
        });
    }

    // Typing effect function
    function typeText(text, element, speed = 10) {
        return new Promise(resolve => {
            let i = 0;
            element.classList.add('typing');

            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    element.scrollTop = element.scrollHeight;
                    setTimeout(type, speed);
                } else {
                    element.classList.remove('typing');
                    resolve();
                }
            }

            type();
        });
    }

    // Matrix effect
    function runMatrixEffect(outputElement) {
        outputElement.innerHTML = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$&+,:;=?@#|\'<>.^*()%!-';
        const rows = 15;
        const cols = 40;

        // Create matrix grid
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.className = 'matrix-row';

            for (let j = 0; j < cols; j++) {
                const span = document.createElement('span');
                span.className = 'matrix-char';
                span.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
                span.style.animationDelay = `${Math.random() * 2}s`;
                row.appendChild(span);
            }

            outputElement.appendChild(row);
        }

        // Stop after 5 seconds
        setTimeout(() => {
            outputElement.innerHTML = commandsData.matrix;
        }, 5000);
    }

    // Simulate hacking effect
    function simulateHack(outputElement) {
        const hackSteps = [
            "INITIATING SYSTEM HACK...",
            "ACCESS POINT IDENTIFIED",
            "BYPASSING SECURITY PROTOCOLS...",
            "FIREWALL BREACHED",
            "ACCESSING MAINFRAME...",
            "DOWNLOADING DATA...",
            "COVERING TRACKS...",
            "EXITING SYSTEM",
            "HACK SUCCESSFUL. SYSTEM COMPROMISED."
        ];

        outputElement.innerHTML = '';

        hackSteps.forEach((step, index) => {
            setTimeout(() => {
                const stepElement = document.createElement('div');
                stepElement.className = index === 0 || index === hackSteps.length - 1 ? 'highlight' : '';
                stepElement.textContent = step;
                outputElement.appendChild(stepElement);
                outputElement.scrollTop = outputElement.scrollHeight;
            }, index * 500);
        });
    }

    // Process commands
    async function processCommand(cmd) {
        const commandLower = cmd.toLowerCase().trim();

        // Create command block
        const commandBlock = document.createElement('div');
        commandBlock.className = 'command-block';

        // Command input display
        const commandInput = document.createElement('div');
        commandInput.className = 'command-input';
        commandInput.innerHTML = `<span class="prompt-user">root@system</span><span class="prompt-separator">:</span><span class="prompt-location">~/cracked-engineer</span><span class="prompt-dollar">#</span> ${cmd}`;

        // Command output
        const commandOutput = document.createElement('div');
        commandOutput.className = 'command-output';

        // Add to terminal
        commandBlock.appendChild(commandInput);
        commandBlock.appendChild(commandOutput);
        terminalOutput.appendChild(commandBlock);

        // Add to history
        if (cmd.trim() !== '') {
            commandHistory.push(cmd);
            historyIndex = commandHistory.length;
        }

        // Process command
        if (commandLower === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        } else if (commandLower === 'projects') {
            let output = '<span class="highlight">CRACKED PROJECT PORTFOLIO:</span>\n\n';
            projects.forEach((project, index) => {
                output += `<div class="project-item">
                    <div class="project-title">${index + 1}. ${project.title}</div>
                    <div>${project.description}</div>
                    <div><span class="accent">Impact:</span> ${project.outcome}</div>
                    <div class="project-tech"><span class="accent">Tech Stack:</span> ${project.tech}</div>
                </div>`;
            });
            commandOutput.innerHTML = output;
        } else if (commandLower === 'experience') {
            let output = '<span class="highlight">PROFESSIONAL BATTLE RECORD:</span>\n\n';
            experience.forEach(job => {
                output += `<div class="experience-item">
                    <div class="experience-title">${job.company} — ${job.role}</div>
                    <div class="experience-duration">${job.duration}</div>
                    <ul>
                        ${job.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>`;
            });
            commandOutput.innerHTML = output;
        } else if (commandLower === 'matrix') {
            runMatrixEffect(commandOutput);
        } else if (commandLower === 'hack') {
            simulateHack(commandOutput);
        } else if (commandLower === 'boot') {
            // Show boot sequence overlay
            runBootSequence();
            commandOutput.innerHTML = commandsData.boot;
        } else if (commandLower === 'target') {
            runTargetMode();
            commandOutput.innerHTML = commandsData.target;
        } else if (commandLower === 'diagnostics') {
            runDiagnostics();
            commandOutput.innerHTML = commandsData.diagnostics;
        } else if (commandLower === 'mail') {
            commandOutput.innerHTML = commandsData.mail;

            // Add click handlers for the buttons
            const gmailBtn = commandOutput.querySelector('#gmail-btn');
            const mailtoBtn = commandOutput.querySelector('#mailto-btn');

            if (gmailBtn) {
                gmailBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    window.open("https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=akashthakur70423@gmail.com", "_blank");
                });
            }

            if (mailtoBtn) {
                mailtoBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    window.open("mailto:akashthakur70423@gmail.com", "_self");
                });
            }

        } else if (commandsData[commandLower]) {
            commandOutput.innerHTML = commandsData[commandLower];
        } else if (commandLower.startsWith('echo ')) {
            const echoText = cmd.substring(5);
            commandOutput.textContent = echoText;
        } else if (commandLower.startsWith('cat ')) {
            const fileName = commandLower.substring(4);
            if (commandsData[commandLower]) {
                commandOutput.innerHTML = commandsData[commandLower];
            } else {
                commandOutput.textContent = `cat: ${fileName}: No such file or directory`;
            }
        } else {
            commandOutput.textContent = `Command not found: ${cmd}. Type 'help' for available commands.`;
        }

        // Scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Handle input
    terminalInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = terminalInput.value.trim();
            if (command) {
                processCommand(command);
                terminalInput.value = '';
            }
        } else if (event.key === 'ArrowUp') {
            // Navigate command history (up)
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];

                // Move cursor to end of input
                setTimeout(() => {
                    terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
                }, 0);
            }
            event.preventDefault();
        } else if (event.key === 'ArrowDown') {
            // Navigate command history (down)
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else if (historyIndex === commandHistory.length - 1) {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
            event.preventDefault();
        } else if (event.key === 'Tab') {
            // Autocomplete
            event.preventDefault();
            const currentInput = terminalInput.value.trim();

            if (currentInput) {
                const matchingCommands = availableCommands.filter(cmd =>
                    cmd.startsWith(currentInput)
                );

                if (matchingCommands.length === 1) {
                    terminalInput.value = matchingCommands[0];
                } else if (matchingCommands.length > 1) {
                    // Show available completions
                    processCommand('');
                    const commandBlock = document.createElement('div');
                    commandBlock.className = 'command-block';
                    const commandOutput = document.createElement('div');
                    commandOutput.className = 'command-output';
                    commandOutput.textContent = matchingCommands.join('  ');
                    commandBlock.appendChild(commandOutput);
                    terminalOutput.appendChild(commandBlock);

                    // Find common prefix
                    let commonPrefix = currentInput;
                    let pos = currentInput.length;
                    while (matchingCommands.every(cmd => cmd.length > pos && cmd.charAt(pos) === matchingCommands[0].charAt(pos))) {
                        commonPrefix += matchingCommands[0].charAt(pos);
                        pos++;
                    }

                    terminalInput.value = commonPrefix;
                }
            }
        }
    });

    // Mobile command panel
    if (mobileCommands) {
        mobileCommands.addEventListener('click', () => {
            mobilePanel.classList.remove('hidden');
        });
    }

    if (closePanel) {
        closePanel.addEventListener('click', () => {
            mobilePanel.classList.add('hidden');
        });
    }

    commandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const command = button.dataset.cmd;
            processCommand(command);
            mobilePanel.classList.add('hidden');
            terminalInput.focus();
        });
    });

    // Focus input on terminal click
    document.getElementById('terminal').addEventListener('click', () => {
        terminalInput.focus();
    });

    // Auto focus on load
    terminalInput.focus();

    // Check if mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Show/hide mobile command button
    function updateMobileUI() {
        if (mobileCommands) {
            if (isMobile()) {
                mobileCommands.classList.remove('hidden');
            } else {
                mobileCommands.classList.add('hidden');
                mobilePanel.classList.add('hidden');
            }
        }
    }

    // Run boot sequence on load
    setTimeout(() => {
        runBootSequence();
    }, 500);

    // Update on resize
    window.addEventListener('resize', updateMobileUI);
    updateMobileUI();

    // Add CSS for new styles
    const style = document.createElement('style');
    style.textContent = `
        .accent {
            color: var(--accent-color);
            font-weight: bold;
        }
        
        .matrix-effect {
            color: #00ff00;
            font-family: 'Courier New', monospace;
            text-shadow: 0 0 5px rgba(0, 255, 0, 0.7);
        }
        
        .matrix-row {
            display: flex;
            justify-content: center;
        }
        
        .matrix-char {
            margin: 0 2px;
            animation: matrix-fall 3s infinite linear;
            color: #00ff00;
        }
        
        @keyframes matrix-fall {
            0% { opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
        }
        
        .typing-effect {
            display: block;
            line-height: 1.5;
            color: #73d0ff;
        }
    `;
    document.head.appendChild(style);
});