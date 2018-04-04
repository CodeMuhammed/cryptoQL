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
        loadChildren: ()=> AuthModule
    },
    {
        path: 'portfolio',
        loadChildren: ()=> AirdropModule
    },
    {
        path: 'coinlist',
        loadChildren: () => CoinListModule
    }
];
