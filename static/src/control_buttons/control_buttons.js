/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";
import { DebugWidget } from "@point_of_sale/app/utils/debug/debug_widget";
import { CalculatorDialog } from "@pos_calculator/calculator_dialog/calculator_dialog";

// Patch the Calculator Action into ControlButtons
patch(ControlButtons.prototype, {
    onClickCalculator() {
        this.dialog.add(CalculatorDialog, {});
    }
});

// Safely patch DebugWidget to prevent crashes when cashier is unassigned
patch(DebugWidget.prototype, {
    get isDisabled() {
        if (!this.pos?.cashier) {
            return true;
        }
        try {
            return super.isDisabled;
        } catch (e) {
            return false;
        }
    }
});