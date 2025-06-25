export interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
  icon?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}
