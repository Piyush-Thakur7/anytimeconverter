/* ═══════════════════════════════════════════════════════════
   dice.js — 3D CSS Cube Dice Controller
   Controls spin animation, face transitions, and clickability.
   ═══════════════════════════════════════════════════════════ */

const LudoDice = (() => {
    let btn = null;
    let cube = null;
    let rolling = false;

    function getFaceRotation(value) {
        switch (value) {
            case 1: return { x: 0, y: 0 };
            case 2: return { x: -90, y: 0 };
            case 3: return { x: 0, y: -90 };
            case 4: return { x: 0, y: 90 };
            case 5: return { x: 90, y: 0 };
            case 6: return { x: 180, y: 0 };
            default: return { x: 0, y: 0 };
        }
    }

    return {
        /** Bind to DOM elements. Call once on page load. */
        init() {
            btn = document.getElementById('dice-btn');
            cube = document.getElementById('dice-cube');
            this.setValue(6);
        },

        /**
         * Animate a 3D spin and settle on a face value.
         * @param {number} value - Final dice value (1–6)
         * @param {Function} callback - Called when animation completes
         */
        animateRoll(value, callback) {
            if (!btn || !cube) {
                if (callback) callback(value);
                return;
            }

            rolling = true;
            this.setClickable(false);

            // Play dice rattle sound
            if (window.LudoSounds) LudoSounds.playDiceRoll();

            const rot = getFaceRotation(value);
            // Dynamic random rotations for smooth continuous roll
            const spinsX = (Math.floor(Math.random() * 3) + 3) * 360;
            const spinsY = (Math.floor(Math.random() * 3) + 3) * 360;
            const spinsZ = (Math.floor(Math.random() * 2) + 1) * 360;

            // Trigger smooth transition
            cube.style.transition = 'transform 0.9s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
            cube.style.transform = `rotateX(${rot.x + spinsX}deg) rotateY(${rot.y + spinsY}deg) rotateZ(${spinsZ}deg)`;

            // Wait for transition to finish
            setTimeout(() => {
                rolling = false;
                if (callback) callback(value);
            }, 900);
        },

        /** Set dice face without animation */
        setValue(value) {
            if (!cube) return;
            const rot = getFaceRotation(value);
            cube.style.transition = 'none';
            cube.style.transform = `rotateX(${rot.x}deg) rotateY(${rot.y}deg) rotateZ(0deg)`;
        },

        /** Enable/disable dice button with glow effect */
        setClickable(enabled) {
            if (!btn) return;
            btn.disabled = !enabled;
            btn.style.cursor = enabled ? 'pointer' : 'not-allowed';
            btn.style.opacity = enabled ? '1' : '0.6';
            if (enabled) {
                btn.classList.add('roll-pulse');
            } else {
                btn.classList.remove('roll-pulse');
            }
        },

        isRolling() { return rolling; }
    };
})();

if (typeof window !== 'undefined') window.LudoDice = LudoDice;
