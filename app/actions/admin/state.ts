import type { Comic } from "@/types/comic";

export type AdminFormState = {
  updatedAt: string;
  comic: Comic | null;
  error: { message: string; status: number } | null;
};

export const initialAdminFormState = (
  initialState?: Partial<AdminFormState>,
): AdminFormState => ({
  updatedAt: Date.now().toString(),
  comic: null,
  error: null,
  ...initialState,
});

export const handleAdminSuccess = (comic: Comic): AdminFormState => ({
  ...initialAdminFormState({ comic }),
});

export const handleAdminError = (error: {
  message: string;
  status: number;
}): AdminFormState => ({
  ...initialAdminFormState({ error }),
});

export const adminErrors = {
  400: { message: "Bad Request", status: 400 },
  401: { message: "Unauthorized", status: 401 },
  500: { message: "Internal Server Error", status: 500 },
};
