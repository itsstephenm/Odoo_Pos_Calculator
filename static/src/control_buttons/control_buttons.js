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

// Guard ProductScreen numpad rendering against undefined role states
patch(ProductScreen.prototype, {
    get getNumpadButtons() {
        try {
            return super.getNumpadButtons;
        } catch (e) {
            return {};
        }
    }
});