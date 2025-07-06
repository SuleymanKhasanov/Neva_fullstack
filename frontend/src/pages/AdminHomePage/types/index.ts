export interface AdminHomeStats {
  products: number;
  categories: number;
  subcategories: number;
  brands: number;
}

export interface AdminHomePageProps {
  locale: string;
  messages: {
    admin_home: {
      title: string;
      subtitle: string;
      stats: {
        products: { title: string; description: string };
        categories: { title: string; description: string };
        subcategories: { title: string; description: string };
        brands: { title: string; description: string };
      };
      loading: string;
      error: {
        title: string;
        description: string;
        demo: string;
      };
    };
  };
}
