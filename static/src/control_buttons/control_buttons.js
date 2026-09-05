/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";
import { CalculatorDialog } from "@Odoo_Pos_Calculator/calculator_dialog/calculator_dialog";
import { DebugWidget } from "@point_of_sale/app/utils/debug/debug_widget";

// Patch the Calculator Action into ControlButtons
patch(ControlButtons.prototype, {
    onClickCalculator() {
        this.dialog.add(CalculatorDialog, {});
    }
});

// Fix Odoo 19 crash: Safely fallback using optional chaining if cashier session is uninitialized
patch(DebugWidget.prototype, {
    get isDisabled() {
        return this.pos?.cashier?._role === "minimal";
    }
});
