import {proxy, useSnapshot} from 'valtio';
import { Cart, Category, Order, Paginated, PaymentMethod, Product, Resource, User } from './api';

export interface Store {
    paginatedProducts: Paginated<Product>;
    paginatedCategories: Paginated<Category>;
    paginatedPaymentMethods: Paginated<PaymentMethod>;
    products: Product[];
    me: User | null;
    cart: Cart | null;
    paginatedResources: Paginated<Resource>;
    paginatedUsers: Paginated<User>;
    paginatedOrders: Paginated<Order>;
}

const defaultPaginated = {data: [], meta: {currentPage: 0, itemsPerPage: 0, totalItems: 0, totalPages: 0}};

export const store = proxy<Store>({products: [], paginatedProducts: defaultPaginated, paginatedCategories: defaultPaginated, paginatedPaymentMethods: defaultPaginated, me: null, cart: null, paginatedResources: defaultPaginated, paginatedUsers: defaultPaginated, paginatedOrders: defaultPaginated})
export const useStore = () => useSnapshot(store);