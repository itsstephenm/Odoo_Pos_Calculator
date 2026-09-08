patch(LoginScreen.prototype, {
    clickBack() {
        try {
            if (this.pos && typeof this.pos.showScreen === 'function') {
                this.pos.showScreen('ProductScreen');
                return;
            }
        } catch (e) {
            console.warn("Fallback navigation triggered:", e);
        }
    }
});