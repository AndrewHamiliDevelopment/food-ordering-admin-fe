import {proxy, useSnapshot} from 'valtio';
import { Cart, Category, Paginated, PaymentMethod, Product, Resource, User } from './api';

export interface Store {
    paginatedProducts: Paginated<Product>;
    paginatedCategories: Paginated<Category>;
    paginatedPaymentMethods: Paginated<PaymentMethod>;
    products: Product[];
    me: User | null;
    cart: Cart | null;
    paginatedResource: Paginated<Resource>;
    paginatedUsers: Paginated<User>;
}

const defaultPaginated = {data: [], meta: {currentPage: 0, itemsPerPage: 0, totalItems: 0, totalPages: 0}};

export const store = proxy<Store>({products: [], paginatedProducts: defaultPaginated, paginatedCategories: defaultPaginated, paginatedPaymentMethods: defaultPaginated, me: null, cart: null, paginatedResource: defaultPaginated, paginatedUsers: defaultPaginated})
export const useStore = () => useSnapshot(store);