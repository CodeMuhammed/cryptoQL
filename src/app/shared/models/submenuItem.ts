
export class SubMenuItem {
    public constructor(public title: string,
        public route: string,
        public icon: string) {

    }

    static fromJson({ title, route, icon }): SubMenuItem {
        return new SubMenuItem(
            title, route, icon
        );
    }

}
