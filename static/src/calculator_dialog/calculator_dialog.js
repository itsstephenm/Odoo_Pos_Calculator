/** @odoo-module */

import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";

export class CalculatorDialog extends Component {
    static template = "pos_calculator.CalculatorDialog";
    static components = { Dialog };

    setup() {
        this.state = useState({
            input: "0",
            equation: "",
        });
    }

    appendValue = (value) => {
        if (this.state.input === "0" && value !== ".") {
            this.state.input = value;
        } else {
            this.state.input += value;
        }
    }

    clearAll = () => {
        this.state.input = "0";
        this.state.equation = "";
    }

    clearEntry = () => {
        this.state.input = "0";
    }

    backspace = () => {
        if (this.state.input.length > 1) {
            this.state.input = this.state.input.slice(0, -1);
        } else {
            this.state.input = "0";
        }
    }

    applyScientific = (type) => {
        try {
            let val = parseFloat(this.state.input);
            if (isNaN(val)) return;
            let result = 0;
            if (type === 'sqrt') {
                result = Math.sqrt(val);
                this.state.equation = `√(${val})`;
            } else if (type === 'sqr') {
                result = Math.pow(val, 2);
                this.state.equation = `(${val})²`;
            } else if (type === 'pow') {
                this.state.input += "^";
                return;
            }
            this.state.input = String(result);
        } catch (e) {
            this.state.input = "Error";
        }
    }

    calculate = () => {
        try {
            let sanitized = this.state.input
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
                .replace(/\^/g, "**");
            let result = eval(sanitized);
            this.state.equation = this.state.input + " =";
            this.state.input = String(result);
        } catch (e) {
            this.state.input = "Error";
        }
    }
}