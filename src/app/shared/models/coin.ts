export class Coin {
    public id?: string;
    public name: string;
    public symbol: string;
    public type: string;          // defines an ico or a coin already tradable
    public price: number;
    public rating: number;
    public releaseDate: Date;
    public description: string;
    public websiteUrl: string;
    public logoUrl: string;
    public contractAddress: string;
}
