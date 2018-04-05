import { AuthModule } from 'app/auth-module/auth.module';
import { AirdropModule } from 'app/airdrop-module/airdrop.module';
import { CoinListModule } from 'app/coinlist-module/coinlist.module';

export const AppRoutes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: './auth-module/auth.module#AuthModule'
    },
    {
        path: 'portfolio',
        loadChildren: './airdrop-module/airdrop.module#AirdropModule'
    },
    {
        path: 'coinlist',
        loadChildren: './coinlist-module/coinlist.module#CoinListModule'
    }
];
