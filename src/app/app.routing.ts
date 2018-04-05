import { AuthGuard } from 'app/core' 

export const AppRoutes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: './auth-module/auth.module#AuthModule',
    },
    {
        path: 'portfolio',
        loadChildren: './portfolio-module/portfolio.module#PortfolioModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'coinlist',
        loadChildren: './coinlist-module/coinlist.module#CoinListModule',
        canActivate: [AuthGuard],
    }
];
