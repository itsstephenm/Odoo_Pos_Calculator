/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";
import { DebugWidget } from "@point_of_sale/app/utils/debug/debug_widget";
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