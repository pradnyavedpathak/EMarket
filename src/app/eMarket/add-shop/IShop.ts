import { IContacts } from './Icontacts';

export interface IShop {
    Shop_No: number;
    Shop_Name: string;
    Shop_Owner: string;
    Shop_Address: string;
    Contacts: IContacts;
}
