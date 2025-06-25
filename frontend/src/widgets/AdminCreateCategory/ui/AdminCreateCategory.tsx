import { CustomSelect } from '@/shared/ui/CustomSelect/CustomSelect';
import styles from './AdminCreateCategory.module.css';

const AdminCreateCategory = () => {
  const categories = [
    { value: 1, label: 'Серверы и хранилища' },
    { value: 2, label: 'Сетевое оборудование' },
    { value: 3, label: 'ИБП и электропитание' },
    { value: 4, label: 'Системы видеонаблюдения' },
  ];
  return (
    <div className={styles.container}>
      <CustomSelect label="test" options={categories} />
      <CustomSelect label="test" options={categories} />
      <CustomSelect label="test" options={categories} />
      <CustomSelect label="test" options={categories} />
    </div>
  );
};

export default AdminCreateCategory;
