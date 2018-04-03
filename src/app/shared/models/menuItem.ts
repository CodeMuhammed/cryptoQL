import {SubMenuItem} from "./submenuItem";

export class MenuItem {
    public title: string;
    public showAll = false;
    public backButtonEnabled = false;
    public searchEnabled = false;
    public searchActive = false;
    public submenuItems: SubMenuItem[] = [{"title": "logout", "route": "", "icon": ""}];
}
