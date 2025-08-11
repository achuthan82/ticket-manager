const publicRoutes = {
  id: "public",
  children: [
    {
      path: "prototypes",
      children: [
        {
          path: "errors",
          children: [
            {
              path: "404-v1",
              lazy: async () => ({
                Component: (await import("app/pages/errors/404"))
                  .default,
              }),
            },
         
          
            {
              path: "401",
              lazy: async () => ({
                Component: (await import("app/pages/errors/401"))
                  .default,
              }),
            },
            {
              path: "429",
              lazy: async () => ({
                Component: (await import("app/pages/errors/429"))
                  .default,
              }),
            },
            {
              path: "500",
              lazy: async () => ({
                Component: (await import("app/pages/errors/500"))
                  .default,
              }),
            },
          ],
        },

      ],
    },
    {
      path: "auth",
      children: [
        // {
        //   path: "login",
        //   lazy: async () => ({
        //     Component: (await import("app/pages/ShieldNest/Login")).default,
        //   }),
        // },
        // {
        //   path: "register/:token",
        //   lazy: async () => ({
        //     Component: (await import("app/pages/ShieldNest/Register")).default,
        //   }),
        // },
        {
          path: "forgot-password",
          lazy: async () => ({
            Component: (await import("app/pages/Auth/ForgotPassword")).default,
          }),
        },
         {
          path: "register/:token",
          lazy: async () => ({
            Component: (await import("app/pages/Auth/Register")).default,
          }),
        },
        {
          path: "reset-password/:token",
          lazy: async () => ({
            Component: (await import("app/pages/Auth/ResetPassword")).default,
          }),
        },
        // {
        //   path: "reset-password/:token",
        //   lazy: async () => ({
        //     Component: (await import("app/pages/ShieldNest/ResetPassword")).default,
        //   }),
        // },
      ],
    },
  ],
};

export { publicRoutes };
