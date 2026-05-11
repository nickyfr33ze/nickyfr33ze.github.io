const output = document.querySelector("[data-terminal-output]");
const input = document.querySelector("[data-terminal-input]");

const commands = {
    help: {
        description: "List available commands.",
        run: () => `
            <p>Available commands:</p>
            <div class="command-grid">
                ${commandCard("about", "Who I am and what I work on.")}
                ${commandCard("skills", "Systems, security, scripting, backend.")}
                ${commandCard("resume", "Broad professional profile.")}
                ${commandCard("projects", "Current and future project notes.")}
                ${commandCard("blog", "Writing and rough thoughts.")}
                ${commandCard("gallery", "Photography and visual work.")}
                ${commandCard("contact", "Ways to reach me.")}
                ${commandCard("clear", "Clear the terminal.")}
            </div>
        `
    },
    about: {
        description: "Show profile.",
        run: () => `
            <p>Name's Nick. I work in IT professionally and spend a lot of my free time around systems, security research, homelabs, and backend tooling.</p>
            <p>I like practical infrastructure, useful automation, and learning how things behave when they stop behaving politely.</p>
        `
    },
    skills: {
        description: "Show technical focus.",
        run: () => `
            <ul>
                <li>Python, Bash, PowerShell</li>
                <li>Systems administration and endpoint support</li>
                <li>Security research, blue team foundations, and red team curiosity</li>
                <li>Homelab operations, monitoring, and self-hosted tooling</li>
                <li>Backend development and automation</li>
                <li>Developing custom AI tooling with frontier models</li>
            </ul>
        `
    },
    resume: {
        description: "Open resume.",
        run: () => `
            <p>Broad, privacy-conscious professional profile: IT, systems, security foundations, automation, and backend work.</p>
            <p>History in MCP environments, non-profit, corporate, and higher education IT.</p>
            <p><a href="/resume/">Open /resume/</a></p>
        `
    },
    projects: {
        description: "Open projects.",
        run: () => `
            <p>Project notes are still being shaped. The short version: expect practical tooling, homelab work, security labs, and backend experiments.</p>
            <p><a href="/projects/">Open /projects/</a></p>
        `
    },
    blog: {
        description: "Open blog.",
        run: () => `<p><a href="/blog/">Open /blog/</a> for notes on tech, projects, life, and whatever else makes it through the filter.</p>`
    },
    gallery: {
        description: "Open gallery.",
        run: () => `<p><a href="/gallery/">Open /gallery/</a> for photography: dog, sunrise, city, forest. The important genres.</p>`
    },
    contact: {
        description: "Show contact links.",
        run: () => `
            <ul>
                <li>Email: <a href="mailto:nfriesen@pm.me">nfriesen@pm.me</a></li>
                <li>LinkedIn: <a href="https://www.linkedin.com/in/nicholas-friesen-046969169/" target="_blank" rel="noreferrer">Nicholas Friesen</a></li>
                <li>GitHub: <a href="https://github.com/nickyfr33ze" target="_blank" rel="noreferrer">github.com/nickyfr33ze</a></li>
                <li>Username: NickyFr33ze, just about everywhere</li>
            </ul>
        `
    },
    neofetch: {
        description: "Show compact profile.",
        run: () => `
            <pre>nick@web
--------
role: IT consultant / backend tinkerer
focus: systems, security, automation
stack: Python, Bash, PowerShell
site: nickyfr33ze.github.io
status: under active construction</pre>
        `
    },
    clear: {
        description: "Clear terminal.",
        run: () => {
            output.innerHTML = "";
            return "";
        }
    }
};

function commandCard(command, description) {
    return `<a class="command-card" href="#" data-run-command="${command}"><strong>${command}</strong><span>${description}</span></a>`;
}

function printCommand(command) {
    const normalized = command.trim().toLowerCase();

    if (!normalized) {
        return;
    }

    const entry = commands[normalized];
    const block = document.createElement("div");
    block.innerHTML = `
        <div class="prompt-line">
            <span class="prompt">user@nickyfr33ze:$</span>
            <span class="command">${escapeHtml(command)}</span>
        </div>
        <div class="output">
            ${entry ? entry.run() : `<p>Command not found: <span class="command">${escapeHtml(command)}</span>. Try <span class="command">help</span>.</p>`}
        </div>
    `;

    output.appendChild(block);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[character]));
}

input?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
        return;
    }

    const command = input.value;
    input.value = "";
    printCommand(command);
});

document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-run-command]");

    if (!trigger) {
        return;
    }

    event.preventDefault();
    printCommand(trigger.dataset.runCommand);
    input?.focus();
});

input?.focus();
