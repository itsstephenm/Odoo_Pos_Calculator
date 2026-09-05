/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { CalculatorDialog } from "@pos_calculator/calculator_dialog/calculator_dialog";

// Inject the Calculator button into control buttons
patch(ControlButtons.prototype, {
    onClickCalculator() {
        this.dialog.add(CalculatorDialog, {});
    }
});

// Guard ProductScreen numpad rendering against undefined cashier/role states
patch(ProductScreen.prototype, {
    getNumpadButtons() {
        try {
            return super.getNumpadButtons(...arguments);
        } catch (e) {
            return [
                { value: "1" }, { value: "2" }, { value: "3" },
                { value: "4" }, { value: "5" }, { value: "6" },
                { value: "7" }, { value: "8" }, { value: "9" },
                { value: "0" }, { value: "." }, { value: "-" }
            ];
        }
    }
});