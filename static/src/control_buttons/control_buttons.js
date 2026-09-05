/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";
import { CalculatorDialog } from "@pos_calculator/calculator_dialog/calculator_dialog";
import { OrderSummary } from "@pos_hr/app/screens/product_screen/order_summary/order_summary";

patch(ControlButtons.prototype, {
    onClickCalculator() {
        this.dialog.add(CalculatorDialog, {});
    }
});

// Guard pos_hr OrderSummary against unassigned cashier roles (fixes the missing delete button and layout crash)
patch(OrderSummary.prototype, {
    updateSelectedOrderline() {
        if (!this.pos?.cashier) {
            return;
        }
        try {
            return super.updateSelectedOrderline(...arguments);
        } catch (e) {
            return;
        }
    }
});