(function() {
    const rawScript = `
    There is something quite powerful about the decision to begin, as you never know exactly where that beginning will lead. 
    This year, I'm challenging myself to take a few seconds each day to record and reflect. 
    And although this is my matric year, filled with a plethora of portfolio tasks and exams, I know that if I commit to this process—day by day, word by word—by the end of this year, I will have pieced together something meaningful. 
    On that note, the theme of this video is the passage of time. 
    
    For instance, TODAY is already my eighteenth birthday. Looking back, childhood feels like a collection of scattered fragments—yet somehow those fragments became years, and those years have led to this moment. 
    It's a strange paradox, really: the days feel long, but the years flash by. 
    And so, we try to seize each moment, even the small ones—the tiny ones—because every hesitant decision nudges us towards the person we are becoming. 
    Each choice accumulates into something far larger than we ever realise. 
    
    "Don't look back in anger," as Oasis beautifully put it. 
    Don't dwell on guilt or regret for what has already passed. 
    Instead, acknowledge the past, live fully in the present, and allow it to shape the future you desire. 
    
    Besides that, we must also learn to trust the process. 
    We often believe that growth will arrive in a fanfare and announce itself boldly, but most of the times, it creeps in quietly. 
    It hides in mundane routines, in late-night study sessions, and in the failures that push us to try again. 
    It crawls by so imperceptibly, until one day you look back and realise you've changed in ways you never expected. 
    
    I am now writing my finals already, yet within this video I'll have spoken for only a few minutes. 
    Each sliver might seem insignificant on its own, but stitched together they form a rich tapestry of effort and change. 
    
    And finally, as this video (so too, this year) comes to an end, I can't help but remind myself that every ending is a stepping stone—one that guides you forward and leads you to a fresh, new beginning.
    `;

    const paragraphs = rawScript.trim().split(/\n\s*\n/);
    const container = document.getElementById('word-container');
    const errorMsg = document.getElementById('error-msg');
    
    if (!paragraphs || paragraphs.length === 0) {
        errorMsg.textContent = "Error: No text found.";
        return;
    } else {
        errorMsg.style.display = 'none';
    }

    const colors = ['var(--col-1)', 'var(--col-2)', 'var(--col-3)', 'var(--col-4)', 'var(--col-5)'];
    
    function getWeekID(date) {
        const firstJan = new Date(2026, 0, 1);
        const dayOffset = (firstJan.getDay() + 6) % 7;
        const firstMonday = new Date(2026, 0, 1 - dayOffset);
        const diff = date - firstMonday;
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    }

    let globalWordCount = 0;

    paragraphs.forEach(para => {
        const paraDiv = document.createElement('div');
        paraDiv.className = 'paragraph-block';

        const tokens = para.trim().split(/(\u2014)|\s+/).filter(t => t && t.length > 0);

        tokens.forEach(token => {
            if (token === '\u2014') {
                const dashSpan = document.createElement('span');
                dashSpan.textContent = '—';
                dashSpan.style.alignSelf = 'center';
                dashSpan.style.padding = '0 2px';
                paraDiv.appendChild(dashSpan);
                return;
            }

            if (globalWordCount >= 366) return;

            const currentDate = new Date(2026, 0, 1);
            currentDate.setDate(currentDate.getDate() + globalWordCount);

            const weekID = getWeekID(currentDate);
            const color = colors[Math.abs(weekID) % colors.length];

            const wrapper = document.createElement('div');
            wrapper.className = 'word-wrapper';

            // MOBILE OPTIMIZATION: Toggle 'active' class on tap
            wrapper.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevents the document listener from firing immediately
                
                const isActive = this.classList.contains('active');
                
                // Clear all other active tooltips first
                document.querySelectorAll('.word-wrapper.active').forEach(el => {
                    el.classList.remove('active');
                });

                // If it wasn't active, make it active now
                if (!isActive) {
                    this.classList.add('active');
                }
            });

            const span = document.createElement('span');
            span.className = 'word-item';
            span.style.backgroundColor = color;
            span.textContent = token;

            const tooltip = document.createElement('div');
            tooltip.className = 'infobox';
            
            const dateStr = currentDate.toLocaleDateString('en-GB', { 
                weekday: 'short', 
                day: 'numeric', 
                month: 'short' 
            });
            tooltip.innerHTML = `
                <span class="date-label">${dateStr}</span>
                <span class="count-label">Word #${globalWordCount + 1}</span>
            `;

            wrapper.appendChild(span);
            wrapper.appendChild(tooltip);
            paraDiv.appendChild(wrapper);

            globalWordCount++;
        });

        container.appendChild(paraDiv);
    });

    // Close any open tooltips when tapping anywhere else on the screen
    document.addEventListener('click', () => {
        document.querySelectorAll('.word-wrapper.active').forEach(el => {
            el.classList.remove('active');
        });
    });
})();