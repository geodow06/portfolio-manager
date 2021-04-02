export const navigations = [
    {
      name: "Dashboard",
      path: "/dashboard/home",
      icon: "dashboard"
    },
    {
      name: "Exchanges",
      icon: "dashboard",
      children: [
        {
          name:"Coinbase",
          path:"",
        }, 
        {
          name: "Kraken",
          path: "",
        }
      ]
    }
];
  