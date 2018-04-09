
import {
    PortfolioComponent,
    PortfolioStartComponent,
    CoinPageComponent
} from './components';

// import { AanalyticsGuard } from 'app/auth-module/guards';

export const PortfolioRoutes = [
    {
        path: '',
        component: PortfolioComponent,
        children: [
            {
                path: '',
                redirectTo: 'summary'
            },
            {
                path: 'summary',
                component: PortfolioStartComponent
            },
            {
                path: 'summaryDetails/:id',
                component: CoinPageComponent
            }
        ]
    }
];
