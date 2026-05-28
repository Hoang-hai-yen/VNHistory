import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../../lib/http";

export interface SettingItem {
  value: string;
  description?: string;
}

export interface SettingsData {
  site_name?: SettingItem;
  site_description?: SettingItem;
  site_email?: SettingItem;
  allow_comments?: SettingItem;
  notify_on_report?: SettingItem;
}

export interface SettingsResponse {
  asObject: SettingsData;
}

export function useAdminSettingsQuery() {
  return useQuery<SettingsData>({
    queryKey: ["adminSettings"],
    queryFn: async () => {
      const res = await httpClient.get<SettingsResponse>("/admin/settings");
      return res.data.asObject;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateAdminSettingsMutation() {
  const queryClient = useQueryClient();
  return useMutation<any, any, Partial<Record<keyof SettingsData, any>>>({
    mutationFn: async (payload) => {
      const res = await httpClient.patch("/admin/settings", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminSettings"] });
    },
  });
}
