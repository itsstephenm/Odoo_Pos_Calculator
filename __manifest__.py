{
    'name': 'POS Calculator',
    'version': '1.0',
    'category': 'Sales/Point of Sale',
    'summary': 'Standalone Calculator in Point of Sale',
    'depends': ['point_of_sale'],
    'assets': {
        'point_of_sale._assets_pos': [
            'Odoo_Pos_Calculator/static/src/calculator_dialog/**/*',
            'Odoo_Pos_Calculator/static/src/control_buttons/**/*',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}
