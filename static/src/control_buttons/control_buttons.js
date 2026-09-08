/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";
import { DebugWidget } from "@point_of_sale/app/utils/debug/debug_widget";
import { LoginScreen } from "@point_of_sale/app/screens/login_screen/login_screen";
import { CalculatorDialog } from "@pos_calculator/calculator_dialog/calculator_dialog";

patch(ControlButtons.prototype, {
    onClickCalculator() {
        this.dialog.add(CalculatorDialog, {});
    }
});

patch(DebugWidget.prototype, {
    get isDisabled() {
        if (!this.pos || !this.pos.cashier) {
            return true;
        }
        try {
            return super.isDisabled;
        } catch (e) {
            return true;
        }
    }
});

patch(LoginScreen.prototype, {
    async clickBack() {
        try {
            if (!this.pos || !this.pos.get_cashier()) {
                this.pos.showScreen('ProductScreen');
                return;
            }
            return await super.clickBack(...arguments);
        } catch (e) {
            console.warn("Intercepted LoginScreen clickBack crash:", e);
            this.pos.showScreen('ProductScreen');
        }
    }
});