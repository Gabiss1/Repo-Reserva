import api from "../api";
import { CreateCategoryDTO } from "../types/creates/CreateCategoryDTO";

import { Category } from "../types/entities/Category";
import { UpdateCategoryRequest } from "../types/updates/UpdateCategoryRequest";

export async function findAllCategories(): Promise<Category[]> {

    const response = await api.get(
        "/categories"
    );

    return response.data;

}

export async function findCategoryById(
    id: string
): Promise<Category> {

    const response = await api.get(
        `/categories/${id}`
    );

    return response.data;

}

export async function createCategory(
    dto: CreateCategoryDTO
): Promise<Category> {

    const response = await api.post(
        "/categories",
        dto
    );

    return response.data;

}

export async function updateCategory(
    id: string,
    dto: UpdateCategoryRequest
): Promise<Category> {

    const response = await api.patch(
        `/categories/${id}`,
        dto
    );

    return response.data;

}

export async function deleteCategory(
    id: string
): Promise<void> {

    await api.delete(
        `/categories/${id}`
    );

}