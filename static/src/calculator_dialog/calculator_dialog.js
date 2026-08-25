/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";

export class CalculatorDialog extends Component {
    static template = "pos_calculator.CalculatorDialog";
    static components = { Dialog };
    static props = {
        close: Function,
    };

    setup() {
        this.state = useState({
            display: "0",
            previousValue: null,
            operator: null,
            waitingForNewValue: false,
        });
    }

    inputDigit(digit) {
        if (this.state.waitingForNewValue) {
            this.state.display = String(digit);
            this.state.waitingForNewValue = false;
        } else {
            this.state.display = this.state.display === "0" ? String(digit) : this.state.display + digit;
        }
    }

    inputDecimal() {
        if (this.state.waitingForNewValue) {
            this.state.display = "0.";
            this.state.waitingForNewValue = false;
        } else if (!this.state.display.includes(".")) {
            this.state.display += ".";
        }
    }

    clearEntry() {
        this.state.display = "0";
    }

    clearAll() {
        this.state.display = "0";
        this.state.previousValue = null;
        this.state.operator = null;
        this.state.waitingForNewValue = false;
    }

    backspace() {
        if (!this.state.waitingForNewValue) {
            this.state.display = this.state.display.length > 1 ? this.state.display.slice(0, -1) : "0";
        }
    }

    performOperation(nextOperator) {
        const inputValue = parseFloat(this.state.display);

        if (this.state.previousValue == null) {
            this.state.previousValue = inputValue;
        } else if (this.state.operator) {
            const currentValue = this.state.previousValue || 0;
            const newValue = this.calculate(currentValue, inputValue, this.state.operator);
            this.state.display = String(newValue);
            this.state.previousValue = newValue;
        }

        this.state.waitingForNewValue = true;
        this.state.operator = nextOperator;
    }

    calculate(prev, next, operator) {
        switch (operator) {
            case "+": return prev + next;
            case "-": return prev - next;
            case "×": return prev * next;
            case "÷": return next === 0 ? "Error" : prev / next;
            case "y^x": return Math.pow(prev, next);
            default: return next;
        }
    }

    applyScientific(func) {
        const current = parseFloat(this.state.display);
        if (isNaN(current)) return;

        let result;
        switch (func) {
            case "sqrt":
                result = Math.sqrt(current);
                break;
            case "square":
                result = Math.pow(current, 2);
                break;
            case "percent":
                result = current / 100;
                break;
        }
        this.state.display = String(result);
        this.state.waitingForNewValue = true;
    }

    equals() {
        this.performOperation(null);
    }
}
