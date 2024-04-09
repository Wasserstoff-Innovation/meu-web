import { MemoryText, PermissionText, defineDevConfig } from "@junobuild/config";

export default defineDevConfig(() => ({
  satellite: {
    collections: {
      db: [
        {
          collection: "cards",
          read: "managed" as PermissionText,
          write: "managed" as PermissionText,
          memory: "heap" as MemoryText,
          mutablePermissions: false,
        },
      ],
      storage: [],
    },
    controllers: [],
  },
}));
