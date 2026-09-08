/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { LoginScreen } from "@point_of_sale/app/screens/login_screen/login_screen";

patch(LoginScreen.prototype, {
    clickBack() {
        window.location.href = '/web#action=point_of_sale.action_client_pos_menu';
    }
});