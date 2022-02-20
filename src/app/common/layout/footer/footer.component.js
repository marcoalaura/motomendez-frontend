'use strict';

import controller from './footer.controller';
import './footer.css';

const FooterComponent = {
    template: `
        <footer class="footer text-info">
            Agetic {{ $ctrl.year }}
        </footer>
    `,
    controller
};

export default FooterComponent;