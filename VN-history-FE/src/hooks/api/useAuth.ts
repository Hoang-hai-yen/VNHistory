import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
  user?: any;
}

export interface MeResponse {
  data: {
    full_name: string;
    role: string;
    email: string;
  };
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, any, LoginPayload>({
    mutationFn: async (payload) => {
      const res = await httpClient.post<LoginResponse>("/auth/login", payload);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useMeQuery() {
  const token = localStorage.getItem("token");
  return useQuery<MeResponse>({
    queryKey: ["me", token],
    queryFn: async () => {
      const res = await httpClient.get<MeResponse>("/auth/me");
      return res.data;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await httpClient.post("/auth/logout");
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.clear();
    },
  });
}
